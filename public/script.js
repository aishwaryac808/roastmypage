// 1
const urlInput = document.getElementById("urlInput");
// 2
const resultDiv = document.getElementById("result");
// 3
document.getElementById("roastBtn").addEventListener("click", function () {
// 4
  const url = urlInput.value;
// 5
  fetch("/api/roast", {
// 6
    method: "POST",
// 7
    headers: {
// 8
      "Content-Type": "application/json",
// 9
    },
// 10
    body: JSON.stringify({ url: url }),
// 11
  })
// 12
    .then((response) => response.json())
// 13
    .then((data) => {
// 14
      resultDiv.innerText = data.roast;
// 15
    })
// 16
    .catch((error) => {
// 17
      resultDiv.innerText = "Oops! Something went wrong.";
// 18
      console.error("Roast API error:", error);
// 19
    });
// 20
});
