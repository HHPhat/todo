import BaseModel from './BaseModel.js';
class NhanModel extends BaseModel {
    constructor() {
        super('NHAN', 'id');
    }
}
export default new NhanModel();