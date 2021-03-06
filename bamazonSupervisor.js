var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "myrootpassword",
  database: "bamazon",
  multipleStatements: true
});

//connect
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadID + "\n");
  getStarted();
});

function getStarted() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: ["View Product Sales by Department", "Create New Department"]
      }
    ])
    .then(function(answer) {
      switch (answer.action) {
        case "View Product Sales by Department":
          {
            viewProductSalesByDepartment();
          }
          break;
        case "Create New Deparment":
          createNewDepartment();
      }
    });
}

function viewProductSalesByDepartment() {
  connection.query("SELECT * FROM departments; SELECT 2", function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    console.log(results[0]);
    console.log(results[1]);
  });
}
