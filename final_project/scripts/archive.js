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
  } else {
    console.warn("Daily tip elements not found in DOM.");
  }

  if (quoteElem) {
    const randomQuote = getRandomItem(quotes);
    quoteElem.textContent = `"${randomQuote}"`;
    console.log("Quote set:", randomQuote);
  } else {
    console.warn("Quote element not found in DOM.");
  }

  const archiveSection = document.getElementById('archive-entries');
  const filterButton = document.getElementById('filter-button');
  const filterInput = document.getElementById('filter-input');

  let archivedTips = JSON.parse(localStorage.getItem('archivedTips')) || [
    { title: "Drink Water", date: "2025-06-01", summary: "Stay hydrated for better focus and energy." },
    { title: "Take Breaks", date: "2025-06-03", summary: "Rest your mind regularly to stay productive." },
    { title: "Declutter", date: "2025-06-05", summary: "Keep your space clean to reduce distractions." }
  ];

  function displayTips(tips) {
    archiveSection.innerHTML = '';
    if (tips.length === 0) {
      archiveSection.innerHTML = '<p>No archived tips found.</p>';
      return;
    }

    tips.forEach(tip => {
      const entry = document.createElement('article');
      entry.classList.add('archive-entry');
      entry.innerHTML = `
        <h3>${tip.title}</h3>
        <p><strong>Date:</strong> ${tip.date}</p>
        <p>${tip.summary}</p>
      `;
      archiveSection.appendChild(entry);
    });
  }

  displayTips(archivedTips);

  if (filterButton && filterInput) {
    filterButton.addEventListener('click', () => {
      const query = filterInput.value.toLowerCase();
      const filtered = archivedTips.filter(tip =>
        tip.title.toLowerCase().includes(query) ||
        tip.summary.toLowerCase().includes(query)
      );
      displayTips(filtered);
    });
  }
});





