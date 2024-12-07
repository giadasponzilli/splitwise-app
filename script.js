const { parse } = require("csv-parse");
const fs = require("fs");

// specify the path of the CSV file
const path = "./lending-records.csv";

let giadaAccount = 0;

let claudiaAccount = 0;


// Create a readstream
// Parse options: delimiter and start from line 1

fs.createReadStream(path)
  .pipe(parse({ delimiter: ",", from_line: 1 }))
  .on("data", function (row) {
    // executed for each row of data
    console.log(row);
    if (row[0] === "Giada") {
      giadaAccount += Number(row[2])
    } else if (row[0] === "Claudia") {
      claudiaAccount += Number(row[2])
    }
    console.log(`Giada lent ${giadaAccount} to Claudia`)
    console.log(`Claudia lent ${claudiaAccount} to Giada`)
    if (giadaAccount > claudiaAccount) {
      const difference = giadaAccount - claudiaAccount;
      console.log(`Claudia is in debit of ${difference}`);
    } else if (claudiaAccount > giadaAccount) {
      const difference = claudiaAccount - giadaAccount;
      console.log(`Giada is in debit of ${difference}`);
    }

  })
  .on("error", function (error) {
    // Handle the errors
    console.log(error.message);
  })
  .on("end", function () {
    // executed when parsing is complete
    console.log("File read successful");
  });