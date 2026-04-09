import database from '../configuration/database';

export default class BaseModel {
  static table = '';
  static dbName = 'mertrack';
  static schema = {};
  static dbType = 'main'; // 'main' | 'batch'
  static batchNo = null;

  static hooks = {
    beforeCreate: [],
    afterCreate: [],
    beforeUpdate: [],
    afterUpdate: [],
  };

  // =============================
  // 🔌 DB
  // =============================

  static async db() {
    console.log(this.dbType); // main

    if (this.dbType === 'main') {
      return await database.getMain();
    }
    if (this.dbType === 'batch') {
      if (!this.batchNo) {
        throw new Error('batchNo belum diset');
      }
      return await database.getBatch(this.batchNo);
    }
    throw new Error(`Unknown dbType: ${this.dbType}`);
  }
  static useBatch(batchNo) {
    const Model = this;
    return class extends Model {
      static dbType = 'batch';
      static batchNo = batchNo;
    };
  }
  // =============================
  // 🔒 VALIDATION
  // =============================
  static validateTable() {
    if (!this.table) {
      throw new Error('Table name is required');
    }
    // hanya boleh huruf, angka, underscore
    if (!/^[a-zA-Z0-9_]+$/.test(this.table)) {
      throw new Error(`Invalid table name: ${this.table}`);
    }
  }

  static validateWhere(where) {
    if (!where || Object.keys(where).length === 0) {
      throw new Error('Where condition is required');
    }
  }

  // =============================
  // 🔁 HOOK RUNNER
  // =============================
  static async runHooks(type, payload) {
    if (!this.hooks[type]) return;

    for (const hook of this.hooks[type]) {
      await hook(payload);
    }
  }

  // =============================
  // 🆕 CREATE
  // =============================
  static async create(data) {
    this.validateTable();
    const db = await this.db(); // ✅ FIX
    await this.runHooks('beforeCreate', data);
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map(() => '?').join(',');
    await db.execute(
      `INSERT INTO ${this.table} (${keys.join(',')}) VALUES (${placeholders})`,
      values,
    );
    const result = await db.select(`SELECT last_insert_rowid() as id`);
    const id = result[0]?.id;
    const newData = { id, ...data };
    await this.runHooks('afterCreate', newData);
    return newData;
  }

  // =============================
  // 🔍 FIND BY ID
  // =============================
  static async findById(id) {
    this.validateTable();
    const db = await this.db(); // ✅ FIX
    const result = await db.select(
      `SELECT * FROM ${this.table} WHERE id = ? LIMIT 1`,
      [id],
    );
    return result[0] || null;
  }

  // =============================
  // 🔍 FIND ALL (ADVANCED)
  // =============================
  static async findAll({ where = {}, limit, orderBy } = {}) {
    this.validateTable();
    const db = await this.db(); // ✅ FIX
    let query = `SELECT * FROM ${this.table}`;
    let values = [];
    const keys = Object.keys(where);
    if (keys.length) {
      const conditions = keys.map((k) => `${k} = ?`).join(' AND ');
      query += ` WHERE ${conditions}`;
      values = Object.values(where);
    }
    if (orderBy) query += ` ORDER BY ${orderBy}`;
    if (limit) query += ` LIMIT ${limit}`;
    return await db.select(query, values);
  }

  // =============================
  // 🔍 FIND ONE
  // =============================
  static async findOne(where = {}) {
    this.validateTable();
    this.validateWhere(where);
    const db = await this.db(); // 🔥 WAJIB

    const keys = Object.keys(where);
    const values = Object.values(where);
    const conditions = keys.map((k) => `${k} = ?`).join(' AND ');
    const result = await db.select(
      `SELECT * FROM ${this.table} WHERE ${conditions} LIMIT 1`,
      values,
    );

    return result[0] || null;
  }

  // =============================
  // ✏️ UPDATE
  // =============================
  static async update(data, where = {}) {
    this.validateTable();
    this.validateWhere(where);
    const db = await this.db(); // ✅ FIX
    await this.runHooks('beforeUpdate', data);
    const setKeys = Object.keys(data);
    const setValues = Object.values(data);
    const whereKeys = Object.keys(where);
    const whereValues = Object.values(where);
    const setClause = setKeys.map((k) => `${k} = ?`).join(', ');
    const whereClause = whereKeys.map((k) => `${k} = ?`).join(' AND ');
    await db.execute(
      `UPDATE ${this.table} SET ${setClause} WHERE ${whereClause}`,
      [...setValues, ...whereValues],
    );
    await this.runHooks('afterUpdate', data);
    return true;
  }

  // =============================
  // 🗑️ DELETE
  // =============================
  static async delete({ where } = {}) {
    this.validateTable();
    this.validateWhere(where);
    const db = await this.db(); // ✅ FIX
    const keys = Object.keys(where);
    const values = Object.values(where);
    const conditions = keys.map((k) => `${k} = ?`).join(' AND ');
    await db.execute(`DELETE FROM ${this.table} WHERE ${conditions}`, values);
    return true;
  }

  // =============================
  //  SYNC Tabel Scheme
  // =============================
  static async sync() {
    this.validateTable();
    if (!this.schema || Object.keys(this.schema).length === 0) {
      throw new Error(`Schema not defined for table ${this.table}`);
    }
    const db = await this.db(); // ✅ FIX
    const columns = Object.entries(this.schema)
      .map(([key, type]) => `${key} ${type}`)
      .join(', ');
    await db.execute(`
    CREATE TABLE IF NOT EXISTS ${this.table} (${columns})
  `);
    console.log(`✅ Table "${this.table}" synced`);
  }
}
