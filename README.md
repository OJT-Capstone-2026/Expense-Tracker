# 💰 Expense Tracker

A simple **Expense Tracker web app** built using **HTML, CSS, and Vanilla JavaScript**.
It lets you add, edit, delete, and view your income and expenses, with all data saved permanently in your browser using **localStorage**.

No frameworks. No backend. No database. Just plain JS — beginner-friendly and easy to read.

---

## 🔗 Live Demo

> Add your live link here if you deploy it (e.g. via GitHub Pages, Netlify, or Vercel)

```
https://ojt-capstone-2026.github.io/Expense-Tracker/
```

---

## ✨ Features

- ➕ **Add** new income or expense transactions
- 📝 **Edit** any existing transaction
- 🗑️ **Delete** transactions (with a confirmation popup)
- 📊 **Live summary cards** — Total Income, Total Expenses, and Current Balance
- 💾 **Data persistence** — your transactions are saved in `localStorage`, so they're still there when you refresh or reopen the page
- ✅ **Form validation** — checks description, amount, type, and date before saving
- 🎨 Clean, responsive UI that works on mobile and desktop

---

## 🛠️ Built With

- **HTML5** — page structure
- **CSS3** — styling and layout (flexbox, no frameworks)
- **JavaScript (Vanilla)** — all app logic, DOM manipulation, and localStorage

---

## 📁 Project Structure

```
expense-tracker/
├── index.html      # Page structure (form + transaction list + summary cards)
├── style.css       # All styling
└── script.js       # All app logic (CRUD + localStorage)
```

---

## 🚀 Getting Started

No installation or build tools needed — it's pure HTML/CSS/JS.

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/expense-tracker.git
   ```

2. **Open the project folder**
   ```bash
   cd expense-tracker
   ```

3. **Open `index.html` in your browser**
   - Just double-click the file, or
   - Use the **Live Server** extension in VS Code for auto-reload

That's it — no `npm install`, no server setup required.

---

## 🧠 How It Works

### Data Structure
Each transaction is stored as a simple object:

```javascript
{
  id: 1718870400000,
  description: "Salary",
  amount: 5000,
  type: "income",
  date: "2025-06-01"
}
```

### CRUD Operations

| Operation | What happens |
|-----------|---------------|
| **Create** | Form data is collected, validated, turned into an object, and pushed into the `transactions` array |
| **Read**   | The array is looped through and rendered as list items on the page |
| **Update** | The matching transaction (by `id`) is found in the array and its fields are overwritten |
| **Delete** | A confirmation popup appears, then `filter()` removes the transaction from the array |

### Saving Data (localStorage)

```javascript
// Save: convert array → JSON string
localStorage.setItem("myExpenses", JSON.stringify(transactions));

// Load: convert JSON string → array
transactions = JSON.parse(localStorage.getItem("myExpenses"));
```

This means your transactions stay saved even after closing the browser tab.

### Calculating Totals

`filter()` is used to separate income from expenses, then a loop adds up the amounts:

```javascript
var incomeList = transactions.filter(function (tx) {
  return tx.type === "income";
});
```

```
Total Income   = sum of all "income" transactions
Total Expenses = sum of all "expense" transactions
Balance         = Total Income - Total Expenses
```

---

## ✅ Validation Rules

- Description cannot be empty
- Amount must be greater than 0
- Type must be selected (Income or Expense)
- Date must be selected

If any rule fails, a clear error message appears above the form.

---

## 📚 What I Learned / Practiced

- DOM manipulation with vanilla JavaScript
- Working with arrays and objects
- Array methods: `filter()`, loops for totals
- `localStorage` for persisting data in the browser
- Basic form validation
- Building a CRUD app from scratch without any framework

---

## 🔮 Future Improvements

- [ ] Search transactions by description
- [ ] Filter by Income / Expense
- [ ] Sort by date or amount
- [ ] Dark mode toggle
- [ ] Export transactions to CSV
- [ ] Charts for spending breakdown

---

## 🤝 Contributing

This is a beginner practice project, but suggestions are welcome!

1. Fork the repo
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m "Add feature"`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙋‍♂️ Author

**Your Name**
- GitHub: [kaiflatif73-git]()

---

⭐ If you found this project helpful, consider giving it a star on GitHub!
