var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "myrootpassword",
  database: "bamazon"
});

//connect
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadID + "\n");
});
