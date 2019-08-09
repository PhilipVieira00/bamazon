var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,// Your port; if not 3306
    user: "root",  // Your username
    password: "D0nu7m3w3rs22!",  // Your password
    database: "bamazon_db"
   });
   connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    connection.query("SELECT * FROM productsList", function(err, results) {
        if (err) throw err;
        var listingArray = [];
        for (let i = 0; i<results.length; i++) {
            listingArray.push(results[i]);
        }
        console.log(listingArray);
    })
  });
