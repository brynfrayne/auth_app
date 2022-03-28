const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require('cors');
const fs = require('fs');

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
    const newUser = {
        name: req.body.name,
        bio: req.body.bio,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password
    }
    const users = readUsers();
    users.push(newUser);
    fs.writeFileSync('./data/users.json', JSON.stringify(users));

    res.status(201).json(newUser);
}) 

// update user
app.put('/editprofile', (req, res) => {
    console.log(req.body)
    const userData = readUsers();
    const email = req.body.email;
    const foundUser = userData.find((user) => email === user.email);
    console.log(foundUser)
    foundUser['image'] = req.body.image;
    foundUser['name'] = req.body.name;
    foundUser['bio'] = req.body.bio;
    foundUser['phone'] = req.body.phone;
    foundUser['email'] = req.body.email;
    foundUser['password'] = req.body.password;
    fs.writeFileSync('./data/users.json', JSON.stringify(userData));
    res.status(200).json(foundUser);
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