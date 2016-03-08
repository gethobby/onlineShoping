var express = require('express');
var router = express.Router();

/* GET register page. */
router.get('/', function (req, res, next) {
    req.session.error = null;
    res.render('register', { title: '用户注册' });
});
router.post('/', function (req, res, next) {
    var User = global.accessDb.getModel('users'),
        uname = req.body.uname;   
    User.findOne({ name: uname }, function (error, doc) {
       // console.log('查询结果'+doc);
        if (error) {
            res.sendStatus(500);//equivalent to res.status(500).send('Internal Server Error')
            req.session.error = '网络异常错误！';
            console.log(error);
        } else if (doc) {
            req.session.error = '用户名已存在！';
            res.sendStatus(500);
           // console.log('用户名已经存在');
        } else {
            console.log('用户名不存在，需要创建');
            User.create({
                name: uname,
                password: req.body.upwd
            }, function (error, doc) {
                if (error) {
                    res.sendStatus(500);
                    console.log(error);
                } else {
                    req.session.error = '用户名创建成功！';
                    res.sendStatus(200);//equivalent to res.status(200).send('OK')
                }
            });
        }
    });
});

module.exports = router;
