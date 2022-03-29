const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require('cors');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uniqid = require('uniqid');

const readUsers = () => {
    const data = fs.readFileSync('./data/users.json');
    const parsedData = JSON.parse(data);
    return parsedData;
}

const findSpecificUser = (name) => {
    const userData = readUsers();
    return userData.filter((user) => name === user.name);
};

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

// create new user
app.post('/signup', (req, res) => {
    console.log(req.body);
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const newUser = {
        name: req.body.name,
        bio: req.body.bio,
        phone: req.body.phone,
        email: req.body.email,
        password: hashedPassword,
        id:uniqid()
    }
    const users = readUsers();
    users.push(newUser);
    fs.writeFileSync('./data/users.json', JSON.stringify(users));

    res.status(201).json(newUser);
}) 

// update user
app.put('/editprofile', (req, res) => {
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
app.get('/:email', (req, res) => {
    const email = req.params.email;
    // read json file 
    const userData = readUsers();
    // find the specific user im wanting 
    const foundUser = userData.find((user) => email === user.email);
    console.log(foundUser)
    // send that to the client
    res.status(200).json(foundUser);
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})