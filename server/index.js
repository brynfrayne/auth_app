const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require('cors');
const fs = require('fs');
require("dotenv").config();
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

// cloudinary config

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key, 
    api_secret: process.env.api_secret 
  });

  const storage = new CloudinaryStorage({
      cloudinary:cloudinary,
      params: {
          folder: "DEV",
      },
  });

// multer config variables
const multer = require('multer');

const upload = multer({
    // storage: multerConfig,
    storage:storage
    // fileFilter: isImage
});
const uploadImage = upload.single('photo');

// upload new profile image 
app.post("/images", uploadImage, (req, res) => {
    res.json(req.file.path);
})

// create new user
app.post('/signup', (req, res) => {
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
app.get('/:id', (req, res) => {
    const id = req.params.id;
    console.log(id)
    // read json file 
    const userData = readUsers();
    // find the specific user im wanting 
    const foundUser = userData.find((user) => id === user.id);
    console.log(foundUser)
    // send that to the client
    res.status(200).json(foundUser);
})

// login user 
app.post('/login', (req, res)=> {
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})