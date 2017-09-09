var express = require('express');
var mysql = require('mysql');


var conn = mysql.createPool({
    multipleStatements: true,
    connectionLimit:50,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'trainmate'
});


module.exports = conn;