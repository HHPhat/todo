import BaseModel from './BaseModel.js';
class DanhMucModel extends BaseModel {
    constructor() {
        super('DANH_MUC', 'id');
    }
}
export default new DanhMucModel();
