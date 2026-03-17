import Database from '@tauri-apps/plugin-sql';

const connections = {};

const database = {
  // 🔌 CONNECT DB (multi database)
  async connect(name = 'default', path = 'sqlite:app.db') {
    if (!connections[name]) {
      connections[name] = await Database.load(path);
    }
    return connections[name];
  },

  // ambil instance DB
  get(name = 'default') {
    if (!connections[name]) {
      throw new Error(`Database "${name}" belum di-init`);
    }
    return connections[name];
  },

  // 🔁 TRANSACTION
  async transaction(callback, name = 'default') {
    const db = this.get(name);

    try {
      await db.execute('BEGIN');

      const result = await callback(db);

      await db.execute('COMMIT');

      return result;
    } catch (err) {
      await db.execute('ROLLBACK');
      throw err;
    }
  },

  // 🏗️ INIT TABLE (centralized)
  async init() {
    const db = await this.connect('default', 'sqlite:app.db');

    await db.execute(`
      CREATE TABLE IF NOT EXISTS product_stock_serial (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        barcode TEXT
      )
    `);

    console.log('✅ Database product_stock_serial initialized');
  },
};

export default database;
