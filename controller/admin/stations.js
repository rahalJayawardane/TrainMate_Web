var db = require('../../views/database.js');


var status = "";



module.exports = {

    /* GET Station Table page. */
    page : function(req, res){
       db.query('select s.*,t.name as tName from station as s inner join trinline as t on s.`lineid` = t.lineId; select * from trinline', function (err, result) {
            if (err)
                throw err;
            else {
                if(req.session.user){
                    res.render('admin/station',{data:result[0], trainLines:result[1] , status:status, userName:req.session.user, img:req.session.image, pos:req.session.pos});
                    status = "";
                }
                if(req.cookies.user){
                    res.render('admin/station',{data:result[0], trainLines:result[1] , status:status, userName:req.cookies.user, img:req.cookies.image, pos:req.cookies.pos});
                    status = "";
                }
                else{
                    res.render('admin/login',{msg:"none"});
                }


            }
        });
    },


    /* GET insert Station */
    insertStation : function(req, res){
       var query = db.query('INSERT INTO station SET ?',req.body, function (err, result) {
            if (err){
                console.log(req.body);
                console.log(query.sql);
            }
            else{
                status = "Station Inserted Successfully";
                res.redirect('/admin/station');
            }
        });
    },

    /* Delete Station  */
    deleteStation : function(req, res){
       var query = db.query('delete from station where ?',req.body, function (err, result) {
            console.log(query.sql);
            if (err){
                console.log(req.body);
            }
            else{
                status = "Station Deleted Successfully";
                res.redirect('/admin/station');
            }
        });
    },

    /* GET specific Station */
    getStation : function(req, res){
       var query = db.query('select * from station where ?',req.body, function (err, result) {
            if (err){
                console.log(req.body);
            }
            else{
                console.log(query.sql);
                var data = result;
                res.send(result);
            }
        });
    },

    /* Update specific Station */
    updateStation : function(req, res){
        var sqlQ = "UPDATE station SET lineid= '"+req.body.lineName+"', name= '"+req.body.stationName+"', contact = '"+req.body.contactNo+"', lang= '"+req.body.langtitude+"', `longa`= '"+req.body.longtitude+"' WHERE s_Id = '"+req.body.stationId+"'";
        var query = db.query(sqlQ, function (err, result) {
            console.log(query.sql);
            if (err){
                console.log(req.body);
            }
            else{
                status = "Station updated Successfully";
                res.redirect('/admin/station');
            }
        });
    }
}
