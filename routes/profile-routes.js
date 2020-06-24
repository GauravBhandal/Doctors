 const Article = require('../models/article');
const router = require('express').Router();
const authCheck = (req,res,next)=>{
    if(!req.user)
    {
        res.redirect('/doctors/doctor/login');
    }
    else {
        next();
    }
}


router.get('/',authCheck,(req, res)=>{
    res.render('profile',{user:req.user});
    Article.find({},function(err,articles){
        if(err){
            console.log(err);
        } else {
            res.render('profile',{user:req.user},{articles:articles})
        }
    })
});

router.get('/article',authCheck,(req,res) => {

    res.render('articles',{user:req.user});
});

router.get('/article/add',authCheck,(req,res) => {
    res.render('add_article');
});


// add submit articles
// router.post('/article/add',function(req,res){
//     console.log('Submitted');
// });



module.exports = router;