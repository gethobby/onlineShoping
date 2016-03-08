 var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
        if(req.session.user){
            var commodities = global.accessDb.getModel('commodities');
            commodities.find({}, function (error, docs) {
               //console.log(docs);
                res.render('home',{commodities:docs});
            });
        }else{
            req.session.error = "请先登录"
            res.redirect('/login');
        }
    });
 
 module.exports = router;