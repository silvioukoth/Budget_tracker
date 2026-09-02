// ==========================================
// BUDGET.JS
// Reusable Budget Functions
// ==========================================

// ==========================================
// CALCULATE TOTAL
// ==========================================

export function calculateTotal(transactions, type = null) {

```
const filteredTransactions = type
    ? transactions.filter(transaction => transaction.type === type)
    : transactions;

const total = filteredTransactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
);

return Math.round(total * 100) / 100;
```

}

// ==========================================
// RENDER EXPENSES
// ==========================================

export function renderExpenses(transactions, container) {

```
container.innerHTML = "";

if (transactions.length === 0) {

    const emptyRow = document.createElement("tr");

    emptyRow.innerHTML = `
        <td colspan="6" class="empty-message">
            No transactions found.
        </td>
    `;

    container.appendChild(emptyRow);

    return;
}


transactions.forEach(transaction => {

    const row = document.createElement("tr");

    const amountClass =
        transaction.type === "income"
            ? "income-amount"
            : "expense-amount";


    const amountSign =
        transaction.type === "income"
            ? "+"
            : "-";


    row.innerHTML = `

        <td>
            ${transaction.name}
        </td>

        <td>
            ${transaction.category}
        </td>

        <td>
            ${transaction.date}
        </td>

        <td>

            <span class="badge ${transaction.type}">
                ${transaction.type}
            </span>

        </td>

        <td class="amount ${amountClass}">

            ${amountSign}
            KSh ${transaction.amount.toFixed(2)}

        </td>

        <td>

            <button
                type="button"
                class="btn btn-sm btn-outline-danger delete-btn"
                data-id="${transaction.id}"
            >
                Delete
            </button>

        </td>

    `;

    container.appendChild(row);

});
```

}
