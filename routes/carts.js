var express = require('express');
var router = express.Router();

    //查看购物车商品
    router.get('/', function(req, res) {
        var Cart = global.accessDb.getModel('carts');
        if(!req.session.user){
            req.session.error = "用户已过期，请重新登录:"
            res.redirect('/login');
        }else{
            Cart.find({"uId":req.session.user._id,"cStatus":false}, function (error, docs) {
                res.render('cart',{carts:docs});
            });
        }
    });
    //添加购物车商品
    router.get("/addToCart/:id", function(req, res) {
       //req.params.id 获取商品ID号
        if(!req.session.user){
            req.session.error = "用户已过期，请重新登录:"
            res.redirect('/login');
        }else{
            var Commodity = global.accessDb.getModel('commodities'),
                Cart = global.accessDb.getModel('carts');
            Cart.findOne({"uId":req.session.user._id, "cId":req.params.id},function(error,doc){
                //购物车中该商品已存在 +1
                if(doc){
                    Cart.update({"uId":req.session.user._id, "cId":req.params.id},{$set : { cQuantity : doc.cQuantity + 1 }},function(error,doc){
                        //成功返回1  失败返回0
                        if(doc > 0){
                            res.redirect('/home');
                        }
                    });
                //购物车中该商品未存在，添加
                }else{
                    Commodity.findOne({"_id": req.params.id}, function (error, doc) {
                        if (doc) {
                            Cart.create({ // 插入一个文档
                                uId: req.session.user._id,
                                cId: req.params.id,
                                cName: doc.name,
                                cPrice: doc.price,
                                cImgSrc: doc.imgSrc,
                                cQuantity : 1
                            },function(error,doc){
                                if(doc){
                                    res.redirect('/home');
                                }
                            });
                        } else {
                             console.log('该商品暂时缺货!');
                             res.redirect('/home'); 
                        }
                    });
                }
            });
        }
    });

    //删除购物车商品
    router.get("/delFromCart/:id", function(req, res) {
        //req.params.id 获取商品ID号
        var Cart = global.accessDb.getModel('carts');
        Cart.remove({"_id":req.params.id},function(error,doc){
            //成功返回1  失败返回0
            if(doc > 0){
                res.redirect('/cart');
            }
        });
    });

    //购物车结算
    router.post("/clearing",function(req,res){
        var Cart = global.accessDb.getModel('carts');
        Cart.update({"_id":req.body.cid},{$set : { cQuantity : req.body.cnum,cStatus:true }},function(error,doc){
            //更新成功返回1  失败返回0
            if(doc > 0){
                res.send(200);
            }
        });
    });


 module.exports = router;