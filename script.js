// ==========================================
// PERSONAL BUDGET & EXPENSE TRACKER
// Main JavaScript
// ==========================================

// ==========================================
// IMPORT MODULE FUNCTIONS
// ==========================================

import {
calculateTotal,
renderExpenses
} from "./budget.js";

// ==========================================
// INITIAL TRANSACTIONS
// ==========================================

let transactions = [

```
{
    id: 1,
    name: "Salary",
    amount: 40000,
    category: "Other",
    type: "income",
    date: "2026-09-01"
},

{
    id: 2,
    name: "Groceries",
    amount: 5000,
    category: "Food",
    type: "expense",
    date: "2026-09-01"
},

{
    id: 3,
    name: "Transport",
    amount: 3000,
    category: "Transport",
    type: "expense",
    date: "2026-09-02"
},

{
    id: 4,
    name: "Rent",
    amount: 15000,
    category: "Rent",
    type: "expense",
    date: "2026-09-02"
},

{
    id: 5,
    name: "Internet",
    amount: 2500,
    category: "Utilities",
    type: "expense",
    date: "2026-09-02"
},

{
    id: 6,
    name: "School Supplies",
    amount: 4000,
    category: "Education",
    type: "expense",
    date: "2026-09-02"
}
```

];

// ==========================================
// BUDGET SETTINGS
// ==========================================

const monthlyBudget = 60000;

const categoryBudgets = {

```
Food: 15000,

Transport: 8000,

Rent: 15000,

Education: 12000
```

};

// ==========================================
// DOM ELEMENTS
// ==========================================

const transactionForm =
document.querySelector("#transaction-form");

const transactionsList =
document.querySelector("#transactions-list");

const totalIncome =
document.querySelector("#total-income");

const totalExpenses =
document.querySelector("#total-expenses");

const remainingBalance =
document.querySelector("#remaining-balance");

const filterType =
document.querySelector("#filter-type");

const filterCategory =
document.querySelector("#filter-category");

const clearAllButton =
document.querySelector("#clear-all");

const dateInput =
document.querySelector("#date");

// ==========================================
// SET DEFAULT DATE
// ==========================================

const today = new Date();

dateInput.value =
today.toISOString().split("T")[0];

// ==========================================
// UPDATE CURRENT MONTH
// ==========================================

const currentMonth =
document.querySelector("#current-month");

currentMonth.textContent =
today.toLocaleDateString("en-US", {
month: "long",
year: "numeric"
});

// ==========================================
// UPDATE FOOTER YEAR
// ==========================================

document.querySelector("#footer-year").textContent =
new Date().getFullYear();

// ==========================================
// FORMAT MONEY
// ==========================================

function formatMoney(amount) {

```
return `KSh ${amount.toLocaleString(
    "en-KE",
    {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }
)}`;
```

}

// ==========================================
// UPDATE DASHBOARD
// ==========================================

function updateDashboard() {

```
const income =
    calculateTotal(transactions, "income");

const expenses =
    calculateTotal(transactions, "expense");

const balance =
    income - expenses;


totalIncome.textContent =
    formatMoney(income);

totalExpenses.textContent =
    formatMoney(expenses);

remainingBalance.textContent =
    formatMoney(balance);
```

}

// ==========================================
// FILTER TRANSACTIONS
// ==========================================

function getFilteredTransactions() {

```
const selectedType =
    filterType.value;

const selectedCategory =
    filterCategory.value;


return transactions.filter(transaction => {

    const matchesType =
        selectedType === "all" ||
        transaction.type === selectedType;


    const matchesCategory =
        selectedCategory === "all" ||
        transaction.category === selectedCategory;


    return matchesType && matchesCategory;

});
```

}

// ==========================================
// RENDER TABLE
// ==========================================

function updateTable() {

```
const filteredTransactions =
    getFilteredTransactions();

renderExpenses(
    filteredTransactions,
    transactionsList
);
```

}

// ==========================================
// UPDATE BUDGET PROGRESS
// ==========================================

function updateBudgetProgress() {

```
Object.entries(categoryBudgets).forEach(
    ([category, budget]) => {

        const spent =
            transactions
                .filter(transaction =>
                    transaction.type === "expense" &&
                    transaction.category === category
                )
                .reduce(
                    (sum, transaction) =>
                        sum + transaction.amount,
                    0
                );


        const percentage =
            Math.min(
                (spent / budget) * 100,
                100
            );


        const progressElement =
            document.querySelector(
                `#${category.toLowerCase()}-progress`
            );


        const textElement =
            document.querySelector(
                `#${category.toLowerCase()}-budget-text`
            );


        if (progressElement) {

            progressElement.style.width =
                `${percentage}%`;

        }


        if (textElement) {

            textElement.textContent =
                `${formatMoney(spent)} / ${formatMoney(budget)}`;

        }

    }
);
```

}

// ==========================================
// UPDATE EVERYTHING
// ==========================================

function updateApplication() {

```
updateDashboard();

updateTable();

updateBudgetProgress();
```

}

// ==========================================
// ADD TRANSACTION
// ==========================================

transactionForm.addEventListener(
"submit",
function(event) {

```
    event.preventDefault();


    const type =
        document.querySelector(
            "#transaction-type"
        ).value;


    const description =
        document.querySelector(
            "#description"
        ).value.trim();


    const category =
        document.querySelector(
            "#category"
        ).value;


    const amount =
        Number(
            document.querySelector(
                "#amount"
            ).value
        );


    const date =
        document.querySelector(
            "#date"
        ).value;


    if (
        !description ||
        amount <= 0 ||
        !date
    ) {

        return;

    }


    const newTransaction = {

        id: Date.now(),

        name: description,

        amount: amount,

        category: category,

        type: type,

        date: date

    };


    transactions.push(newTransaction);


    transactionForm.reset();


    dateInput.value =
        new Date()
            .toISOString()
            .split("T")[0];


    updateApplication();

}
```

);

// ==========================================
// DELETE TRANSACTION
// ==========================================

transactionsList.addEventListener(
"click",
function(event) {

```
    if (
        !event.target.classList.contains(
            "delete-btn"
        )
    ) {

        return;

    }


    const id =
        Number(
            event.target.dataset.id
        );


    transactions =
        transactions.filter(
            transaction =>
                transaction.id !== id
        );


    updateApplication();

}
```

);

// ==========================================
// FILTER EVENTS
// ==========================================

filterType.addEventListener(
"change",
updateTable
);

filterCategory.addEventListener(
"change",
updateTable
);

// ==========================================
// CLEAR ALL TRANSACTIONS
// ==========================================

clearAllButton.addEventListener(
"click",
function() {

```
    if (transactions.length === 0) {

        return;

    }


    const confirmed =
        confirm(
            "Are you sure you want to clear all transactions?"
        );


    if (!confirmed) {

        return;

    }


    transactions = [];

    updateApplication();

}
```

);

// ==========================================
// HAMBURGER MENU
// ==========================================

const hamburger =
document.querySelector("#hamburger");

const mainNav =
document.querySelector("#main-nav");

hamburger.addEventListener(
"click",
function() {

```
    mainNav.classList.toggle("active");


    const isOpen =
        mainNav.classList.contains("active");


    hamburger.textContent =
        isOpen ? "✕" : "☰";


    hamburger.setAttribute(
        "aria-label",
        isOpen
            ? "Close navigation"
            : "Open navigation"
    );

}
```

);

// ==========================================
// CLOSE MOBILE MENU
// ==========================================

const navLinks =
document.querySelectorAll(
".main-nav a"
);

navLinks.forEach(link => {

```
link.addEventListener(
    "click",
    function() {

        mainNav.classList.remove("active");

        hamburger.textContent = "☰";

        hamburger.setAttribute(
            "aria-label",
            "Open navigation"
        );

    }
);
```

});

// ==========================================
// INITIAL APPLICATION RENDER
// ==========================================

updateApplication();
