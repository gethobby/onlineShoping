 var express = require('express');
var router = express.Router();
// 退出主页

router.get('/',function(req,res)
{
    req.session.user = null;
    req.session.error = null;
    res.render('login');
})

module.exports = router;