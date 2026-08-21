// ============================================
// Personal Budget & Expense Tracker
// ============================================


// --------------------------------------------
// Application Data
// --------------------------------------------

let transactions = JSON.parse(
    localStorage.getItem("budgetTransactions")
) || [];


// --------------------------------------------
// Monthly Budgets
// --------------------------------------------

const budgets = {
    Food: 15000,
    Transport: 8000,
    Rent: 15000,
    Utilities: 10000,
    Shopping: 5000,
    Education: 12000,
    Other: 5000
};


// --------------------------------------------
// DOM Elements
// --------------------------------------------

const transactionForm =
    document.getElementById("transaction-form");

const transactionType =
    document.getElementById("transaction-type");

const descriptionInput =
    document.getElementById("description");

const categoryInput =
    document.getElementById("category");

const amountInput =
    document.getElementById("amount");

const dateInput =
    document.getElementById("date");

const transactionsList =
    document.getElementById("transactions-list");

const totalIncome =
    document.getElementById("total-income");

const totalExpenses =
    document.getElementById("total-expenses");

const remainingBalance =
    document.getElementById("remaining-balance");

const filterType =
    document.getElementById("filter-type");

const filterCategory =
    document.getElementById("filter-category");

const clearAllButton =
    document.getElementById("clear-all");


// --------------------------------------------
// Set Default Date
// --------------------------------------------

const today = new Date();

dateInput.value = today.toISOString().split("T")[0];


// --------------------------------------------
// Display Current Month
// --------------------------------------------

function displayCurrentMonth() {

    const currentMonth =
        document.getElementById("current-month");

    const month = today.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric"
    });

    currentMonth.textContent = month;
}


// --------------------------------------------
// Currency Formatter
// --------------------------------------------

function formatCurrency(amount) {

    return new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "KES",
        maximumFractionDigits: 0
    }).format(amount);

}


// --------------------------------------------
// Save Transactions
// --------------------------------------------

function saveTransactions() {

    localStorage.setItem(
        "budgetTransactions",
        JSON.stringify(transactions)
    );

}


// --------------------------------------------
// Add Transaction
// --------------------------------------------

transactionForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const type =
            transactionType.value;

        const description =
            descriptionInput.value.trim();

        const category =
            categoryInput.value;

        const amount =
            Number(amountInput.value);

        const date =
            dateInput.value;


        // Validation

        if (!description) {

            alert("Please enter a description.");

            return;
        }


        if (amount <= 0) {

            alert("Amount must be greater than zero.");

            return;
        }


        if (!date) {

            alert("Please select a date.");

            return;
        }


        // Create transaction

        const transaction = {

            id: Date.now(),

            type: type,

            description: description,

            category: category,

            amount: amount,

            date: date

        };


        // Add transaction

        transactions.push(transaction);


        // Save

        saveTransactions();


        // Refresh interface

        updateApplication();


        // Reset form

        transactionForm.reset();

        dateInput.value =
            new Date().toISOString().split("T")[0];

        transactionType.value = "expense";


        alert("Transaction added successfully!");

    }
);


// --------------------------------------------
// Calculate Totals
// --------------------------------------------

function calculateTotals() {

    let income = 0;

    let expenses = 0;


    transactions.forEach(function (transaction) {

        if (transaction.type === "income") {

            income += transaction.amount;

        } else {

            expenses += transaction.amount;

        }

    });


    const balance = income - expenses;


    totalIncome.textContent =
        formatCurrency(income);

    totalExpenses.textContent =
        formatCurrency(expenses);

    remainingBalance.textContent =
        formatCurrency(balance);


    // Change balance appearance

    if (balance < 0) {

        remainingBalance.style.color =
            "#dc2626";

    } else {

        remainingBalance.style.color =
            "#16a34a";

    }

}


// --------------------------------------------
// Display Transactions
// --------------------------------------------

function displayTransactions() {

    transactionsList.innerHTML = "";


    let filteredTransactions =
        [...transactions];


    // Filter by type

    const selectedType =
        filterType.value;


    if (selectedType !== "all") {

        filteredTransactions =
            filteredTransactions.filter(
                transaction =>
                    transaction.type === selectedType
            );

    }


    // Filter by category

    const selectedCategory =
        filterCategory.value;


    if (selectedCategory !== "all") {

        filteredTransactions =
            filteredTransactions.filter(
                transaction =>
                    transaction.category === selectedCategory
            );

    }


    // Sort newest first

    filteredTransactions.sort(
        function (a, b) {

            return new Date(b.date) -
                new Date(a.date);

        }
    );


    // No transactions

    if (filteredTransactions.length === 0) {

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td colspan="6" class="empty-message">
                No transactions found.
            </td>
        `;

        transactionsList.appendChild(row);

        return;
    }


    // Create rows

    filteredTransactions.forEach(
        function (transaction) {

            const row =
                document.createElement("tr");


            const formattedDate =
                new Date(
                    transaction.date + "T00:00:00"
                ).toLocaleDateString(
                    "en-GB",
                    {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                    }
                );


            const sign =
                transaction.type === "income"
                    ? "+"
                    : "−";


            const amountClass =
                transaction.type === "income"
                    ? "income-amount"
                    : "expense-amount";


            const badgeClass =
                transaction.type === "income"
                    ? "income"
                    : "expense";


            row.innerHTML = `

                <td>
                    ${escapeHTML(transaction.description)}
                </td>

                <td>
                    ${escapeHTML(transaction.category)}
                </td>

                <td>
                    ${formattedDate}
                </td>

                <td>
                    <span class="badge ${badgeClass}">
                        ${transaction.type}
                    </span>
                </td>

                <td class="amount ${amountClass}">
                    ${sign} ${formatCurrency(transaction.amount)}
                </td>

                <td>
                    <button
                        class="delete-btn"
                        onclick="deleteTransaction(${transaction.id})"
                    >
                        Delete
                    </button>
                </td>

            `;


            transactionsList.appendChild(row);

        }
    );

}


// --------------------------------------------
// Delete Transaction
// --------------------------------------------

function deleteTransaction(id) {

    const transaction =
        transactions.find(
            transaction =>
                transaction.id === id
        );


    if (!transaction) {

        return;

    }


    const confirmed =
        confirm(
            `Delete "${transaction.description}"?`
        );


    if (!confirmed) {

        return;

    }


    transactions =
        transactions.filter(
            transaction =>
                transaction.id !== id
        );


    saveTransactions();

    updateApplication();

}


// --------------------------------------------
// Clear All Transactions
// --------------------------------------------

clearAllButton.addEventListener(
    "click",
    function () {

        if (transactions.length === 0) {

            alert("There are no transactions to clear.");

            return;

        }


        const confirmed =
            confirm(
                "Are you sure you want to delete all transactions?"
            );


        if (!confirmed) {

            return;

        }


        transactions = [];


        saveTransactions();

        updateApplication();

    }
);


// --------------------------------------------
// Budget Progress
// --------------------------------------------

function updateBudgetProgress() {

    const categories = [
        "Food",
        "Transport",
        "Rent",
        "Education"
    ];


    categories.forEach(
        function (category) {

            const spent =
                transactions
                    .filter(
                        transaction =>
                            transaction.type === "expense" &&
                            transaction.category === category
                    )
                    .reduce(
                        function (total, transaction) {

                            return total +
                                transaction.amount;

                        },
                        0
                    );


            const budget =
                budgets[category];


            let percentage =
                (spent / budget) * 100;


            if (percentage > 100) {

                percentage = 100;

            }


            const progress =
                document.getElementById(
                    `${category.toLowerCase()}-progress`
                );


            const budgetText =
                document.getElementById(
                    `${category.toLowerCase()}-budget-text`
                );


            if (progress) {

                progress.style.width =
                    `${percentage}%`;

            }


            if (budgetText) {

                budgetText.textContent =
                    `${formatCurrency(spent)} / ${formatCurrency(budget)}`;

            }


            // Change progress when over budget

            if (progress) {

                if (spent > budget) {

                    progress.style.backgroundColor =
                        "#dc2626";

                } else {

                    progress.style.backgroundColor =
                        "#2563eb";

                }

            }

        }
    );

}


// --------------------------------------------
// Escape HTML
// --------------------------------------------

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


// --------------------------------------------
// Update Everything
// --------------------------------------------

function updateApplication() {

    calculateTotals();

    displayTransactions();

    updateBudgetProgress();

}


// --------------------------------------------
// Filters
// --------------------------------------------

filterType.addEventListener(
    "change",
    displayTransactions
);


filterCategory.addEventListener(
    "change",
    displayTransactions
);


// --------------------------------------------
// Footer Year
// --------------------------------------------

document.getElementById(
    "footer-year"
).textContent =
    new Date().getFullYear();


// --------------------------------------------
// Start Application
// --------------------------------------------

displayCurrentMonth();

updateApplication();