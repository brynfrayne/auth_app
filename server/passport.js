require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github2').Strategy;

const passportGoogleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
};

const passportGithubConfig = {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
};

passport.serializeUser(function(user, done){
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy(passportGoogleConfig,
function(
    accessToken, 
    refreshToken, 
    profile, 
    cb
) {
    return cb(null,profile);
}
));

passport.use(new GithubStrategy(passportGithubConfig, function (
    _accessToken,
    _refreshToken,
    profile,
    cb
) {
    return cb(null, profile);
})
);