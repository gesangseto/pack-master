import BaseModel from './BaseModel';

export default class ProductStockSerial extends BaseModel {
  static table = 'product_stock_serial';

  static hooks = {
    beforeCreate: [
      async (data) => {
        console.log('🔥 beforeCreate');

        // contoh hashing
        // data.password = btoa(data.password);
      },
    ],
    afterCreate: [
      async (data) => {
        console.log('✅ afterCreate', data.username);
      },
    ],
  };
}
