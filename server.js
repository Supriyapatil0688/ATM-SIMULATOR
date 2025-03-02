const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

let transactions = [];

// Load existing transactions from file
if (fs.existsSync("data.json")) {
    transactions = JSON.parse(fs.readFileSync("data.json"));
}

// Save Transaction to File
app.post("/saveTransaction", (req, res) => {
    transactions.push(req.body.transaction);
    fs.writeFileSync("data.json", JSON.stringify(transactions, null, 2));
    res.send("Transaction saved!");
});

// Fetch Mini Statement
app.get("/mini-statement", (req, res) => {
    res.json(transactions.slice(-5)); // Return last 5 transactions
});

app.listen(3000, () => console.log("Server running on port 3000"));
