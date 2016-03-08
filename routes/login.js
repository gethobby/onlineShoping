 var express = require('express');
var router = express.Router();

/* GET login page. */
 router.get('/',function(req,res){
        req.session.error = null;
        res.render('login');
        
    });

router.post('/', function (req, res) {
    var User = global.accessDb.getModel('users'),
        uname = req.body.uname;
    User.findOne({name: uname}, function (error, doc) {
        if (error) {
            res.sendStatus(500);
            console.log(error);
        } else if (!doc) {
            req.session.error = '用户名不存在！';
            res.sendStatus(404);
        } else {
            if(req.body.upwd != doc.password){
                req.session.error = "密码错误!";
                res.sendStatus(404);
            }else{
                req.session.user=doc; // 可用来判定是否已经登录，以免越级访问
                res.sendStatus(200);
            }
        }
    });
});
module.exports = router;