const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const addBtn = document.getElementById("addBtn");
const expenseList = document.getElementById("expenseList");
const total = document.getElementById("total");
const emptyMessage = document.getElementById("emptyMessage");

let expenses = [];

function updateTotal() {
    const totalAmount = expenses.reduce(function (sum, expense) {
        return sum + expense.amount;
    }, 0);

    total.textContent = totalAmount.toFixed(2);
}

function displayExpenses() {
    expenseList.innerHTML = "";

    emptyMessage.style.display =
        expenses.length === 0 ? "block" : "none";

    expenses.forEach(function (expense, index) {
        const li = document.createElement("li");
        li.className = "expense-item";

        li.innerHTML = `
            <div class="expense-info">
                <strong>${expense.name}</strong>
                <span>₹${expense.amount.toFixed(2)}</span>
            </div>

            <button class="delete-btn" onclick="deleteExpense(${index})">
                Delete
            </button>
        `;

        expenseList.appendChild(li);
    });

    updateTotal();
}

function addExpense() {
    const name = expenseName.value.trim();
    const amount = Number(expenseAmount.value);

    if (name === "" || amount <= 0) {
        alert("Please enter a valid expense name and amount.");
        return;
    }

    expenses.push({
        name: name,
        amount: amount
    });

    expenseName.value = "";
    expenseAmount.value = "";

    displayExpenses();
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    displayExpenses();
}

addBtn.addEventListener("click", addExpense);

expenseAmount.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addExpense();
    }
});

displayExpenses();