// Display welcome message
document.getElementById("welcome-msg").innerText = "Hello, you are logged in!";

// Fetch account balance from backend
fetch("http://localhost:7000/user")
  .then(res => res.json())
  .then(data => {
    const balanceInfo = `Account Holder: ${data?.name} Account Holder Email:${data?.email}| Balance:₹${data?.balance} ${"INR"}`;
    const balanceElem = document.createElement("p");
    balanceElem.innerText = balanceInfo;
    document.body.appendChild(balanceElem);
  })
  .catch(err => console.error("Error fetching balance:", err));

  // Money Transfer Form
document.getElementById("transfer-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const fromEmail = "selvi@gmail.com"; // Currently logged-in user
    const toEmail = document.getElementById("toEmail").value;
    const amount = parseInt(document.getElementById("amount").value);

    fetch("http://localhost:7000/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fromEmail, toEmail, amount })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("transfer-msg").innerText = data.message;
    })
    .catch(err => {
        console.error(err);
        document.getElementById("transfer-msg").innerText = "Server error";
    });
});

// Logout button
document.getElementById("logout-btn").addEventListener("click", () => {
    alert("Logged out successfully!");
    window.location.href = "login.html";
});