const router = require('express').Router();
const passport = require('passport');

//auth login
router.get('/doctor/login',passport.authenticate('google',{
    scope:['profile']
}));

router.get('/doctor/login/redirect',passport.authenticate('google'),(req,res)=>{
    //res.send(req.user);
    
    res.redirect('/profile/');
});

//auth login add article
// router.get('/profile/add',(req,res) => {
//     res.render('add_article');
// })

//auth logout
router.get('/doctor/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
    //res.send('logout');
});

module.exports = router;