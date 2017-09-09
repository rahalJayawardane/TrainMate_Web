var db = require('../../views/database.js');


var status = "";

module.exports = {

    /* GET Line Table page. */
    Page : function(req, res){
       db.query('SELECT `train`.*,s1.name as startName, s2.name as endName  FROM `train` inner join station as s1 on s1.s_Id = `start`inner join station as s2 on s2.s_Id = `end`; select * from trinline;  select * from station order by name', function (err, result) {
            if (err)
                throw err;
            else {
                if(req.session.user){
                    res.render('admin/train',{data:result[0], linedata:result[1], stationdata:result[2] , status:status, userName:req.session.user, img:req.session.image, pos:req.session.pos});
                    status = "";
                }
                if(req.cookies.user){
                    res.render('admin/train',{data:result[0], linedata:result[1], stationdata:result[2] , status:status, userName:req.cookies.user, img:req.cookies.image, pos:req.cookies.pos});
                    status = "";
                }
                else{
                    res.render('admin/login',{msg:"none"});
                }


            }
        });
    },


    /* GET insertLine */
    insertTrain : function(req, res){
        var train = req.body ;
        var query = db.query('INSERT INTO train (trainId,name,start,end,type,routine) VALUES (?,?,?,?,?,?) ',[train.trainId,train.Name,train.start,train.end,train.type,train.routine], function (err, result) {
            if (err){
                console.log(req.body);
            }
            else{
                var sql = 'INSERT INTO covered_line (trainId,line_Id) VALUES ?';
                var values = [];
                for (var i = 0; i < train.train_line.length; i++) {
                  values.push([train.trainId,train.train_line[i]]);
                }
                var subquery = db.query(sql, [values] , function(err,subresult){
                  if (err){
                      console.log(req.body);
                  }
                  else{
                    status = "Train Inserted Successfully";
                    res.redirect('/admin/train');
                  }
                });

            }
        });
    },

    /* Delete Line  */
    deleteTrain : function(req, res){
       var query = db.query('delete from train where ?',req.body, function (err, result) {
            console.log(query.sql);
            if (err){
                console.log(req.body);
            }
            else{
              var subquery = db.query('delete from covered_line where ?',req.body, function (err, result) {
                  console.log(query.sql);
                  if (err){
                      console.log(req.body);
                  }
                  else{
                      status = "Train Deleted Successfully";
                      res.redirect('/admin/train');
                  }
              });

            }
        });
    },

    /* GET specificLine */
    getTrain : function(req, res){
       var query = db.query('select * from train where ?',req.body, function (err, result) {
            if (err){
                console.log(query.sql);
                console.log(req.body);
            }
            else{
                var subquery = db.query('select * from covered_line where ?',req.body, function (err, lineresult) {
                      if (err){
                          console.log(req.body);
                      }
                      else{
                          console.log(result);
                          console.log(lineresult);
                          res.send({data:result,linedata:lineresult});
                      }
                  });
            }
        });
    },

    /* Update specificLine */
    updateTrain : function(req, res){
        var train = req.body ;
        var sqlQ1 = "UPDATE train SET Name='"+req.body.Name+"',start= '"+req.body.start+"', end= '"+req.body.end+"',routine= '"+req.body.routine+"',type= '"+req.body.type+"' WHERE trainId = '"+req.body.trainId+"'";
        var sqlQ2 = "delete from covered_line WHERE trainId = '"+req.body.trainId+"'";
        var sqlQ = sqlQ1+";"+sqlQ2;
        
        var sqlQ3 = "INSERT INTO covered_line (trainId,line_Id) VALUES ?";
        var values = [];
            for (var i = 0; i < train.train_line1.length; i++) {
                values.push([train.trainId,train.train_line1[i]]);
            }
        
        var query = db.query(sqlQ, function (err, result) {
            console.log(query.sql);
            if (err){
                console.log(req.body);
            }
            else{
                var subquery = db.query(sqlQ3, [values] , function(err,subresult){
                  if (err){
                      console.log(req.body);
                  }
                  else{
                        status = "Train updated Successfully";
                        res.redirect('/admin/train');
                  }
                });
                
               
            }
        });
        
            //console.log(values);
            
    }
}
