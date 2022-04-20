const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require('cors');
const cookieSession = require('cookie-session');
const helmet = require('helmet');
const expressSession = require('express-session');
const passport = require('passport');

// import router paths
const routes = require('./routes');

// Configure session storage
app.use(cookieSession({
    name: 'session-name',
    keys: ['key1', 'key2']
}))

//Configure passport
app.use(passport.initialize());
app.use(passport.session());

// middleware
app.use(
    cors({
      origin: true,
      credentials: true
    })
  );
  app.use(
    expressSession({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true
    })
  );
app.use(express.json());
app.use(express.urlencoded());

app.use(helmet());



// paths, url endpoint routing
app.use('/', routes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

module.exports = PORT;