let ratingValue = null;

/* ---------- Rating Click Handler ---------- */
document.querySelectorAll(".rating span").forEach(span => {
  span.addEventListener("click", () => {
    document.querySelectorAll(".rating span")
      .forEach(s => s.classList.remove("active"));

    span.classList.add("active");
    ratingValue = span.dataset.rate;
  });
});

/* ---------- Form Submit Handler ---------- */
document.getElementById("feedbackForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Explicit element references (CRITICAL FIX)
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const feedbackInput = document.getElementById("feedback");

  if (!ratingValue) {
    alert("Please select a rating");
    return;
  }

  if (!emailInput.value || !feedbackInput.value) {
    alert("Email and feedback are required");
    return;
  }

  document.getElementById("loader").classList.remove("hidden");

  const data = {
    name: nameInput.value || "Anonymous",
    email: emailInput.value,
    rating: Number(ratingValue),
    feedback: feedbackInput.value
  };

  try {
    const response = await fetch(
      "https://spiderslash.app.n8n.cloud/webhook-test/5789df3f-1f71-4615-b6da-c4de20dcc4e0",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    );

    if (!response.ok) {
      throw new Error("Webhook failed");
    }

    // Reset UI
    document.getElementById("feedbackForm").reset();
    document.querySelectorAll(".rating span")
      .forEach(s => s.classList.remove("active"));
    ratingValue = null;

    document.getElementById("feedbackForm").classList.add("hidden");
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("success").classList.remove("hidden");

  } catch (err) {
    console.error(err);
    alert("Something went wrong. Please try again.");
    document.getElementById("loader").classList.add("hidden");
  }
});
