var express = require('express');
var router = express.Router();

var passport = require('passport');

var GitHubStrategy = require('passport-github').Strategy;


passport.serializeUser(function (user, done) {
    console.log('---serializeUser---')
    console.log(user)
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    console.log('---deserializeUser---')
    done(null, obj);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: "59648e7481440406a3d9",
      clientSecret: "7ad1dc44986d9d85de8da3f91a832587e11b0924",
      callbackURL: "http://localhost:8000/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      // User.findOrCreate({ githubId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
      cb(null, profile);
    }
  )
);




router.get('/github', passport.authenticate('github'));


router.get('/github/callback',
    passport.authenticate('github', {
        failureRedirect: '/login'
    }),
    function (req, res) {
        req.session.user = {
            id: req.user.id,
            username: req.user.displayName || req.user.username,
            avatar: req.user._json.avatar_url,
            provider: req.user.provider
        };
        console.log("success");
        // Successful authentication, redirect home.
        res.redirect('/');
    });


router.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');
})


module.exports = router;