var db = require('../../views/database.js');

var request = require('request');


var status = "";
var stops = {};
var trainId = "No Train Selected! ";


module.exports = {
    
    
    
    /* GET Line Table page. */
    Page : function(req, res){
            db.query("select * from train; SELECT s_Id,name FROM `station`  where `s_Id` not in (select `s_Id` from trainstop where `t_id` = (SELECT `trainId` FROM `train` WHERE concat(trainId,' : ',Name)= '"+trainId+"')) order by s_Id;",[1,2], function (err, result) {
                if (err)
                    throw err;
                else {
                    if(req.session.user){
                        res.render('admin/report',{data:result[0] , status:status, Stops:stops, tId: trainId, Stations:result[1], userName:req.session.user, img:req.session.image, pos:req.session.pos});
                        status = "";
                        stops = {};
                        trainId = "No Train Selected! ";
                    }
                    if(req.cookies.user){
                        res.render('admin/report',{data:result[0] , status:status, Stops:stops, tId: trainId, Stations:result[1], userName:req.cookies.user, img:req.cookies.image, pos:req.cookies.pos});
                        status = "";
                        stops = {};
                        trainId = "No Train Selected! ";
                    }
                    else{
                        res.render('admin/login',{msg:"none"});
                    }

                }
            });
    },
    
    
    /* GET Train Schdule Report Page. */
    GetreportSchedule : function(req, res){
       var query = db.query("select * from station", function (err, result1) {
            if (err) {
                console.log(req.body);
            } else {
                
                var trainName = [];
               
                
                var objs1 = [];
                for (var i = 0;i < result1.length; i++) {
                    objs1.push({"id": result1[i].s_Id,"name":result1[i].name,"latitude":result1[i].longa,"longitude":result1[i].lang,"distances":{},"arrivals":{}});
                }
                
                var arrayX = JSON.stringify(objs1);
                console.log(arrayX);
                
                
                 
            }
        });
        
        
       var query = db.query("SELECT `id`,`dayType`, `arr`, `dept`,s.* FROM `trainstop` as ts inner join station as s on ts.`s_Id` = s.s_Id where `t_id` = (SELECT `trainId` FROM `train` WHERE concat(trainId,' : ',Name)= '"+req.body.t_id+"') order by arr", function (err, result) {
            if (err) {
                console.log(req.body);
            } else {
                
                var trainName = [];
                var strNew = req.body.t_id.replace(":", ",");
                trainName.push({"T_name": strNew});
                
                var objs = [];
                for (var i = 0;i < result.length; i++) {
                    objs.push({"id": result[i].s_Id,"name":result[i].name,"arr":result[i].arr,"dept":result[i].dept});
                    
                }
                
                               
                
                mydata = {}
				mydata["trainStops"] = objs;
                mydata["train"] = trainName;
                
                
                data = {
                        template:{"shortid":'BynN_cl0l'},
						data:mydata
                    }
                    var options = {
                        uri:'http://localhost:8001/api/report',
                        method:'POST',
                        headers: 'Content-Type: application/json',
                        json:true, body: data
                    }
                    request(options).pipe(res);  
            }
        });
    },
    
    GetreportContributor : function(req, res){
       var query = db.query("select * from contributors where id='"+req.body.con_id+"'", function (err, result) {
            if (err) {
                console.log(query.sql);
                console.log(req.body);
            } else {
                
                var con = [];
                con.push({"name":result[0].name,"start":req.body.start,"end":req.body.end});
                
                var objs = [];
                for (var i = 0;i < result.length; i++) {
                    //objs.push({"id": result[i].s_Id,"name":result[i].name,"arr":result[i].arr,"dept":result[i].dept});
                }
                
                               
                
                mydata = {}
				mydata["trainStops"] = objs;
                mydata["con"] = con;
                
                
                data = {
                        template:{"shortid":"rJ8QGCY1b"},
						data:mydata
                    }
                    var options = {
                        uri:'http://localhost:8001/api/report',
                        method:'POST',
                        headers: 'Content-Type: application/json',
                        json:true, body: data
                    }
                    request(options).pipe(res);  
            }
        });
    },
    
    //


}



