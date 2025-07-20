const tips = [
  { text: "Use semantic HTML for better accessibility.", type: "HTML" },
  { text: "Use classes over IDs for styling when possible.", type: "CSS" },
  { text: "Use `const` and `let` instead of `var`.", type: "JS" },
  { text: "Alt text is essential for images.", type: "HTML" },
  { text: "Use Flexbox to build responsive layouts.", type: "CSS" },
  { text: "Break code into functions for reusability.", type: "JS" }
];

const quotes = [
  "Don't watch the clock; do what it does. Keep going.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "Believe you can and you're halfway there.",
  "Start where you are. Use what you have. Do what you can.",
  "You don’t have to be great to start, but you have to start to be great."
];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

window.addEventListener("DOMContentLoaded", () => {
  const dailyTipElem = document.getElementById("daily-tip");
  const tipTypeElem = document.getElementById("tip-type");
  const quoteElem = document.getElementById("quote");

  if (dailyTipElem && tipTypeElem) {
    const randomTip = getRandomItem(tips);
    dailyTipElem.textContent = randomTip.text;
    tipTypeElem.textContent = `Type: ${randomTip.type}`;
  }

  if (quoteElem) {
    const randomQuote = getRandomItem(quotes);
    quoteElem.textContent = `"${randomQuote}"`;
  }
});




