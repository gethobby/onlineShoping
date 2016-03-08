var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    models = require('./entities');
 
    // mongoose.Schema是一个定义模型的接口
    // new Schema({**}) 定义模型,独立
    // mongoose.model(modelName,mySchema)定义访问模型，对接Mongodb
    // 后期通过model(modelName)访问model
for(var m in models) {
    mongoose.model(m, new Schema(models[m]));
}
module.exports = {
    getModel: function (modelName) {
        return _getModel(modelName);
    }
};
var _getModel = function (modelName) {
    return mongoose.model(modelName);
};
