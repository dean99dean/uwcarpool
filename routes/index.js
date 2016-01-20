var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../public/javascripts/account.js');
var request = require('../public/javascripts/req.js');
var off = require('../public/javascripts/off.js');
var mongoose = require('mongoose');
var reqLength;
var offLength;

//Link the database
mongoose.connect('mongodb://localhost:27017/carpool');
var db = mongoose.connection;
db.once('open', function () {
    console.log('YAY!');
});
db.on('error', console.error.bind(console, 'connection error:'));


//save the testing invitiation object
//var testreq = new request({id: 1, time: 3213891, from: "TRT", to: "LOO", description: "fuck", inviter: "Bill"});
//var testoff = new off({id: -1, time: 3000000, from: "LOO", to: "TRT", description: "shit", inviter: "Sheldon"});
//
//testreq.save(function (err) {
//    if (err) return err;
//});
//
//testoff.save(function (err) {
//    if (err) return err;
//});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});

});

router.get('/signin', function (req, res, next) {
    res.render('signin', {title: 'Express'});
});

router.post('/signin', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin',
    //failureFlash: 'Invalid username or password.'

}));

router.get('/signup', function (req, res, next) {
    res.render('signup', {title: 'Express'});
});

router.post('/signup', function (req, res) {
    Account.register(new Account({username: req.body.username}), req.body.password, function (err, account) {
        if (err) {
            return res.render('signup', {account: account});
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});


router.get('/getuser', function (req, res, next) {
    if (req.user) res.end(req.user.username);
});

router.get('/getinvs', function (req, res, next) {
    var invs = [];
    request.find(function (err, foundReqs) {
        if (err) return console.error(err);
        console.log("The length of Req is:"+foundReqs.length);
        reqLength = foundReqs.length;
        invs.push(foundReqs);
        //console.log("after pushing req"+invs);
        off.find(function (err, foundOffs) {
            if (err) return console.error(err);
            console.log("The length of Off is:"+foundOffs.length);
            offLength = foundOffs.length;
            invs.push(foundOffs);

           // console.log(invs);
            if (invs) res.send(invs);
        });
    });


});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

router.post('/submit',function(req,res) {
    if(req.body.options == "offer") {
            var newoff = new off({id: ++offLength,
                time: req.body.time,
                from: req.body.from,
                to: req.body.to,
                description: req.body.description,
                inviter: req.user.username});

        console.log(newoff);
        newoff.save((function (err) {
            if (err) return err;
        }));
        res.redirect("/");

    }

    else if(req.body.options == "req") {
        var newreq = new request({id: -(++reqLength),
            time: req.body.time,
            from: req.body.from,
            to: req.body.to,
            description: req.body.description,
            inviter: req.user.username});

        console.log(newreq);
        newreq.save((function (err) {
            if (err) return err;
        }));
        res.redirect("/");

    }


});

router.get('/post', function (req, res, next) {
    if(req.user) res.render('post', {title: 'Express'});
    else res.redirect("./");

});

// router.get('/geto', function (req, res, next) {
//     var objs = [{value:20},{value:30},{value:1}];
//     console.log("calledaaaaaaaaaaa");

//     res.send(objs);

// });



module.exports = router;
