let participantCount = 1;

function participantTemplate(count) {
  return `
  <section class="participant${count}">
    <p>Participant ${count}</p>
    <div class="item">
      <label for="fname${count}">First Name<span>*</span></label>
      <input id="fname${count}" type="text" name="fname${count}" required />
    </div>
    <div class="item activities">
      <label for="activity${count}">Activity #<span>*</span></label>
      <input id="activity${count}" type="text" name="activity${count}" required />
    </div>
    <div class="item">
      <label for="fee${count}">Fee ($)<span>*</span></label>
      <input id="fee${count}" type="number" name="fee${count}" min="0" required />
    </div>
    <div class="item">
      <label for="date${count}">Desired Date <span>*</span></label>
      <input id="date${count}" type="date" name="date${count}" required />
    </div>
    <div class="item">
      <p>Grade</p>
      <select id="grade${count}" name="grade${count}" required>
        <option value="" disabled selected>Select Grade</option>
        <option value="1">1st</option>
        <option value="2">2nd</option>
        <option value="3">3rd</option>
        <option value="4">4th</option>
        <option value="5">5th</option>
        <option value="6">6th</option>
        <option value="7">7th</option>
        <option value="8">8th</option>
        <option value="9">9th</option>
        <option value="10">10th</option>
        <option value="11">11th</option>
        <option value="12">12th</option>
      </select>
    </div>
  </section>
  `;
}

function addParticipant() {
  participantCount++;
  const addButton = document.getElementById("add");
  const participantsFieldset = addButton.parentElement;
  participantsFieldset.insertAdjacentHTML("beforebegin", participantTemplate(participantCount));
}

function totalFees() {
  let feeElements = document.querySelectorAll("[id^=fee]");
  feeElements = [...feeElements];

  const total = feeElements.reduce((sum, feeInput) => {
    const val = parseFloat(feeInput.value);
    return sum + (isNaN(val) ? 0 : val);
  }, 0);

  return total;
}

function successTemplate(info) {
  return `
    <h2>Registration Successful</h2>
    <p>Thank you <strong>${info.adultName}</strong> for registering.</p>
    <p>You have registered <strong>${info.participantCount}</strong> participant${info.participantCount > 1 ? 's' : ''} and owe <strong>$${info.totalFee.toFixed(2)}</strong> in fees.</p>
  `;
}

function submitForm(event) {
  event.preventDefault();

  for(let i = 1; i <= participantCount; i++) {
    const fname = document.getElementById(`fname${i}`);
    const activity = document.getElementById(`activity${i}`);
    const fee = document.getElementById(`fee${i}`);
    const date = document.getElementById(`date${i}`);
    const grade = document.getElementById(`grade${i}`);

    if (!fname.value || !activity.value || !fee.value || !date.value || !grade.value) {
      alert(`Please fill out all fields for Participant ${i}`);
      fname.focus();
      return;
    }
  }

  const adultNameInput = document.getElementById("adult_name");
  if (!adultNameInput.value) {
    alert("Please enter the adult primary contact name.");
    adultNameInput.focus();
    return;
  }

  const totalFee = totalFees();

  const form = document.querySelector("form");
  form.style.display = "none";

  const summary = document.getElementById("summary");
  summary.innerHTML = successTemplate({
    adultName: adultNameInput.value,
    participantCount,
    totalFee,
  });
  summary.style.display = "block";
}

window.addEventListener("DOMContentLoaded", () => {
  const participantSection = document.querySelector(".participant1");
  participantSection.id = "participant1";

  const addButton = document.getElementById("add");
  addButton.addEventListener("click", addParticipant);

  const form = document.querySelector("form");
  form.addEventListener("submit", submitForm);
});

