var express = require('express');
var router = express.Router();
var db = require('../views/database.js');
var sha1 = require('sha1');
var request = require('request');
//var db = require('./controllers/admin/getLines.js')



/* GET login page. */
router.get('/', function (req, res, next) {
    res.redirect('/admin/index');
});

router.get('/login', function (req, res, next) {
    check(req, res,'admin/index');
});


//Secure the Admin Panel
router.get('/index', function (req, res, next) {
    check(req, res,'admin/index');
});

//check session
function check(req, res, site ) {
    if(req.session.user){
        res.render(site,{userName:req.session.user, img:req.session.image, pos:req.session.pos});
        status = "";
    }
    if(req.cookies.user){
        res.render(site,{userName:req.cookies.user, img:req.cookies.image, pos:req.cookies.pos});
        status = "";
    }
    else{
        res.render('admin/login',{msg:"none"});
    }
}



/* GET admin index page. */
router.post('/index', function (req, res, next) {
    var cookieIsOn = false;
    if(req.body.cookie){
        cookieIsOn = true;
    }
    
    Login(req.body.email, req.body.pass, req, res, cookieIsOn);
});



//*************** check user credentials  ************************/
function Login(uName, pass, req, res, cookie) {
    
    var sha1Password = sha1(pass);
    
    var query = db.query("SELECT * FROM `admin` WHERE `email`='" + uName + "' and `password` = '" + sha1Password + "'", function (err, result) {
        if (err) {
            console.log(req.body);
        } 
        else {
            var numRows = result.length;
            if (numRows == 1) {
                var string = JSON.stringify(result);
                var json = JSON.parse(string);
                
                var UsName = json[0].name;
                var imgUser = json[0].img;
                var userPos = json[0].pos;
                
                if(cookie){
                    res.cookie('user',json[0].name, { maxAge: 86400000, httpOnly: true });  // 86400000 -> one day
                    res.cookie('image',json[0].img, { maxAge: 86400000, httpOnly: true });
                    res.cookie('pos',json[0].pos, { maxAge: 86400000, httpOnly: true });
                    
                    
                }
                else{
                    UsName = req.session.user = json[0].name;
                    imgUser = req.session.image = json[0].img;
                    userPos = req.session.pos = json[0].pos;
                    
                    
                }
                
                res.render('admin/index',{userName:UsName, img:imgUser, pos:userPos });
                

            }
            else{
                res.render('admin/login', {msg:"block"});
            }
        }
    });

}
/*************** check user credentials  ************************/



// Logout from the account
router.get('/logout', function (req, res, next) {
    req.session.destroy();
    res.clearCookie("user");
    res.clearCookie("image");
    res.clearCookie("pos");
    res.render('admin/login', {msg:"none"});
});



// profile Page
router.get('/logout', function (req, res, next) {
    req.session.destroy();
    res.clearCookie("user");
    res.clearCookie("image");
    res.clearCookie("pos");
    res.render('admin/login', {msg:"none"});
});


// profile Page
router.get('/test', function (req, res, next) {
    res.render('emailTemplate', {msg:"none"});
});



/*************** Profile Page  ************************/

var profilePage = require('../controller/admin/profile');

router.route('/profile').get(profilePage.page);
router.route('/controller/uploadImg').post(profilePage.uploadImg);
router.route('/controller/updateName').post(profilePage.updateName);
router.route('/controller/updateEmail').post(profilePage.updateEmail);
router.route('/controller/updatePosition').post(profilePage.updatePosition);
router.route('/controller/updatePassword').post(profilePage.updatePassword);

/*************** Profile Page  ************************/




/* GET Mappage. */
router.get('/map', function (req, res, next) {
    if(req.session.user){
        res.render('admin/map',{userName:req.session.user, img:req.session.image, pos:req.session.pos});
    }
    if(req.cookies.user){
        res.render('admin/map',{userName:req.cookies.user, img:req.cookies.image, pos:req.cookies.pos});
    }
    else{
        res.render('admin/login',{msg:"none"});
    }
});



/*************** Train Lines  ************************/

var tLines = require('../controller/admin/tLines');

router.route('/trainLine').get(tLines.linePage);
router.route('/controller/insertLine').post(tLines.insertLine);
router.route('/controller/deleteLine').post(tLines.deleteLine);
router.route('/controller/getLine').post(tLines.getLine);
router.route('/controller/updateLine').post(tLines.updateLine);

/*************** Train Lines  ************************/


/*************** Stations  ************************/

var station = require('../controller/admin/stations');

router.route('/station').get(station.page);
router.route('/controller/insertStation').post(station.insertStation);
router.route('/controller/deleteStation').post(station.deleteStation);
router.route('/controller/getStation').post(station.getStation);
router.route('/controller/updateStation').post(station.updateStation);
/*************** Stations  ************************/


/*************** Trains  ************************/

var train = require('../controller/admin/train');

router.route('/train').get(train.Page);
router.route('/controller/insertTrain').post(train.insertTrain);
router.route('/controller/deleteTrain').post(train.deleteTrain);
router.route('/controller/getTrain').post(train.getTrain);
router.route('/controller/updateTrain').post(train.updateTrain);

/*************** Trains  ************************/



/*************** Train Stops  ************************/

var tStops = require('../controller/admin/tStops');

router.route('/trainStops').get(tStops.tStopPage);
router.route('/controller/selectedTrain').post(tStops.selectedTrain);
router.route('/controller/insertStop').post(tStops.insertStop);
router.route('/controller/deleteStop').post(tStops.deleteStop);
router.route('/controller/getTrainStop').post(tStops.getStop);
router.route('/controller/updateStop').post(tStops.updateStop);
/*************** Train Stops  ************************/



/*************** contributors  ************************/

var cons = require('../controller/admin/contributors');

router.route('/contributor').get(cons.page);
router.route('/requests').get(cons.reqPage);
router.route('/controller/approveContributor').post(cons.approve);
router.route('/controller/deletecon').post(cons.delete);
router.route('/controller/deleteReq').post(cons.deleteReq);
router.route('/controller/getContributor').post(cons.getCon);
router.route('/controller/updateContributor').post(cons.updateCon);

//leaderboardPage
router.route('/leaderboard').get(cons.leaderboardPage);
/*************** contributors  ************************/


/*************** Report Page  ************************/
var report = require('../controller/admin/report');

router.route('/reportSchdulePage').get(report.Page);
router.route('/reportTSchdule').post(report.GetreportSchedule);
router.route('/reportCDetails').post(report.GetreportContributor);
//router.route('/controller/getBackup').post(backUp.getBackup);
//router.route('/controller/restoreBackup').post(backUp.restoreBackup);
/*************** Backup Page  ************************/




/*************** Backup Page  ************************/
var backUp = require('../controller/admin/backup');

router.route('/backup').get(backUp.page);
router.route('/controller/getBackup').post(backUp.getBackup);
router.route('/controller/restoreBackup').post(backUp.restoreBackup);
/*************** Backup Page  ************************/



module.exports = router;
