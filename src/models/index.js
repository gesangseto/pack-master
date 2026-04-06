import ProductStockBatch from './batch/ProductStockBatch';
import ProductStockSerial from './batch/ProductStockSerial';
import MstUser from './mertrack/MstUser';

const batchModels = [ProductStockBatch, ProductStockSerial];
const mainModels = [MstUser];

export async function syncMain() {
  for (const model of mainModels) {
    await model.sync();
  }
}
export async function syncBatch() {
  for (const model of batchModels) {
    await model.sync();
  }
}
