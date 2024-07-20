// Sample contact data
let contacts = [
  {
    name: "נתן אלבט",
    number: "0546789465",
    email: "eyalbat@gmail.com",
    address: "ישפייה",
    img: "img/natan.jpg",
  },
  {
    name: "דאניה סואעד",
    number: "054643465",
    email: "daniaswaeed@gmail.com",
    address: "ישפייה",
    img: "img/dania.png",
  },
  {
    name: "לאנה נבואני",
    number: "0546123465",
    email: "lana@gmail.com",
    address: "ישפייה",
    img: "img/lana.png",
  },
  {
    name: "מירנה סעב",
    number: "123456678",
    email: "mirna@gmail.com",
    address: "ישפייה",
    img: "img/mirna.png",
  },
  {
    name: "מחמוד",
    number: "05433444343",
    email: "mohammad@gmail.com",
    address: "ישפייה",
    img: "img/mohammad.png",
  },
];

// Function to validate name (only letters and spaces)
function validateName(name) {
  const regex = /^[a-zA-Z\sא-ת]*$/; // Allows letters, spaces, and Hebrew characters
  return regex.test(name);
}

// Function to validate email (must contain @ and end with .com)
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Function to validate address (only letters, spaces, and Hebrew characters)
function validateAddress(address) {
  const regex = /^[a-zA-Z\sא-ת]*$/; // Allows letters, spaces, and Hebrew characters
  return regex.test(address);
}

// Function to validate number (only numeric digits)
function validateNumber(number) {
  const regex = /^\d+$/;
  return regex.test(number);
}

// Function to add contact with validation
function addContact(contact) {
  const list = document.getElementById("contacts-list");

  let li = document.createElement("li");
  li.classList.add("contact");

  li.innerHTML = `
    <div class="contact-info">
      <div class="call-button">
        <button class="btn-call" data-number="${contact.number}">התקשר</button>
        <span class="phone-number">${contact.number}</span>
      </div>
    </div>
    <div class="Photo-Name">
      <div class="contact-circle">
        <img src="${contact.img}" alt="${contact.name}" />
      </div>
      <div class="contact-details">
        <p class="contact-name">${contact.name}</p>
      </div>
    </div>
    <div class="contact-buttons">
      <button class="btn-delete" onclick="deleteContact('${
        contact.number
      }')">מחיקה</button>
      <button class="btn-update" onclick="editContact('${
        contact.number
      }')">עדכון</button>
      <button class="btn-details" onclick="toggleDetails(this)" data-index="${contacts.indexOf(
        contact
      )}">פרטי איש קשר</button>
    </div>
  `;

  list.appendChild(li);
}

// Function to toggle contact details visibility
function toggleDetails(button) {
  const contactDetails = button.parentElement.previousElementSibling;
  contactDetails.classList.toggle("show-details");
}

// Function to populate initial contact list
function populateContacts() {
  const list = document.getElementById("contacts-list");
  contacts.forEach((contact) => addContact(contact));
}

// Function to edit contact details
function editContact(number) {
  const contact = contacts.find((c) => c.number === number);
  const modal = document.getElementById("myModal");
  modal.style.display = "flex";

  // Store original values
  let originalName = contact.name;
  let originalNumber = contact.number;
  let originalEmail = contact.email;
  let originalAddress = contact.address;

  const modelContainer = document.querySelector(".model-Container");
  modelContainer.innerHTML = `
      <label for="input-name">שם:</label>
      <input type="text" name="name" id="input-name" value="${contact.name}" />
      <label for="input-number">מספר טלפון:</label>
      <input type="tel" name="number" id="input-number" value="${contact.number}" />
      <label for="input-email">אימייל:</label>
      <input type="email" name="email" id="input-email" value="${contact.email}" />
      <label for="input-address">כתובת:</label>
      <input type="text" name="address" id="input-address" value="${contact.address}" />
    <div class="modal-buttons">
    <button class="close" onclick="closeModal()">סגור</button>
    <button onclick="saveContact('${contact.number}', '${originalName}', '${originalNumber}', '${originalEmail}', '${originalAddress}')">שמור</button>
      </div>
    `;
}

// Function to save updated contact or add new contact
function saveContact(
  number,
  originalName,
  originalNumber,
  originalEmail,
  originalAddress
) {
  const modal = document.getElementById("myModal");
  let inputName = document.getElementById("input-name").value.trim();
  let inputNumber = document.getElementById("input-number").value.trim();
  let inputEmail = document.getElementById("input-email").value.trim();
  let inputAddress = document.getElementById("input-address").value.trim();

  // Validate input fields
  while (!validateName(inputName)) {
    inputName = prompt("שם לא תקין. יש להזין רק אותיות ורווחים.", inputName);
    if (inputName === null) {
      // User clicked cancel
      inputName = originalName; // Revert to original value
    }
  }
  while (!validateEmail(inputEmail)) {
    inputEmail = prompt(
      "אימייל לא תקין. יש להזין אימייל תקני (לדוגמה, example@gmail.com).",
      inputEmail
    );
    if (inputEmail === null) {
      // User clicked cancel
      inputEmail = originalEmail; // Revert to original value
    }
  }
  while (!validateAddress(inputAddress)) {
    inputAddress = prompt(
      "כתובת לא תקינה. יש להזין רק אותיות, רווחים ותווים בעברית.",
      inputAddress
    );
    if (inputAddress === null) {
      // User clicked cancel
      inputAddress = originalAddress; // Revert to original value
    }
  }
  while (!validateNumber(inputNumber)) {
    inputNumber = prompt(
      "מספר טלפון לא תקין. יש להזין רק מספרים.",
      inputNumber
    );
    if (inputNumber === null) {
      // User clicked cancel
      inputNumber = originalNumber; // Revert to original value
    }
  }

  // Update existing contact
  const contactIndex = contacts.findIndex((c) => c.number === number);
  if (contactIndex !== -1) {
    contacts[contactIndex] = {
      name: inputName,
      number: inputNumber,
      email: inputEmail,
      address: inputAddress,
      img: contacts[contactIndex].img,
    };
    updateUI(); // Update the user interface with the updated contact list
  } else {
    // Add new contact
    const newContact = {
      name: inputName,
      number: inputNumber,
      email: inputEmail,
      address: inputAddress,
      img: "img/default-avatar.png", // Default image placeholder
    };
    contacts.push(newContact);
    addContact(newContact); // Add the new contact to the UI list
  }

  modal.style.display = "none"; // Close the modal after saving
}

// Function to delete a contact
function deleteContact(number) {
  contacts = contacts.filter((c) => c.number !== number);
  updateUI(); // Update the user interface with the updated contact list
}

// Function to update the user interface with the current contacts list
function updateUI() {
  const list = document.getElementById("contacts-list");
  list.innerHTML = ""; // Clear existing list

  // Re-populate the list with updated contacts
  contacts.forEach((contact) => addContact(contact));
}

// Function to close the modal
function closeModal(event) {
  const modal = document.getElementById("myModal");
  if (event.target === modal || event.target.classList.contains("close")) {
    modal.style.display = "none";
  }
}

// Function to display the add new contact form in the modal
function addNewContact() {
  const modal = document.getElementById("myModal");
  modal.style.display = "flex";

  const modelContainer = document.querySelector(".model-Container");
  modelContainer.innerHTML = `
      <label for="input-name">שם:</label>
      <input type="text" name="name" id="input-name" />
      <label for="input-number">מספר טלפון:</label>
      <input type="tel" name="number" id="input-number" />
      <label for="input-email">אימייל:</label>
      <input type="email" name="email" id="input-email" />
      <label for="input-address">כתובת:</label>
      <input type="text" name="address" id="input-address" />
      <label for="input-img">תמונה (URL):</label>
    <input type="text" name="img" id="input-img" />
      <div class="buttons-modal">
      <div class="modal-buttons">
    <button class="close" onclick="closeModal()">סגור</button>
      </div>
      <div class="modal-buttons">
        <button onclick="saveNewContact()">שמור</button>
      </div>
    </div>
    `;
}

// Function to save new contact
function saveNewContact(
  originalName,
  originalNumber,
  originalEmail,
  originalAddress
) {
  let inputName = document.getElementById("input-name").value.trim();
  let inputNumber = document.getElementById("input-number").value.trim();
  let inputEmail = document.getElementById("input-email").value.trim();
  let inputAddress = document.getElementById("input-address").value.trim();
  let inputImg = document.getElementById("input-img").value.trim();

  // Validate input fields
  while (!validateName(inputName)) {
    inputName = prompt("שם לא תקין. יש להזין רק אותיות ורווחים.", inputName);
    if (inputName === null) return; // User clicked cancel
  }
  while (!validateEmail(inputEmail)) {
    inputEmail = prompt(
      "אימייל לא תקין. יש להזין אימייל תקני (לדוגמה, example@gmail.com).",
      inputEmail
    );
    if (inputEmail === null) return; // User clicked cancel
  }
  while (!validateAddress(inputAddress)) {
    inputAddress = prompt(
      "כתובת לא תקינה. יש להזין רק אותיות, רווחים ותווים בעברית.",
      inputAddress
    );
    if (inputAddress === null) return; // User clicked cancel
  }
  while (!validateNumber(inputNumber)) {
    inputNumber = prompt(
      "מספר טלפון לא תקין. יש להזין רק מספרים.",
      inputNumber
    );
    if (inputNumber === null) return; // User clicked cancel
  }

  // Add new contact
  const newContact = {
    name: inputName,
    number: inputNumber,
    email: inputEmail,
    address: inputAddress,
    img: inputImg || "img/OIP.jpeg", // Default image placeholder if img is not provided
  };
  contacts.push(newContact);
  addContact(newContact); // Add the new contact to the UI list

  const modal = document.getElementById("myModal");
  modal.style.display = "none"; // Close the modal after saving
}

// Function to delete all contacts
function deleteAllContacts() {
  contacts = []; // Clear all contacts
  updateUI(); // Update the user interface with the updated contact list
}
function closeModal(event) {
  const modal = document.getElementById("myModal");
  if (event.target === modal || event.target.classList.contains("close")) {
    modal.style.display = "none";
  }
}
// Event listener to handle modal close on clicking outside the modal content or on the "x" button
document.addEventListener("click", closeModal);

// Initialize the contact list
populateContacts();
function toggleDetails(button) {
  const index = button.getAttribute("data-index");
  const contact = contacts[index];

  const modal = document.getElementById("myModal");
  modal.style.display = "flex";

  const modelContainer = document.querySelector(".model-Container");
  modelContainer.innerHTML = `
      <div class="contact-details-modal">
        <div class="contact-circle-modal">
          <img src="${contact.img}" alt="${contact.name}" />
        </div>
        <div class="contact-info-modal">
          <label for="input-name">שם:</label>
          <input type="text" name="name" id="input-name" value="${contact.name}" disabled />
          <label for="input-number">מספר טלפון:</label>
          <input type="tel" name="number" id="input-number" value="${contact.number}" disabled />
          <label for="input-email">אימייל:</label>
          <input type="email" name="email" id="input-email" value="${contact.email}" disabled />
          <label for="input-address">כתובת:</label>
          <input type="text" name="address" id="input-address" value="${contact.address}" disabled />
       <div class="modal-buttons">
        <button class="close" onclick="closeModal()">סגור</button>
      </div>
    `;
}
// Function to toggle additional buttons visibility
function toggleAdditionalButtons() {
  var additionalButtons = document.getElementById("additional-buttons");
  var details = document.querySelector("details");

  if (details.hasAttribute("open")) {
    additionalButtons.style.display = "block";
  } else {
    additionalButtons.style.display = "none";
  }
}

// Event listener for details element toggle
document
  .querySelector("details")
  .addEventListener("toggle", toggleAdditionalButtons);
// Function to create and append additional buttons dynamically
function createAdditionalButtons() {
  const additionalButtonsDiv = document.getElementById("additional-buttons");

  // Create the "הוספת איש קשר חדש" button
  const addNewButton = document.createElement("button");
  addNewButton.textContent = "הוספת איש קשר חדש";
  addNewButton.onclick = addNewContact; // Set the onclick handler
  additionalButtonsDiv.appendChild(addNewButton);

  // Create the "מחיקת כל האנשי קשר" button
  const deleteAllButton = document.createElement("button");
  deleteAllButton.textContent = "מחיקת כל האנשי קשר";
  deleteAllButton.onclick = deleteAllContacts; // Set the onclick handler
  additionalButtonsDiv.appendChild(deleteAllButton);
}

// Call the function to create and append the additional buttons
createAdditionalButtons();
