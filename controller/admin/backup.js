var mysqlDump = require('mysqldump');
var dateFormat = require('dateformat');
var fs = require('fs');
var multer = require('multer');


var express = require('express');
var mysql = require('mysql');


var conn = mysql.createPool({
    multipleStatements: true,
    connectionLimit:50,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testTrain'// test database
});



var status = "";


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './')
    },
    filename: function (req, file, cb) {
        fileName = file.originalname;
        //cb(null, file.originalname);
    }
});


var upload = multer({storage: storage}).single('restorefile');




module.exports = {

    /* GET backup page. */
    page : function(req, res){
        if(req.session.user){
            res.render('admin/backup',{status:status, userName:req.session.user, img:req.session.image, pos:req.session.pos});
            status = "";
        }
        if(req.cookies.user){
            res.render('admin/backup',{status:status, userName:req.cookies.user, img:req.cookies.image, pos:req.cookies.pos});
            status = "";
        }
        else{
            res.render('admin/login',{msg:"none"});
        }

    },


    /* download sql file */
    getBackup : function(req, res){
        mysqlDump({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'trainmate',
            dest:'./data.sql' // destination file
        },function(err){
            console.log("error!!");
        });
        var now = new Date();
        var datetime = dateFormat(now, "yyyy-mm-dd");


        res.download('./data.sql', 'backup_'+datetime+'.sql');

    },

    /* restore sql file */
    restoreBackup : function(req, res){
        
        var sql = req.body.file;
        
        conn.query("drop database `testtrain`; create database `testtrain`; ", function (err, result) {
            if (err)
                console.log('1');
            else {
                conn.query(sql, function (err, result) {
                    if (err)
                        console.log('2');
                    else {
                        console.log('3');
                        status = "Restored All Tables Successfully";
                        res.send("true");

                    }
                });

            }
        });




    }



}
