const urlInput = document.getElementById("urlInput");
const resultDiv = document.getElementById("result");

document.getElementById("roastBtn").addEventListener("click", function () {
  const url = urlInput.value;

  fetch("/api/roast", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: url }),
  }).then((response) => response.json())
    .then((data) => {
      resultDiv.innerText = data.roast;
    })
    .catch((error) => {
      resultDiv.innerText = "Oops! Something went wrong.";
      console.error("Roast API error:", error);
    });
});
