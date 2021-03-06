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
    /*线上oauth */
      //   clientID: "11d785b0a657cbdef5b7",
      //   clientSecret: "0601149d588baf626fc4b4f3d033c2470e48401a",
      //   callbackURL: "http://localhost:4895/auth/github/callback"
      //callbackURL: "http://zhoupengjie.top/auth/github/callback"

      /*测试oauth*/
      clientID: "a54f803630dca2449c50",
      clientSecret: "9d9fbc51b51fec94728d64bd44aa8bea370dbd66",
      callbackURL: "http://localhost:5000/auth/github/callback"
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