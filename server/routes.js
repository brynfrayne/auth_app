const express = require('express');
const passport = require('passport');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
// const knex = require('knex')(require('./knexfile.js').development);
const knex = require('knex');
const PORT = require('./index.js');
const db = PORT === process.env.PORT ? knex(require('./knexfile.js').production) : knex(require('./knexfile.js').development);
require("dotenv").config();
const cloudinary = require('./cloudinary');

const readUsers = () => {
    const data = fs.readFileSync('./data/users.json');
    const parsedData = JSON.parse(data);
    return parsedData;
}

const findSpecificUser = (name) => {
    const userData = readUsers();
    return userData.filter((user) => name === user.name);
};

// upload new profile image 
router.post("/images", cloudinary.uploadImage, (req, res) => {
    res.json(req.file.path);
})

// create new user
router.post('/signup', (req, res) => {
    console.log(req.body);
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const newUser = {
        name: req.body.name,
        bio: req.body.bio,
        phone: req.body.phone,
        email: req.body.email,
        password: hashedPassword,
        user_id:req.body.id
    };
    const token = jwt.sign(
        {id: newUser.id, email: newUser.email},
        process.env.JWT_KEY,
        { expiresIn: "24h"}
    );
    db('users')
        .insert({ 
            name: req.body.name,
            bio: req.body.bio,
            phone: req.body.phone,
            email: req.body.email,
            password: hashedPassword,
            user_id:req.body.id, 
            avatar_url: req.body.avatar_url
        })
            
        .then(_response=>{
            return res.status(200).json({ token });
        });
    // console.log(newUser)
    // const users = readUsers();
    // users.push(newUser);
    // fs.writeFileSync('./data/users.json', JSON.stringify(users));

    
    
}) 

// update user
router.put('/editprofile', (req, res) => {
    console.log(req.body)
    db('users')
        .where({ user_id:req.body.user_id})
        .update({ 
            avatar_url: req.body.avatar_url,
            name:req.body.name, 
            bio:req.body.bio, 
            phone:req.body.phone,
            email:req.body.email,
            password:req.body.email,
            user_id: req.body.user_id
        })
        .then(_response=>{
            return res.json({success:true});
        });
        // if (err) console.error();
        
      });
  
    // // console.log(req.body)
    // const userData = readUsers();
    // const id = req.body.id;
    // const foundUser = userData.find((user) => id === user.id);
    // console.log(foundUser)
    // foundUser['image'] = req.body.image;
    // foundUser['name'] = req.body.name;
    // foundUser['bio'] = req.body.bio;
    // foundUser['phone'] = req.body.phone;
    // foundUser['email'] = req.body.email;
    // foundUser['password'] = bcrypt.hashSync(req.body.password, 10);
    // fs.writeFileSync('./data/users.json', JSON.stringify(userData));
    // res.status(200).json(foundUser);
    // console.log(foundUser)
// })

// get user info
router.get('/profile/:id', (req, res) => {
    const id = req.params.id;
    
    //If there is no auth header provided
    if (!req.headers.authorization) {return res.status(401).send("Please login")};

    // Parse the bearer token
    const authToken = req.headers.authorization.split(" ")[1];
    console.log(authToken);

    //Verify the token
    jwt.verify(authToken, process.env.JWT_KEY, (err, decoded) => {
        if (err) {return res.status(401).send("Invalid auth token")};
        db('users')
            .where({ user_id: id })
            .then(response=>{
                res.status(200).json(response)
            })
        // // read json file 
        // const userData = readUsers();
        // // find the specific user im wanting 
        // const foundUser = userData.find((user) => id === user.id);
        // console.log(foundUser)
        // // send that to the client
        // res.status(200).json(foundUser);
})
})
router.get('/social', (req, res)=> {
    if (req.user === undefined) return res.status(401).json({ message: 'Unauthorized' });

  // If user is currently authenticated, send back user info
  res.status(200).json(req.user);
})

// login user 
router.post('/login', (req, res)=> {
    const { email, password } = req.body;

    //if any fields are missing, return
    if(!email || !password) {
        return res.status(400).send("Please enter the required fields.");
    }
    
    db('users').where({ email })
        .first()
        .then(user =>{
            if(!user){
                res.status(401).json({
                    error:'No user with that email'
                })
            }else{
                console.log("here",user)
                return bcrypt
                .compare(req.body.password, user.password)
                .then(isAuthenticated => {
                    // if(!isAuthenticated){
                    //     res.status(401).json({
                    //         error:'Unauthorized Access!'
                    //     })
                    // }else{
                        return jwt.sign(
                            {email:user.email, id: user.user_id}, 
                            process.env.JWT_KEY, 
                            (error, token) => {
                            res.status(200).json({token, user})
                        } )
                    }
                // }
                )
            }
        })
    
    // const userData = readUsers();
    // const foundUser = userData.find((user) => email === user.email);
    // console.log(foundUser);

    // const isPasswordCorrect = bcrypt.compareSync(password, foundUser.password);
    
    // if(!isPasswordCorrect) return res.status(400).send("Invalid password");

    // const token = jwt.sign(
    //     {id: foundUser.id, email: foundUser.email},
    //     process.env.JWT_KEY,
    //     { expiresIn: "24h"}
    // );
    // console.log(token)
    // res.status(200).json({ token, foundUser });
})
// Create a logout endpoint
router.get('/logout', (req, res) => {
    // Passport adds the logout method to request, it will end user session
    req.logout();  
    // Redirect the user back to client-side application
    res.redirect('http://localhost:3000');
  });


// Google passport oauth
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/auth/google/redirect', 
    passport.authenticate("google", {failureRedirect: 'http://localhost:3000/login',}),
    (req, res) => {
        console.log(req.user)
        res.redirect('http://localhost:3000/success')
    }
)

// Github passport oauth
router.get('/auth/github', passport.authenticate('github'));

router.get('/auth/github/redirect', 
    passport.authenticate('github', {failureRedirect: 'http://localhost:3000/login',}),
    (req, res) => {
        console.log(req.user)
        res.redirect('http://localhost:3000/success')
    }
);

module.exports = router;