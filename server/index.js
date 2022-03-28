const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require('cors');


// middleware
app.use(cors());
app.use(express.json());

// create new user
app.post('/signup', (req, res) => {
    
    console.log(req.body);
}) 

// update new user
app.put('/editprofile', (req, res) => {
    console.log(req.body)
})

// get user info
app.get

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})