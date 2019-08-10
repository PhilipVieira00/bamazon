var mysql = require("mysql");
var inquirer = require("inquirer");
var fs = require("fs");
let passphrase = "";
fs.readFile("password.txt", function read(err, res) {
    if (err) throw err;
    passphrase = res;
    bamazon();
});
function bamazon() {
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,// Your port; if not 3306
    user: "root",  // Your username
    password: passphrase,  // Your password
    database: "bamazon_db"
   });
   connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    connection.query("SELECT * FROM productsList", function(err, results) {
        listingArray = results;
        console.log(listingArray);
            inquirer.prompt([
                {
                    name: "betaId",
                    type: "input",
                    message: "What is the ID of the item you would like to purchase?"
                },
                {
                    name: "purchase",
                    type: "input",
                    prompt: "How many would you like to purchase?"
                }
            ]).then(function(answer) {
                let alphaId = answer.betaId;
                let alphaPrice = 0;
                let alphaAmount = 0;
                for (let i = 0; i<listingArray.length; i++) {
                    if (listingArray[i].item_id == answer.betaId) {
                        alphaAmount = listingArray[i].stock -answer.purchase;
                        alphaPrice = listingArray[i].price* answer.purchase;
                        alphaName = listingArray[i].product_name;
                        if (alphaAmount>=0) {
                        connection.query("UPDATE productsList SET ? WHERE ?", [{stock: alphaAmount},{item_id: alphaId}], function(err, results) {
                            console.log("Thank you for purchasing " + answer.purchase + " " + alphaName + ". This has cost you " + alphaPrice + "$");
                            connection.end();
                        })
                        i = listingArray.length;
                    }
                    else {
                        console.log("Unfortunately, we do not have sufficient stonks to deal with your request right now.");
                        connection.end();
                    }
                    }
                }
            })
    })
})
}
