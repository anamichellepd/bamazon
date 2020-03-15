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
          res[i].price +
          " | " +
          "Stock quantity: " +
          res[i].stock_quantity
      );
    }
    console.log("--------------------------");
  });
}
