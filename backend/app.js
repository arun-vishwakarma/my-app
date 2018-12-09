const express = require('express');
const mongoose = require("mongoose");
const User = require('./models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('./middleware/auth-check');

mongoose.connect('mongodb://localhost/practice_myapp',{ useNewUrlParser: true })
    .then(()=>console.log('Connected to mongodb'))
    .catch(err => console.log('could not connect to mongodb',err));

const app = express();

app.use(express.json()); //body parser

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");    
    //res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api/users',checkAuth, async (req, res) => {
    let users = await User.find();
    //console.log('all users',users);
    res.status(201).json(users);
});

app.post('/api/users', (req, res, next) => {
    const userdata = req.body; 
    //console.log('post data',userdata);
  
    bcrypt.hash(userdata.password,10).
        then(hash=>{
            const user = new User({
                fullname:userdata.fullname,
                email:userdata.email,
                username:userdata.username,
                password:hash,
                date:{type:Date,default:Date.now},
                status:true
            });   
            
            user.save().then(createdUser => {
                res.status(201).json({
                  message: "User added successfully",
                  userId: createdUser._id
                });
            });
    });
    
     /*user.save();
    res.status(200).json({
        message:"User added successfully!"
    });*/

    
});


app.post('/api/login', async (req, res) => {
    const userdata = req.body;  //using body parser
    //console.log('login data',userdata);  
    //return false;
    let user = await User.findOne({
        $or: [
            { username : userdata.username },
            { email : userdata.username }
        ]
    });

    //console.log('fetch data',user);    

    //working on error message to send back to client
    if(!user) return res.status(400).send('Invalid username or password!');
    //need to replace with bcrypt hash and salt method

    let passwordIsOk = await bcrypt.compare(userdata.password,user.password);
    console.log('passwordIsOk',passwordIsOk);  

    if(!passwordIsOk){
        return res.status(400).send('Invalid username or password!');
    }

    const token = jwt.sign(
            {email:user.email, userId:user._id},
            'AKV_LONG_WEB_TOKEN_KEY',
            {expiresIn:'1h'}
        );


    /*res.status(200).send({
        token:token,
        expiresIn:'3600'
    });*/

    res.status(200).json({
        email:user.email,
        token:token,
        expiresIn:'3600'
    });

});

module.exports = app;