import database from '../configuration/database';

export default class BaseModel {
  static table = '';
  static dbName = 'default';

  static hooks = {
    beforeCreate: [],
    afterCreate: [],
    beforeUpdate: [],
    afterUpdate: [],
  };

  static db() {
    return database.get(this.dbName);
  }

  static async create(data) {
    const db = this.db();

    for (const hook of this.hooks.beforeCreate) {
      await hook(data);
    }

    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map(() => '?').join(',');

    await db.execute(
      `INSERT INTO ${this.table} (${keys.join(',')}) VALUES (${placeholders})`,
      values,
    );

    for (const hook of this.hooks.afterCreate) {
      await hook(data);
    }

    return data;
  }

  static async findAll() {
    return await this.db().select(`SELECT * FROM ${this.table}`);
  }

  static async findOne(where) {
    const keys = Object.keys(where);
    const values = Object.values(where);

    const conditions = keys.map((k) => `${k} = ?`).join(' AND ');

    const result = await this.db().select(
      `SELECT * FROM ${this.table} WHERE ${conditions} LIMIT 1`,
      values,
    );

    return result[0] || null;
  }

  static async update(data, where) {
    const db = this.db();

    for (const hook of this.hooks.beforeUpdate) {
      await hook(data);
    }

    const setKeys = Object.keys(data);
    const setValues = Object.values(data);

    const whereKeys = Object.keys(where);
    const whereValues = Object.values(where);

    const setClause = setKeys.map((k) => `${k} = ?`).join(',');
    const whereClause = whereKeys.map((k) => `${k} = ?`).join(' AND ');

    await db.execute(
      `UPDATE ${this.table} SET ${setClause} WHERE ${whereClause}`,
      [...setValues, ...whereValues],
    );

    for (const hook of this.hooks.afterUpdate) {
      await hook(data);
    }
  }

  static async delete({ where }) {
    console.log(where);

    const keys = Object.keys(where);
    const values = Object.values(where);
    console.log(keys, values);

    const conditions = keys.map((k) => `${k} = ?`).join(' AND ');

    await this.db().execute(
      `DELETE FROM ${this.table} WHERE ${conditions}`,
      values,
    );
  }
}
