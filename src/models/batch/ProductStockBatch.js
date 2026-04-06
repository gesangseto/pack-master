import BaseModel from '../BaseModel';

class ProductStockBatch extends BaseModel {
  static table = 'product_stock_batch';
  static schema = {
    id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
    process_order_erp: 'TEXT',
    currency: 'TEXT',
    het: 'TEXT',
    mfg_date: 'TEXT',
    shelf_life: 'INTEGER',
    exp_date: 'TEXT',
    batch_no: 'TEXT',
    lot_no: 'TEXT',
    product_id: 'INTEGER',
    reason: 'TEXT',
    remark: 'TEXT',
    system_remark: 'TEXT',
    buff: 'TEXT',
    generate_count_level_1: 'TEXT',
    generate_count_level_2: 'TEXT',
    generate_count_level_3: 'TEXT',
    generate_count_level_4: 'TEXT',
    generate_count_additional: 'TEXT',
    status: 'INTEGER', // 3 -> 4
    status_serialize: 'INTEGER',
    status_aggregation: 'INTEGER',
    weight_l1: 'TEXT',
    weight_l2: 'TEXT',
    weight_l3: 'TEXT',
    weight_l4: 'TEXT',
    additional_serial_for_sample: 'INTEGER',
  };
}
export default ProductStockBatch;
