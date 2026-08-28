# Personal Budget & Expense Tracker

## Project Overview

The **Personal Budget & Expense Tracker** is a simple web application designed to help users manage their personal finances. It allows users to record their income and expenses, view their current balance, monitor their spending, and keep track of their monthly budget.

This project is being developed progressively as part of an **8-week development project**. The current version establishes the main HTML structure, CSS styling, and JavaScript functionality that will serve as the foundation for future improvements.

## Features

The current version includes:

* Add income and expense transactions
* Select a transaction category
* Enter the transaction description
* Enter the transaction amount
* Select a transaction date
* Automatically calculate total income
* Automatically calculate total expenses
* Automatically calculate the remaining balance
* Display recent transactions in a table
* Delete individual transactions
* Clear all transactions
* Filter transactions by type
* Filter transactions by category
* Display monthly budget information
* Show budget progress bars
* Identify when spending goes over a category budget
* Store transactions using browser `localStorage`
* Keep transactions available after refreshing the page
* Responsive design for desktop, tablet, and mobile devices

## Technologies Used

The project was built using the following technologies:

* **HTML5** – Used to create the structure and content of the application.
* **CSS3** – Used for styling, layout, responsive design, colors, spacing, and visual presentation.
* **JavaScript** – Used to make the application interactive and calculate financial information.
* **LocalStorage** – Used to save transactions in the user's browser.

## Project Structure

```text
Personal-Budget-Tracker/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

### `index.html`

The HTML file contains the main structure of the application. It includes:

* Header and navigation
* Financial overview dashboard
* Income and expense summary cards
* Add transaction form
* Transaction table
* Transaction filters
* Monthly budget section
* Footer

### `style.css`

The CSS file controls the appearance of the application. It provides:

* Page layout
* Colors and typography
* Dashboard cards
* Form styling
* Transaction table styling
* Budget progress bars
* Buttons
* Responsive layouts for smaller screens

### `script.js`

The JavaScript file provides the functionality of the application. It handles:

* Adding transactions
* Calculating income
* Calculating expenses
* Calculating the remaining balance
* Displaying transactions
* Deleting transactions
* Filtering transactions
* Clearing transactions
* Updating budget progress
* Saving and retrieving data from `localStorage`

## How to Run the Project

### Option 1: Open Directly in a Browser

1. Download or clone the project.
2. Open the project folder.
3. Double-click `index.html`.
4. The application will open in your web browser.

### Option 2: Use Visual Studio Code

1. Open the project folder in **Visual Studio Code**.
2. Make sure `index.html`, `style.css`, and `script.js` are in the same folder.
3. Open `index.html`.
4. Run the project using a browser or the **Live Server** extension.

## How to Use the Application

### Adding a Transaction

To add a transaction:

1. Select **Expense** or **Income**.
2. Enter a description.
3. Select a category.
4. Enter the amount.
5. Select the date.
6. Click **Add Transaction**.

The transaction will immediately appear in the transaction table.

### Viewing Financial Information

The dashboard automatically displays:

* **Total Income**
* **Total Expenses**
* **Remaining Balance**
* **Monthly Budget**

These values are updated whenever a transaction is added or deleted.

### Filtering Transactions

Users can filter transactions by:

* Transaction type
* Transaction category

This makes it easier to find specific transactions.

### Deleting Transactions

Each transaction has a **Delete** button. Clicking the button removes the transaction and updates the financial totals.

The **Clear All** button can be used to remove all saved transactions.

## Data Storage

The application currently uses the browser's **LocalStorage** feature to save transactions.

This means that transactions remain available after refreshing or reopening the page in the same browser.

However, the data is stored locally on the user's device and is not connected to an online database yet.

## Responsive Design

The application has been designed to work on different screen sizes, including:

* Desktop computers
* Laptops
* Tablets
* Mobile phones

CSS media queries are used to adjust the layout for smaller screens.

## Future Improvements

Since this is an 8-week project, additional features will be added as development continues.

Possible future improvements include:

* Edit existing transactions
* More advanced transaction filtering
* Search transactions
* Monthly and yearly reports
* Expense charts and graphs
* Category spending analysis
* Custom monthly budgets
* Dark mode
* User accounts and authentication
* Cloud database storage
* Backend/API integration
* Export transactions to CSV
* Improved accessibility
* Deployment and production optimization

## Learning Objectives

This project provides practical experience with:

* Semantic HTML
* HTML forms
* HTML tables
* CSS selectors
* CSS Grid
* CSS Flexbox
* Responsive web design
* JavaScript DOM manipulation
* JavaScript events
* Arrays and objects
* Form validation
* LocalStorage
* Basic financial calculations
* Git and GitHub
* Web deployment

## Deployment

The project is deployed using **Netlify**.

Changes can be pushed to the connected GitHub repository, after which Netlify can automatically build and deploy the updated version.

## Author

**Silvio Ukoth**

This project was created as part of a progressive web development learning project and is intended to demonstrate practical front-end development skills.

## License

This project is created for educational and portfolio purposes.

```
```
