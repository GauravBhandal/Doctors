const express = require('express');
const authRouter = require('./routes/auth-routes');
const profileRouter = require('./routes/profile-routes');
const path = require('path');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();

const bodyParser = require('body-parser');


const Article = require('./models/article');

const authCheck = (req,res,next)=>{
    if(!req.user)
    {
        res.redirect('/doctors/doctor/login');
    }
    else {
        next();
    }
}

//set view engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

// parse application/json
app.use(bodyParser.json())

// body-parser middleware
app.use(bodyParser.urlencoded({ extend : true }))

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb
mongoose.connect(keys.mongodb.dbURI,()=>{
    console.log('connects to mongodb')
});

//route path
app.use('/doctors',authRouter);
app.use('/profile',profileRouter);

//home page
app.get('/',(req,res)=>{
   res.render('home')
});

//doctor login
app.get('/doctors/doctor',(req,res)=>{
    res.render('doctors',{
        fuck: "gaurav..."
    })
});
app.get('/profile/article',(req,res) =>{
    
    res.render('articles');
});
// app.get('/profile/article/add',(req,res) =>{
//     res.render('add_article');
// });
// app.get('/article/add',(req,res) => {
//     res.render('add_article');
// });

//add submit articles

// app.post('/article/add',function(req,res){
//     // const{title,author,body} = req.body;
//     // console.log(req.body.author);
//     let article = new Article();
//     article.title = req.body.title;
//     article.author = req.body.author;
//     article.body = req.body.body;

//     article.save(function(err){
//         if(err){
//             console.log(err);
//             return;
//         } else {
//             res.redirect('/doctors');
//         }
//     });
// });
app.post('/article/add',function(req,res){
    // const{title,author,body} = req.body;
    // console.log(req.body.author);
    let article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    article.save(function(err){
        if(err){
            console.log(err);
            return;
        } else {
            console.log(req.body);
            res.redirect('/');
        }
    });
});

app.listen(3000,()=>console.log(`app started at port = 3000`))




