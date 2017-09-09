var db = require('../../views/database.js');


var status = "";

function sessionCheck(req, res, site ) {
    if(!req.session.user){
        res.render('admin/login',{msg:"none"});
    }
    else{
        res.render(site);
    }
}




module.exports = {

    /* GET Line Table page. */
    linePage : function(req, res){
       db.query('select * from trinline', function (err, result) {
            if (err)
                throw err;
            else {
                if(req.session.user){
                    res.render('admin/trainLine',{data:result , status:status, userName:req.session.user, img:req.session.image, pos:req.session.pos});
                    status = "";
                }
                if(req.cookies.user){
                    res.render('admin/trainLine',{data:result , status:status, userName:req.cookies.user, img:req.cookies.image, pos:req.cookies.pos});
                    status = "";
                }
                else{
                    res.render('admin/login',{msg:"none"});
                }


            }
        });
    },


    /* GET insertLine */
    insertLine : function(req, res){
       var query = db.query('INSERT INTO trinline SET ?',req.body, function (err, result) {
            if (err){
                console.log(req.body);
            }
            else{
                status = "Train Line Inserted Successfully";
                res.redirect('/admin/trainLine');
            }
        });
    },

    /* Delete Line  */
    deleteLine : function(req, res){
       var query = db.query('delete from trinline where ?',req.body, function (err, result) {
            console.log(query.sql);
            if (err){
                console.log(req.body);
            }
            else{
                status = "Train Line Deleted Successfully";
                res.redirect('/admin/trainLine');
            }
        });
    },

    /* GET specificLine */
    getLine : function(req, res){
       var query = db.query('select * from trinline where ?',req.body, function (err, result) {
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

    /* Update specificLine */
    updateLine : function(req, res){
        var sqlQ = "UPDATE trinline SET name= '"+req.body.name+"', noOfStation = '"+req.body.noOfStation+"', start= '"+req.body.start+"', end= '"+req.body.end+"' WHERE lineId = '"+req.body.lineId+"'";
        var query = db.query(sqlQ, function (err, result) {
            console.log(query.sql);
            if (err){
                console.log(req.body);
            }
            else{
                status = "Train Line updated Successfully";
                res.redirect('/admin/trainLine');
            }
        });
    }
}
