 var express = require('express');
var router = express.Router();

/* GET addcommodities page. */
router.get('/', function(req, res) {
    res.render('addcommodity');
});
router.post('/', function (req, res) {
    var commodities = global.accessDb.getModel('commodities');
    commodities.create({
        name: req.body.name,
        price: req.body.price,
        imgSrc: req.body.imgSrc
    }, function (error, doc) {
        if (doc) {
            res.sendStatus(200);
        }else{
            res.sendStatus(404);
        }
    });
});
 
 module.exports = router;