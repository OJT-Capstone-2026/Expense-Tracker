var transactions = [];

var deleteId = null;

function saveData() {
  localStorage.setItem("myExpenses", JSON.stringify(transactions));
}

function loadData() {
  var saved = localStorage.getItem("myExpenses");
  if (saved) {
    transactions = JSON.parse(saved);
  } else {
    transactions = [];
  }
}

function handleFormSubmit() {
  var description = document.getElementById("description").value;
  var amount = document.getElementById("amount").value;
  var type = document.getElementById("type").value;
  var date = document.getElementById("date").value;
  var editId = document.getElementById("editId").value;

  if (description.trim() === "") {
    showError("Please enter a description.");
    return;
  }
  if (amount === "" || Number(amount) <= 0) {
    showError("Please enter an amount greater than 0.");
    return;
  }
  if (type === "") {
    showError("Please select Income or Expense.");
    return;
  }
  if (date === "") {
    showError("Please pick a date.");
    return;
  }

  hideError();

  if (editId !== "") {
    for (var i = 0; i < transactions.length; i++) {
      if (transactions[i].id === Number(editId)) {
        transactions[i].description = description;
        transactions[i].amount = Number(amount);
        transactions[i].type = type;
        transactions[i].date = date;
        break;
      }
    }

  } else {
    var newTransaction = {
      id: Date.now(),
      description: description,
      amount: Number(amount),
      type: type,
      date: date
    };

    transactions.push(newTransaction);
  }

  saveData();
  clearForm();
  showTransactions();
  showSummary();
}

function showTransactions() {
  var list = document.getElementById("transactionList");
  var emptyMsg = document.getElementById("emptyMsg");
  list.innerHTML = "";
  if (transactions.length === 0) {
    emptyMsg.style.display = "block";
    return;
  }
  emptyMsg.style.display = "none";
  for (var i = 0; i < transactions.length; i++) {
    var tx = transactions[i];
    var li = document.createElement("li");
    li.className = "tx-item";
    var icon = tx.type === "income" ? "⬆️" : "⬇️";
    var dotClass = tx.type === "income" ? "dot-income" : "dot-expense";
    var amountText = tx.type === "income" ? "+" + formatMoney(tx.amount) : "-" + formatMoney(tx.amount);
    var amountClass = tx.type === "income" ? "amount-income" : "amount-expense";
    var niceDate = formatDate(tx.date);
    li.innerHTML =
      '<div class="tx-dot ' + dotClass + '">' + icon + '</div>' +
      '<div class="tx-info">' +
        '<p class="tx-desc">' + tx.description + '</p>' +
        '<p class="tx-date">' + niceDate + '</p>' +
      '</div>' +
      '<span class="tx-amount ' + amountClass + '">' + amountText + '</span>' +
      '<div class="tx-actions">' +
        '<button class="btn-edit" onclick="startEdit(' + tx.id + ')">Edit</button>' +
        '<button class="btn-delete" onclick="startDelete(' + tx.id + ')">Delete</button>' +
      '</div>';
    list.appendChild(li);
  }
}

function showSummary() {
  var totalIncome = 0;
  var totalExpense = 0;
  var incomeList = transactions.filter(function(tx) {
    return tx.type === "income";
  });
  for (var i = 0; i < incomeList.length; i++) {
    totalIncome = totalIncome + incomeList[i].amount;
  }
  var expenseList = transactions.filter(function(tx) {
    return tx.type === "expense";
  });
  for (var j = 0; j < expenseList.length; j++) {
    totalExpense = totalExpense + expenseList[j].amount;
  }
  var balance = totalIncome - totalExpense;
  document.getElementById("totalIncome").textContent = formatMoney(totalIncome);
  document.getElementById("totalExpenses").textContent = formatMoney(totalExpense);
  document.getElementById("balance").textContent = formatMoney(balance);
  if (balance < 0) {
    document.getElementById("balance").style.color = "#ef4444";
  } else {
    document.getElementById("balance").style.color = "#222";
  }
}

function startEdit(id) {
  var found = null;
  for (var i = 0; i < transactions.length; i++) {
    if (transactions[i].id === id) {
      found = transactions[i];
      break;
    }
  }
  if (found === null) return;
  document.getElementById("description").value = found.description;
  document.getElementById("amount").value = found.amount;
  document.getElementById("type").value = found.type;
  document.getElementById("date").value = found.date;
  document.getElementById("editId").value = found.id;
  document.getElementById("formHeading").textContent = "Edit Transaction";
  document.getElementById("submitBtn").textContent = "Save Changes";
  document.getElementById("cancelBtn").style.display = "block";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function cancelEdit() {
  clearForm();
}

function startDelete(id) {
  deleteId = id;
  document.getElementById("deletePopup").style.display = "flex";
}

function confirmDelete() {
  if (deleteId === null) return;
  transactions = transactions.filter(function(tx) {
    return tx.id !== deleteId;
  });
  saveData();
  showTransactions();
  showSummary();
  cancelDelete();
}

function cancelDelete() {
  deleteId = null;
  document.getElementById("deletePopup").style.display = "none";
}

function formatMoney(number) {
  return "₹" + number.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  var parts = dateStr.split("-");
  var year = parts[0];
  var month = parts[1];
  var day = parts[2];
  var d = new Date(year, month - 1, day);
  return d.toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric"
  });
}

function getTodayDate() {
  var today = new Date();
  var year = today.getFullYear();
  var month = String(today.getMonth() + 1).padStart(2, "0");
  var day = String(today.getDate()).padStart(2, "0");
  return year + "-" + month + "-" + day;
}

function showError(message) {
  var el = document.getElementById("errorMsg");
  el.textContent = message;
  el.style.display = "block";
}

function hideError() {
  var el = document.getElementById("errorMsg");
  el.textContent = "";
  el.style.display = "none";
}

function clearForm() {
  document.getElementById("description").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("type").value = "";
  document.getElementById("date").value = getTodayDate();
  document.getElementById("editId").value = "";
  document.getElementById("formHeading").textContent = "Add Transaction";
  document.getElementById("submitBtn").textContent = "Add Transaction";
  document.getElementById("cancelBtn").style.display = "none";
  hideError();
}

document.getElementById("date").value = getTodayDate();
loadData();
showTransactions();
showSummary();
