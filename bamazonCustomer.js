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
  console.log("connected as id " + connection.threadID + "\n");
  queryAllProducts();
});

//function to display everything
function queryAllProducts() {
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
          res[i].price
      );
    }
    console.log("---------------------------------------");
    placeOrder();
  });
}

//function to ask the client the first questions
function placeOrder() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "input",
          name: "productID",
          message: "ID of product you would like to buy"
        },
        {
          type: "input",
          name: "units",
          message: "How many units of the product would you like?"
        }
      ])
      .then(function(answer) {
        connection.query(
          "SELECT stock_quantity, price FROM products WHERE product_ID = ?",
          [answer.productID],
          function(error, results, fields) {
            var amountLeft = results[0].stock_quantity;
            var purchaseTotal = answer.units * results[0].price;
            if (answer.units > amountLeft) {
              console.log("Not enough inventory, try again.");
              placeOrder();
            } else {
              connection.query("UPDATE products SET ? WHERE ?", [
                { stock_quantity: amountLeft - answer.units },
                { product_id: answer.productID }
              ]);

              console.log(
                "The total cost of your purchase is $" + purchaseTotal
              );
            }
          }
        );

        // if (answer.units >= results.stock_quantity) {
        //   console.log("omg it's working");
        // }
      });
  });
}

//function to check how much is left and process request
