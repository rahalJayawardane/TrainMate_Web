var db = require('../../views/database.js');
var multer = require('multer');
var imager = require('multer-imager');
var sha1 = require('sha1');



var status = "";
var uN = "";
var imgUser = "";
var position = "";



var fileName = "";


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/admin/')
    },
    filename: function (req, file, cb) {
        fileName = "images/admin/"+file.originalname;
        cb(null, file.originalname);
    }
});



// set session after changes
function updateSessions(req, res, id) {
    
    var query = db.query("SELECT * FROM `admin` WHERE `id`='" + id + "'", function (err, result) {
        if (err) {
            console.log(req.body);
        } 
        else {
            console.log(query.sql);
            var numRows = result.length;
            if (numRows > 0) {
                var string = JSON.stringify(result);
                var json = JSON.parse(string);
                
                
                if(req.cookies.user){
                    res.cookie('user',json[0].name, { maxAge: 86400000, httpOnly: true });  // 86400000 -> one day
                    res.cookie('image',json[0].img, { maxAge: 86400000, httpOnly: true });
                    res.cookie('pos',json[0].pos, { maxAge: 86400000, httpOnly: true });
                    
                }
                else{
                    req.session.user = json[0].name;
                    req.session.image = json[0].img;
                    req.session.pos = json[0].pos;
                }
//                
                
                res.redirect('/admin/profile');

                

            }
            else{
                res.render('admin/login', {msg:"block"});
            }
        }
    });

}





var upload = multer({storage: storage}).single('imageUser');

module.exports = {

    /* GET Line Table page. */
    page: function (req, res) {
        if (req.session.user) {
            uN = req.session.user;
            imgUser = req.session.image;
            position = req.session.pos;
        }
        else if (req.cookies.user) {
            uN = req.cookies.user;
            imgUser = req.cookies.image;
            position = req.cookies.pos;
        } else {
            res.render('admin/login', {
                msg: "none"
            });
        }

        db.query("select * from admin where name = '" + uN + "' ", function (err, result) {
            if (err)
                throw err;
            else {
                res.render('admin/profile', {userName: uN, img: imgUser, pos: position,data: result});
                status = "";
            }
        });




    },


    /* upload the image */
    uploadImg:   function (req, res) {
        upload(req, res, function (err) {
        if (err) {
          console.log(err);
          return
        }
        else{
            var sqlQ = "UPDATE admin SET img= '"+fileName+"' WHERE  id = '"+req.body.id+"'";
            var query = db.query(sqlQ, function (err, result) {
                if (err){
                    console.log(req.body);
                }
                else{
                    status = "Image Uploaded Sucessfully! ";
                    updateSessions(req,res,req.body.id);
                }
            });
            
        }

      })
        
    },


    /* Update Admin Name */
    updateName: function (req, res) {
        var sqlQ = "UPDATE admin SET name= '" + req.body.name + "' WHERE id = '" + req.body.CID + "'";
        var query = db.query(sqlQ, function (err, result) {
            console.log(query.sql);
            if (err) {
                console.log(req.body);
            } else {
                console.log(query.sql);
                status = "Admin Name Updated Successfully";
                updateSessions(req,res,req.body.CID);
            }
        });
    },
    
    
    
    /* Update Admin Name */
    updateEmail: function (req, res) {
        
        var query = db.query("select * from admin where email='"+req.body.newEmail+"'", function (err, result) {
            if (err) {
                console.log(req.body);
            } 
            else {
                var numRows = result.length;
                if (numRows > 0) {
                    res.send("already");
                }
                else{
                    var sqlQ = "UPDATE admin SET email= '" + req.body.newEmail + "' WHERE id = '" + req.body.CID + "'";
                    var query = db.query(sqlQ, function (err, result) {
                        console.log(query.sql);
                        if (err) {
                            console.log(req.body);
                        } else {
                            res.send("true");
                        }
                    });
                    
                }
            }
        });
        
        
    },
    
    
    /* Update Admin Position */
    updatePosition: function (req, res) {
        
        var sqlQ = "UPDATE admin SET pos= '" + req.body.pos + "' WHERE id = '" + req.body.CID + "'";
            var query = db.query(sqlQ, function (err, result) {
                if (err) {
                    console.log(req.body);
                } else {
                    updateSessions(req,res,req.body.CID);
                    //console.log(query.sql);
                    
                }
            });
        
        
    },
    
    
    /* Update Admin password */
    updatePassword: function (req, res) {
        
        var sha1Password = sha1(req.body.newPw);
        
        var sqlQ = "UPDATE admin SET password= '" + sha1Password + "' WHERE id = '" + req.body.CID + "'";
            var query = db.query(sqlQ, function (err, result) {
                if (err) {
                    console.log(req.body);
                } else {
                    res.send("true");
                }
            });
        
        
    }


    
}
