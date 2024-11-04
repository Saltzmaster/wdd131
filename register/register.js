let participantCount = 1; // Initialize participant count

document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("add");
  addButton.addEventListener("click", addParticipant);
});

function addParticipant() {
  participantCount++; // Increment participant count
  const participantHTML = participantTemplate(participantCount);
  
  // Insert new participant section before the "Add" button
  document.getElementById("add").insertAdjacentHTML("beforebegin", participantHTML);
}

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
        <input id="activity${count}" type="text" name="activity${count}" />
      </div>
      <div class="item">
        <label for="fee${count}">Fee ($)<span>*</span></label>
        <input id="fee${count}" type="number" name="fee${count}" />
      </div>
      <div class="item">
        <label for="date${count}">Desired Date <span>*</span></label>
        <input id="date${count}" type="date" name="date${count}" />
      </div>
      <div class="item">
        <p>Grade</p>
        <select>
          <option selected value="" disabled></option>
          <option value="1">1st</option>
          <!-- More options here -->
          <option value="12">12th</option>
        </select>
      </div>
    </section>`;
}


document.querySelector("form").addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault(); // Prevent page reload

  const feeTotal = totalFees();
  const adultName = document.getElementById("adult_name").value;
  const summaryMessage = successTemplate({
    name: adultName,
    participantCount,
    feeTotal,
  });

  // Hide form and show summary
  document.querySelector("form").style.display = "none";
  const summary = document.getElementById("summary");
  summary.innerHTML = summaryMessage;
  summary.style.display = "block";
}

function totalFees() {
  let feeElements = document.querySelectorAll("[id^=fee]");
  feeElements = [...feeElements]; // Convert NodeList to Array
  
  return feeElements.reduce((total, fee) => {
    return total + (parseFloat(fee.value) || 0);
  }, 0);
}

function successTemplate(info) {
  return `
    <p>Thank you, ${info.name}, for registering.</p>
    <p>You have registered ${info.participantCount} participant(s) and owe $${info.feeTotal.toFixed(2)} in fees.</p>
  `;
}
