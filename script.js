// ==========================================
// PERSONAL BUDGET & EXPENSE TRACKER
// Week 7 - JavaScript Interactivity
// ==========================================


// ==========================================
// PART 1: ARRAY OF EXPENSE OBJECTS
// ==========================================

let expenses = [
    {
        name: "Groceries",
        amount: 5000,
        category: "Food"
    },
    {
        name: "Transport",
        amount: 3000,
        category: "Transport"
    },
    {
        name: "Rent",
        amount: 15000,
        category: "Rent"
    },
    {
        name: "Internet",
        amount: 2500,
        category: "Utilities"
    },
    {
        name: "School Supplies",
        amount: 4000,
        category: "Education"
    }
];


// ==========================================
// PART 2: CALCULATE TOTAL EXPENSES
// ==========================================

function calculateTotal() {

    const total = expenses.reduce(function(sum, expense) {
        return sum + expense.amount;
    }, 0);

    // Round the result to 2 decimal places
    return Math.round(total * 100) / 100;
}


// ==========================================
// PART 3: RENDER EXPENSES TO THE DOM
// ==========================================

function renderTable() {

    const transactionsList =
        document.querySelector("#transactions-list");

    // Clear existing table rows
    transactionsList.innerHTML = "";

    // Create a table row for every expense
    expenses.forEach(function(expense) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${expense.name}</td>
            <td>${expense.category}</td>
            <td>-</td>
            <td>Expense</td>
            <td>KSh ${expense.amount.toFixed(2)}</td>
            <td>-</td>
        `;

        transactionsList.appendChild(row);
    });


    // Update total expenses
    const totalExpenses =
        document.querySelector("#total-expenses");

    totalExpenses.textContent =
        `KSh ${calculateTotal().toFixed(2)}`;


    // Update remaining balance
    const remainingBalance =
        document.querySelector("#remaining-balance");

    const monthlyBudget = 60000;

    const balance =
        monthlyBudget - calculateTotal();

    remainingBalance.textContent =
        `KSh ${balance.toFixed(2)}`;
}


// ==========================================
// PART 4: FORM SUBMIT EVENT LISTENER
// ==========================================

const transactionForm =
    document.querySelector("#transaction-form");


transactionForm.addEventListener("submit", function(event) {

    // Prevent the page from refreshing
    event.preventDefault();


    // Get values from the form
    const type =
        document.querySelector("#transaction-type").value;

    const description =
        document.querySelector("#description").value.trim();

    const category =
        document.querySelector("#category").value;

    const amount =
        Number(document.querySelector("#amount").value);


    // Only add expenses to the expense array
    if (type === "expense") {

        // Create a new expense object
        const newExpense = {
            name: description,
            amount: amount,
            category: category
        };


        // Add the new expense to the array
        expenses.push(newExpense);


        // Rebuild the table
        renderTable();
    }


    // Clear the form
    transactionForm.reset();

});


// ==========================================
// INITIAL RENDER
// ==========================================

renderTable();


// ================================
// Hamburger Menu
// ================================

const hamburger = document.getElementById("hamburger");
const mainNav = document.getElementById("main-nav");

hamburger.addEventListener("click", () => {
    mainNav.classList.toggle("active");

    if (mainNav.classList.contains("active")) {
        hamburger.textContent = "✕";
        hamburger.setAttribute("aria-label", "Close navigation");
    } else {
        hamburger.textContent = "☰";
        hamburger.setAttribute("aria-label", "Open navigation");
    }
});

// Close menu after clicking a navigation link
const navLinks = document.querySelectorAll(".main-nav a");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        mainNav.classList.remove("active");
        hamburger.textContent = "☰";
        hamburger.setAttribute("aria-label", "Open navigation");
    });
});