var express = require('express');
var router = express.Router();


/* GET landing page. */
router.get('/', function(req, res, next) {
  res.render('blog/index');
});


router.get('/forum', function(req, res, next) {
  res.render('blog/fourm');
});

//

router.get('/post/:postId', function(req, res, next) {
  res.render('blog/post');
});

//router.get('/test/:postId', function(req, res, next) {
//  res.render('blog/post');
//});


/*************** trainSearching Page  ************************/

var train = require('../controller/blog/searchTrains');

router.route('/train').get(train.page);
router.route('/search').post(train.results);
router.route('/best').get(train.best);
router.route('/register').get(train.register);
router.route('/controller/request').post(train.insertReq);

router.route('/controller/checkmails').post(train.check);

router.route('/test/:postId').get(train.test);

//controller/checkmails
///controller/request

/*************** trainSearching Page   ************************/





module.exports = router;
