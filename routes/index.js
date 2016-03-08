 var express = require('express');
var router = express.Router();
// 退出主页

router.get('/',function(req,res)
{
    res.render('login');
})

module.exports = router;