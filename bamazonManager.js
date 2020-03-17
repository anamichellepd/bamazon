var mysql = require("mysql");
var inquirer = require("inquirer");

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
  //   console.log("connected as id " + connection.threadId + "\n");
});

//inquirer for user to select what they want to do: view products for sale, view low inventory, add to inventory or add new product

getStarted();

//function to display everything
function getStarted() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product"
        ]
      }
    ])
    .then(function(answer) {
      switch (answer.action) {
        case "View Products for Sale":
          {
            viewProductsForSale();
          }
          break;
        case "View Low Inventory":
          viewLowInventory();
          break;
        case "Add to Inventory":
          addToInventory();
          break;
        case "Add New Product":
          addNewProduct();
      }
    });
}
function viewProductsForSale() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(
        "Product ID: " +
          res[i].product_id +
          " | " +
          res[i].product_name +
          " | " +
          "Price: $" +
          res[i].price +
          " | " +
          "Quantity: " +
          res[i].stock_quantity
      );
    }
    console.log("---------------------------------------");

    getStarted();
  });
}

function viewLowInventory() {
  connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(
    err,
    results,
    fields
  ) {
    for (let i = 0; i < results.length; i++) {
      console.log(
        results[i].product_name +
          " | " +
          "Stock Quantity: " +
          results[i].stock_quantity
      );
    }
  });
}
function addToInventory() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "productID",
        message: "ID of product you would like to add to"
      },
      {
        type: "input",
        name: "units",
        message: "How many units would you like to add?"
      }
    ])
    .then(function(answer) {
      connection.query(
        "UPDATE products SET stock_quantity = stock_quantity + ? WHERE product_id =?",
        [answer.units, answer.productID],
        function(err, results, fields) {
          if (err) throw err;
          console.log(
            answer.units +
              " units have been added to ID number: " +
              answer.productID
          );
        }
      );
    });
}
function addNewProduct() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "newID",
        message: "What is the product's ID number?"
      },
      {
        type: "input",
        name: "newProduct",
        message: "What is the product's name?"
      },
      {
        type: "input",
        name: "departmentName",
        message: "Which department does it belong to?"
      },
      { type: "input", name: "newPrice", message: "How much does it cost?" },
      { type: "input", name: "amount", message: "How many units in stock?" }
    ])
    .then(function(answer) {
      connection.query("INSERT INTO products SET?", {
        product_id: answer.newID,
        product_name: answer.newProduct,
        department_name: answer.departmentName,
        price: answer.newPrice,
        stock_quantity: answer.amount
      });
      console.log("The new product has been added!");
    });
}
