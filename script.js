// Load user balance from sessionStorage or set default
let userBalance = parseFloat(sessionStorage.getItem("userBalance")) || 5000;
document.getElementById("balance").innerText = `Balance: ₹${userBalance}`;

// Ensure user is logged in, otherwise redirect
if (sessionStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
}

// Load transactions from sessionStorage
let transactions = JSON.parse(sessionStorage.getItem("transactions")) || [];

// Function to update balance display
function updateBalance() {
    document.getElementById("balance").innerText = `Balance: ₹${userBalance}`;
    sessionStorage.setItem("userBalance", userBalance);
}

// Function to navigate to the deposit screen
function showDepositScreen() {
    hideAllScreens();
    document.getElementById("deposit-screen").style.display = "block";
}

// Function to navigate to the withdraw screen
function showWithdrawScreen() {
    hideAllScreens();
    document.getElementById("withdraw-screen").style.display = "block";
}

// Function to go back to the main menu
function backToMenu() {
    hideAllScreens();
    document.getElementById("atm-menu").style.display = "block";
}

// Function to deposit money
function depositMoney() {
    let amount = parseFloat(document.getElementById("deposit-amount").value);
    if (amount > 0) {
        userBalance += amount;
        transactions.push(`Deposited: ₹${amount}`);
        sessionStorage.setItem("transactions", JSON.stringify(transactions));
        updateBalance();
        alert(`₹${amount} Deposited Successfully!`);
        document.getElementById("deposit-amount").value = "";
        backToMenu();
    } else {
        alert("Enter a valid amount!");
    }
}

// Function to withdraw money
function withdrawMoney() {
    let amount = parseFloat(document.getElementById("withdraw-amount").value);
    if (amount > 0 && amount <= userBalance) {
        userBalance -= amount;
        transactions.push(`Withdrawn: ₹${amount}`);
        sessionStorage.setItem("transactions", JSON.stringify(transactions));
        updateBalance();
        alert(`₹${amount} Withdrawn Successfully!`);
        document.getElementById("withdraw-amount").value = "";
        backToMenu();
    } else {
        alert("Insufficient balance or invalid amount!");
    }
}

// Function to fetch and display the mini statement
function fetchMiniStatement() {
    hideAllScreens();
    let statementContainer = document.getElementById("mini-statement");
    if (transactions.length === 0) {
        statementContainer.innerHTML = "<p>No transactions yet.</p>";
    } else {
        statementContainer.innerHTML = transactions.map(t => `<p>${t}</p>`).join("");
    }
    document.getElementById("mini-statement-screen").style.display = "block";
}

// Function to hide all screens
function hideAllScreens() {
    document.getElementById("atm-menu").style.display = "none";
    document.getElementById("deposit-screen").style.display = "none";
    document.getElementById("withdraw-screen").style.display = "none";
    document.getElementById("mini-statement-screen").style.display = "none";
}

// Function to log out
function logout() {
    sessionStorage.clear(); // Clear all session data
    window.location.href = "login.html";
}
