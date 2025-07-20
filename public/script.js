async function submitRoast() {
  const url = document.getElementById("urlInput").value;
  const resultBox = document.getElementById("result");

  if (!url) {
    resultBox.innerHTML = "⚠️ Please enter a URL before roasting!";
    return;
  }

  resultBox.innerHTML = "🔥 Roasting in progress...";
.then(data => {
  resultDiv.innerText = data.roast;
})
.catch(error => {
  resultDiv.innerText = "Oops! Something went wrong.";
  console.error("Roast API error:", error);
});

      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url })
    });

    const data = await response.json();

    if (data.roast) {
      resultBox.innerHTML = `💥 ${data.roast}`;
    } else {
      resultBox.innerHTML = "❌ Oops, the roast didn't work. Try again!";
    }
  } catch (err) {
    console.error(err);
    resultBox.innerHTML = "🚨 Something went wrong. Try again later.";
  }
}
