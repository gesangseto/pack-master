import ProductStockBatch from './batch/ProductStockBatch';
import ProductStockSerial from './batch/ProductStockSerial';
import appConfig from './mertrack/AppConfig';
import MstMenu from './mertrack/MstMenu';
import MstSectionRole from './mertrack/MstSectionRole';
import MstUser from './mertrack/MstUser';

const batchModels = [ProductStockBatch, ProductStockSerial];
const mainModels = [appConfig, MstUser, MstMenu, MstSectionRole];

export async function syncStructureMain() {
  for (const model of mainModels) {
    await model.sync();
  }
}
export async function syncStructureBatch(batchNo) {
  if (!batchNo) {
    throw new Error('batchNo wajib diisi');
  }
  for (const model of batchModels) {
    const BatchModel = model.useBatch(batchNo); // 🔥 inject batch
    await BatchModel.sync();
  }
}
