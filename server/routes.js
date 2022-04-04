const express = require('express');
const passport = require('passport');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const cookieSession = require('cookie-session');
require("dotenv").config();
require('./passport');
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
    console.log(req.body.id);
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const newUser = {
        name: req.body.name,
        bio: req.body.bio,
        phone: req.body.phone,
        email: req.body.email,
        password: hashedPassword,
        id:req.body.id
    }
    console.log(newUser)
    const users = readUsers();
    users.push(newUser);
    fs.writeFileSync('./data/users.json', JSON.stringify(users));

    const token = jwt.sign(
        {id: newUser.id, email: newUser.email},
        process.env.JWT_KEY,
        { expiresIn: "24h"}
    );
    res.status(200).json({ token,newUser });
}) 

// update user
router.put('/editprofile', (req, res) => {
    // console.log(req.body)
    const userData = readUsers();
    const id = req.body.id;
    const foundUser = userData.find((user) => id === user.id);
    console.log(foundUser)
    foundUser['image'] = req.body.image;
    foundUser['name'] = req.body.name;
    foundUser['bio'] = req.body.bio;
    foundUser['phone'] = req.body.phone;
    foundUser['email'] = req.body.email;
    foundUser['password'] = bcrypt.hashSync(req.body.password, 10);
    fs.writeFileSync('./data/users.json', JSON.stringify(userData));
    res.status(200).json(foundUser);
    console.log(foundUser)
})

// get user info
router.get('/:id', (req, res) => {
    const id = req.params.id;
    
    //If there is no auth header provided
    if (!req.headers.authorization) {return res.status(401).send("Please login")};

    // Parse the bearer token
    const authToken = req.headers.authorization.split(" ")[1];
    console.log(authToken);

    //Verify the token
    jwt.verify(authToken, process.env.JWT_KEY, (err, decoded) => {
        if (err) {return res.status(401).send("Invalid auth token")};
    
        // read json file 
        const userData = readUsers();
        // find the specific user im wanting 
        const foundUser = userData.find((user) => id === user.id);
        console.log(foundUser)
        // send that to the client
        res.status(200).json(foundUser);
})
})

// login user 
router.post('/login', (req, res)=> {
    const { email, password } = req.body;

    //if any fields are missing, return
    if(!email || !password) {
        return res.status(400).send("Please enter the required fields.");
    }
    const userData = readUsers();
    const foundUser = userData.find((user) => email === user.email);
    console.log(foundUser);

    const isPasswordCorrect = bcrypt.compareSync(password, foundUser.password);
    
    if(!isPasswordCorrect) return res.status(400).send("Invalid password");

    const token = jwt.sign(
        {id: foundUser.id, email: foundUser.email},
        process.env.JWT_KEY,
        { expiresIn: "24h"}
    );
    console.log(token)
    res.status(200).json({ token, foundUser });
})

router.get('/auth/google', passport.authenticate(
    'google', { scope: ['profile', 'email'] }))

module.exports = router;