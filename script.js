// ========================================
// BUDGET TRACK - EXPENSE TRACKER
// JavaScript Week 7
// ========================================


// ========================================
// PART 1: STORE EXPENSES AS AN ARRAY
// OF OBJECTS
// ========================================

let transactions = [
    {
        description: "Groceries",
        amount: 5000,
        category: "Food",
        date: "2026-08-01",
        type: "expense"
    },
    {
        description: "Transport",
        amount: 3000,
        category: "Transport",
        date: "2026-08-05",
        type: "expense"
    },
    {
        description: "Monthly Rent",
        amount: 15000,
        category: "Rent",
        date: "2026-08-01",
        type: "expense"
    },
    {
        description: "Internet",
        amount: 2500,
        category: "Utilities",
        date: "2026-08-10",
        type: "expense"
    },
    {
        description: "School Supplies",
        amount: 4000,
        category: "Education",
        date: "2026-08-12",
        type: "expense"
    },
    {
        description: "Salary",
        amount: 60000,
        category: "Other",
        date: "2026-08-01",
        type: "income"
    }
];


// ========================================
// PART 2: CALCULATE TOTAL EXPENSES
// ========================================

function calculateTotalExpenses() {

    const total = transactions
        .filter(transaction => transaction.type === "expense")
        .reduce((sum, transaction) => {
            return sum + transaction.amount;
        }, 0);

    // Round to 2 decimal places
    return Math.round(total * 100) / 100;
}


// ========================================
// CALCULATE TOTAL INCOME
// ========================================

function calculateTotalIncome() {

    const total = transactions
        .filter(transaction => transaction.type === "income")
        .reduce((sum, transaction) => {
            return sum + transaction.amount;
        }, 0);

    return Math.round(total * 100) / 100;
}


// ========================================
// CALCULATE BALANCE
// ========================================

function calculateBalance() {

    const income = calculateTotalIncome();
    const expenses = calculateTotalExpenses();

    return Math.round((income - expenses) * 100) / 100;
}


// ========================================
// PART 3: RENDER TRANSACTIONS TO DOM
// ========================================

function renderTransactions() {

    const transactionsList =
        document.querySelector("#transactions-list");

    // Clear existing table contents
    transactionsList.innerHTML = "";

    // Loop through the array
    transactions.forEach((transaction, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${transaction.description}</td>

            <td>${transaction.category}</td>

            <td>${transaction.date}</td>

            <td>
                ${transaction.type === "income"
                    ? "Income"
                    : "Expense"}
            </td>

            <td>
                KSh ${transaction.amount.toFixed(2)}
            </td>

            <td>
                <button
                    class="delete-btn"
                    data-index="${index}"
                    type="button"
                >
                    Delete
                </button>
            </td>
        `;

        transactionsList.appendChild(row);
    });

    // Update summary cards
    updateSummary();

    // Update budget section
    updateBudgets();
}


// ========================================
// UPDATE SUMMARY CARDS
// ========================================

function updateSummary() {

    const totalIncome =
        document.querySelector("#total-income");

    const totalExpenses =
        document.querySelector("#total-expenses");

    const remainingBalance =
        document.querySelector("#remaining-balance");

    totalIncome.textContent =
        `KSh ${calculateTotalIncome().toFixed(2)}`;

    totalExpenses.textContent =
        `KSh ${calculateTotalExpenses().toFixed(2)}`;

    remainingBalance.textContent =
        `KSh ${calculateBalance().toFixed(2)}`;
}


// ========================================
// PART 4: ADD TRANSACTION EVENT
// ========================================

const transactionForm =
    document.querySelector("#transaction-form");


transactionForm.addEventListener("submit", function(event) {

    // Prevent page refresh
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

    const date =
        document.querySelector("#date").value;


    // Validate the form
    if (
        description === "" ||
        amount <= 0 ||
        date === ""
    ) {
        alert("Please enter valid transaction details.");
        return;
    }


    // Create a new transaction object
    const newTransaction = {

        description: description,

        amount: amount,

        category: category,

        date: date,

        type: type
    };


    // Add the new object to the array
    transactions.push(newTransaction);


    // Re-render the table
    renderTransactions();


    // Clear the form
    transactionForm.reset();

});


// ========================================
// DELETE TRANSACTION
// ========================================

document
    .querySelector("#transactions-list")
    .addEventListener("click", function(event) {

        if (event.target.classList.contains("delete-btn")) {

            const index =
                Number(event.target.dataset.index);

            transactions.splice(index, 1);

            renderTransactions();
        }

    });


// ========================================
// CLEAR ALL TRANSACTIONS
// ========================================

const clearAllButton =
    document.querySelector("#clear-all");


clearAllButton.addEventListener("click", function() {

    if (transactions.length === 0) {
        return;
    }

    const confirmation =
        confirm("Are you sure you want to clear all transactions?");

    if (confirmation) {

        transactions = [];

        renderTransactions();
    }

});


// ========================================
// FILTER BY TYPE
// ========================================

const filterType =
    document.querySelector("#filter-type");


filterType.addEventListener("change", function() {

    applyFilters();

});


// ========================================
// FILTER BY CATEGORY
// ========================================

const filterCategory =
    document.querySelector("#filter-category");


filterCategory.addEventListener("change", function() {

    applyFilters();

});


// ========================================
// APPLY FILTERS
// ========================================

function applyFilters() {

    const selectedType =
        filterType.value;

    const selectedCategory =
        filterCategory.value;


    const transactionsList =
        document.querySelector("#transactions-list");

    transactionsList.innerHTML = "";


    transactions.forEach((transaction, index) => {

        // Type filter
        if (
            selectedType !== "all" &&
            transaction.type !== selectedType
        ) {
            return;
        }


        // Category filter
        if (
            selectedCategory !== "all" &&
            transaction.category !== selectedCategory
        ) {
            return;
        }


        const row =
            document.createElement("tr");


        row.innerHTML = `
            <td>${transaction.description}</td>

            <td>${transaction.category}</td>

            <td>${transaction.date}</td>

            <td>
                ${transaction.type === "income"
                    ? "Income"
                    : "Expense"}
            </td>

            <td>
                KSh ${transaction.amount.toFixed(2)}
            </td>

            <td>
                <button
                    class="delete-btn"
                    data-index="${index}"
                    type="button"
                >
                    Delete
                </button>
            </td>
        `;


        transactionsList.appendChild(row);

    });

}


// ========================================
// UPDATE MONTHLY BUDGETS
// ========================================

function updateBudgets() {

    const budgets = {
        Food: 15000,
        Transport: 8000,
        Rent: 15000,
        Education: 12000
    };


    Object.keys(budgets).forEach(category => {

        const spent = transactions
            .filter(transaction =>
                transaction.type === "expense" &&
                transaction.category === category
            )
            .reduce((sum, transaction) => {
                return sum + transaction.amount;
            }, 0);


        const budget = budgets[category];

        const percentage =
            Math.min((spent / budget) * 100, 100);


        const categoryId =
            category.toLowerCase();


        const textElement =
            document.querySelector(
                `#${categoryId}-budget-text`
            );


        const progressElement =
            document.querySelector(
                `#${categoryId}-progress`
            );


        if (textElement) {

            textElement.textContent =
                `KSh ${spent.toFixed(2)} / KSh ${budget.toLocaleString()}`;

        }


        if (progressElement) {

            progressElement.style.width =
                `${percentage}%`;

        }

    });

}


// ========================================
// SET CURRENT DATE
// ========================================

function setCurrentDate() {

    const dateInput =
        document.querySelector("#date");

    if (dateInput) {

        const today =
            new Date().toISOString().split("T")[0];

        dateInput.value = today;

    }

}


// ========================================
// SET CURRENT MONTH
// ========================================

function setCurrentMonth() {

    const monthElement =
        document.querySelector("#current-month");

    if (!monthElement) {
        return;
    }

    const currentDate = new Date();

    const monthName =
        currentDate.toLocaleString("en-US", {
            month: "long"
        });

    const year =
        currentDate.getFullYear();

    monthElement.textContent =
        `${monthName} ${year}`;

}


// ========================================
// FOOTER YEAR
// ========================================

function setFooterYear() {

    const footerYear =
        document.querySelector("#footer-year");

    if (footerYear) {

        footerYear.textContent =
            new Date().getFullYear();

    }

}


// ========================================
// INITIALIZE APPLICATION
// ========================================

setCurrentDate();

setCurrentMonth();

setFooterYear();

renderTransactions();