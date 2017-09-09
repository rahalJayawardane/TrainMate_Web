var db = require('../../views/database.js');


var status = "";
var stops = {};
var trainId = "No Train Seleceted! ";


/* send all stops to the Page */
function Page(req, res,statusMsg) {
    var query = db.query("SELECT `id`,`dayType`, `arr`, `dept`,s.* FROM `trainstop` as ts inner join station as s on ts.`s_Id` = s.s_Id where `t_id` = (SELECT `trainId` FROM `train` WHERE concat(trainId,' : ',Name)= '" + req + "')", function (err, result) {
        if (err) {
            console.log(req.body);
        } else {
            trainId = req;
            stops = result;
            status= statusMsg;
            res.redirect('/admin/trainStops');
            //console.log(result);
        }
    });

}



module.exports = {

   /* GET Line Table page. */
    tStopPage : function(req, res){
            db.query("select * from train; SELECT s_Id,name FROM `station`  where `s_Id` not in (select `s_Id` from trainstop where `t_id` = (SELECT `trainId` FROM `train` WHERE concat(trainId,' : ',Name)= '"+trainId+"')) order by s_Id;",[1,2], function (err, result) {
                if (err)
                    throw err;
                else {
                    if(req.session.user){
                        res.render('admin/trainStops',{data:result[0] , status:status, Stops:stops, tId: trainId, Stations:result[1], userName:req.session.user, img:req.session.image, pos:req.session.pos});
                        status = "";
                        stops = {};
                        trainId = "No Train Seleceted! ";
                    }
                    if(req.cookies.user){
                        res.render('admin/trainStops',{data:result[0] , status:status, Stops:stops, tId: trainId, Stations:result[1], userName:req.cookies.user, img:req.cookies.image, pos:req.cookies.pos});
                        status = "";
                        stops = {};
                        trainId = "No Train Seleceted! ";
                    }
                    else{
                        res.render('admin/login',{msg:"none"});
                    }

                }
            });
    },


    /* GET train Stops */
    selectedTrain : function(req, res){
        var tId = req.body.t_id;
        Page(tId,res,"");
    },

    /* Insert trains Stops */
    insertStop : function(req, res){
            var query = db.query('INSERT INTO trainstop SET ?', req.body, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    status = "Train Stop Added Successfully";
                    var trainId = req.body.t_id;
                    var query2 = db.query("SELECT concat(`trainId`,' : ', `Name`) as `t_Id` FROM `train` WHERE `trainId` ='" + trainId + "'", function (err, result) {
                        if (err) {
                            console.log(query2.sql);
                        } else {
                            var string=JSON.stringify(result);
                            var json =  JSON.parse(string);
                            Page(json[0].t_Id,res,status);
                        }
                    });
//

                }
            });
    },

    /* Delete Stop  */
    deleteStop : function(req, res){
       var query = db.query("delete from trainstop where id= '"+req.body.id+"'", function (err, result) {
            console.log(query.sql);
            if (err){
                console.log(req.body);
            }
            else{
                console.log(req.body.t_id);
                status = "Train Stop Deleted Successfully";
                Page(req.body.t_id,res,status);
            }
        });
    },

    /* GET specific Stop */
    getStop : function(req, res){
       var query = db.query('SELECT ts.*, s.name FROM `trainstop` as ts inner join station as s on s.`s_Id` = ts.`s_Id` where ?',req.body, function (err, result) {
            if (err){
                console.log(req.body);
            }
            else{
                //console.log(result);
                var data = result;
                res.send(result);
            }
        });
    },

    /* Update specific Stop */
    updateStop : function(req, res){
        var station = "";
        if(req.body.s_Id == ""){
            station = req.body.s_Id_old_id;
        }
        else{
            station = req.body.s_Id;
        }

        var sqlQ = "UPDATE trainstop SET dayType= '"+req.body.dayType1+"', s_Id = '"+station+"', arr= '"+req.body.arr+"', dept= '"+req.body.dept+"' WHERE id = '"+req.body.id+"'";
        var query = db.query(sqlQ, function (err, result) {
            console.log(query.sql);
            if (err){
                console.log(req.body);
            }
            else{
                status = "Train Stop updated Successfully";
                Page(req.body.t_id,res,status);
            }
        });
    }
}
