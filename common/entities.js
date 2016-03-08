module.exports = {
    users: {
        name: { type: String, required: true },
        password: { type: String, required: true }
    },
    commodities: {
        name: String,
        price: Number,
        imgSrc: String
    },
    carts:{
        uId: { type: String },
        cId: { type: String },
        cName: { type: String },
        cPrice: { type: String },
        cImgSrc: { type:String } ,
        cQuantity: { type: Number },
        cStatus : { type: Boolean, default: false  }
    }
};
