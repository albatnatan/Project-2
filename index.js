let contacts = [
  {
    name: 'נתן',
    number: '0546789465',
    email: 'eyalbat@gmail.com',
    address: 'ישפייה',
    img: 'img/natan.jpg',
  },
  {
    name: 'דאניה',
    number: '054643465',
    email: 'daniaswaeed@gmail.com',
    address: 'ישפייה',
    img: 'img/dania.png',
  },
  {
    name: 'לאנה',
    number: '0546123465',
    email: 'lana@gmail.com',
    address: 'ישפייה',
    img: 'img/lana.png',
  },
  {
    name: 'מירנה',
    number: '123456678',
    email: 'mirna@gmail.com',
    address: 'ישפייה',
    img: 'img/mirna.png',
  },
  {
    name: 'מחמוד',
    number: '05433444343',
    email: 'mohammad@gmail.com',
    address: 'ישפייה',
    img: 'img/mohammad.png',
  },
];

// פונקציה לאימות קלט של שם
function validateName(name) {
  const regex = /^[a-zA-Z\sא-ת]*$/; // Regex לבדיקת תווים מותרים לשם
  return regex.test(name); // החזרת תוצאה של בדיקת הקלט מול ה-regex
}

// פונקציה לאימות קלט של אימייל
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex לבדיקת פורמט אימייל תקין
  return regex.test(email); // החזרת תוצאה של בדיקת הקלט מול ה-regex
}

// פונקציה לאימות קלט של כתובת
function validateAddress(address) {
  const regex = /^[a-zA-Z\sא-ת]*$/; // Regex לבדיקת תווים מותרים לכתובת
  return regex.test(address); // החזרת תוצאה של בדיקת הקלט מול ה-regex
}

// פונקציה לאימות קלט של מספר טלפון
function validateNumber(number) {
  const regex = /^\d+$/; // Regex לבדיקת פורמט מספר טלפון
  return regex.test(number); // החזרת תוצאה של בדיקת הקלט מול ה-regex
}

// פונקציה להוספת איש קשר עם אימות נתונים
function addContact(contact, prepend = false) {
  console.log('Adding contact:', contact);
  const list = document.getElementById('contacts-list');

  let li = createContactElement(contact);

  if (prepend) {
    list.prepend(li); // Add the contact at the beginning of the list
  } else {
    list.appendChild(li); // Add the contact at the end of the list
  }

  updateContactCount();
}

// פונקציה לאכלוס ראשוני של רשימת אנשי הקשר
function populateContacts() {
  sortContactsAsc(); // Ensure contacts are sorted before displaying

  const list = document.getElementById('contacts-list');
  list.innerHTML = '';

  contacts.forEach(contact => addContact(contact));

  // Update the contact count after populating
  updateContactCount();
}

// Initial population of contacts
function createContactElement(contact) {
  const li = document.createElement('li');
  li.classList.add('contact');

  // Set inner HTML
  li.innerHTML = `
    <div class="Photo-Name">
      <div class="contact-circle">
        <img src="${contact.img}" alt="${contact.name}" />
      </div>
      <div class="contact-details">
        <p class="contact-name">${contact.name}</p>
      </div>
    </div>
    <div class="contact-buttons">
      <button class="btn-icon btn-delete" onclick="deleteContact('${contact.number}')">
        <i class="fas fa-trash"></i>
      </button>
      <button class="btn-icon btn-update" onclick="editContact('${contact.number}')">
        <i class="fas fa-edit"></i>
      </button>
      <button class="btn-icon btn-details" onclick="showContactInfo('${contact.number}')">
        <i class="fas fa-info-circle"></i>
      </button>
      <button class="btn-icon btn-call" data-number="${contact.number}">
        <i class="fas fa-phone"></i>
      </button>
      <span class="phone-number">${contact.number}</span>
    </div>
  `;

  // Add hover effects
  li.addEventListener('mouseover', () => {
    li.style.backgroundColor = '#ccc'; // Change to your preferred hover color
  });

  li.addEventListener('mouseout', () => {
    li.style.backgroundColor = ''; // Revert to original background color
  });

  return li;
}
populateContacts();

function sortContactsAsc() {
  contacts.sort((a, b) => {
    return a.name.localeCompare(b.name, 'he'); // Sort in ascending order (A to Z)
  });
}

// פונקציה לעריכת פרטי איש קשר
function editContact(number) {
  const contact = contacts.find(c => c.number === number); // מציאת איש הקשר לפי מספר הטלפון

  const content = `
    <div class="contact-dialog-form">
      <label for="input-name">שם:</label>
      <input type="text" name="name" id="input-name" value="${contact.name}" />
      
      <label for="input-number">מספר טלפון:</label>
      <input type="tel" name="number" id="input-number" value="${contact.number}" />
      
      <label for="input-email">אימייל:</label>
      <input type="email" name="email" id="input-email" value="${contact.email}" />
      
      <label for="input-address">כתובת:</label>
      <input type="text" name="address" id="input-address" value="${contact.address}" />
      
      <div class="modal-buttons">
        <button class="close-dialog" onclick="closeDialog()">סגור</button>
        <button onclick="saveContact('${contact.number}')">שמור</button>
      </div>
    </div>
  `;

  showDialog(content); // הצגת דיאלוג עם תוכן העריכה
}

// פונקציה להצגת דיאלוג עם פרטי איש קשר
function showContactInfo(number) {
  const contact = contacts.find(c => c.number === number); // מציאת איש הקשר לפי מספר הטלפון

  if (!contact) {
    console.error('Contact not found:', number); // הצגת הודעת שגיאה אם איש הקשר לא נמצא
    return;
  }

  const content = `
    <div class="contact-info-dialog">
      <div class="contact-info-header">
        <img src="${contact.img}" alt="${contact.name}" class="contact-img" />
        <h2 class="contact-name">${contact.name}</h2>
      </div>
      <div class="contact-info-details">
        <p><strong>מספר טלפון:</strong> ${contact.number}</p>
        <p><strong>אימייל:</strong> ${contact.email}</p>
        <p><strong>כתובת:</strong> ${contact.address}</p>
      </div>
      <div class="modal-buttons">
        <button class="close-dialog" onclick="closeDialog()">סגור</button>
      </div>
    </div>
  `;

  showDialog(content); // הצגת דיאלוג עם פרטי איש הקשר
}

// פונקציה לשמירת איש קשר מעודכן או להוספת איש קשר חדש
function saveContact(number) {
  const inputName = document.getElementById('input-name').value.trim(); // קבלת שם מהקלט והסרת רווחים מיותרים
  const inputNumber = document.getElementById('input-number').value.trim(); // קבלת מספר טלפון מהקלט והסרת רווחים מיותרים
  const inputEmail = document.getElementById('input-email').value.trim(); // קבלת אימייל מהקלט והסרת רווחים מיותרים
  const inputAddress = document.getElementById('input-address').value.trim(); // קבלת כתובת מהקלט והסרת רווחים מיותרים

  // אימות שדות הקלט
  if (!validateName(inputName)) {
    alert('שם לא תקין. יש להזין רק אותיות ורווחים.');
    return;
  }
  if (!validateEmail(inputEmail)) {
    alert('אימייל לא תקין. יש להזין אימייל תקני.');
    return;
  }
  if (!validateAddress(inputAddress)) {
    alert('כתובת לא תקינה. יש להזין רק אותיות, רווחים ותווים בעברית.');
    return;
  }
  if (!validateNumber(inputNumber)) {
    alert('מספר טלפון לא תקין. יש להזין רק מספרים.');
    return;
  }

  const contactIndex = contacts.findIndex(c => c.number === number); // מציאת אינדקס איש הקשר לפי מספר הטלפון
  if (contactIndex !== -1) {
    contacts[contactIndex] = {
      name: inputName,
      number: inputNumber,
      email: inputEmail,
      address: inputAddress,
      img: contacts[contactIndex].img,
    };
    updateUI(); // עדכון ממשק המשתמש
  }

  closeDialog(); // סגירת הדיאלוג
}

// פונקציה למחיקת איש קשר
function deleteContact(number) {
  const contact = contacts.find(c => c.number === number);
  if (contact) {
    const confirmDelete = confirm(
      `Are you sure you want to delete the contact "${contact.name}"?`,
    );
    if (confirmDelete) {
      contacts = contacts.filter(c => c.number !== number);
      updateUI();
    }
  } else {
    console.error('Contact not found:', number);
  }
}

// Ensure the contact count is correct on initial load
document.addEventListener('DOMContentLoaded', updateContactCount);

// פונקציה לעדכון ממשק המשתמש עם רשימת אנשי הקשר הנוכחית
function updateUI() {
  sortContactsAsc(); // Sort contacts before updating UI

  const list = document.getElementById('contacts-list');
  list.innerHTML = '';

  contacts.forEach(contact => addContact(contact));

  // Update the contact count after updating the UI
  updateContactCount();
}
// פונקציה להוספת איש קשר חדש
function addNewContact() {
  const content = `
    <div class="contact-dialog-form">
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
      <div class="modal-buttons">
        <button class="close-dialog" onclick="closeDialog()">סגור</button>
        <button onclick="saveNewContact()">שמור</button>
      </div>
    </div>
  `;

  showDialog(content); // הצגת דיאלוג עם טופס הוספת איש קשר חדש
}

// פונקציה לשמירת איש קשר חדש
function saveNewContact() {
  const inputName = document.getElementById('input-name').value.trim();
  const inputNumber = document.getElementById('input-number').value.trim();
  const inputEmail = document.getElementById('input-email').value.trim();
  const inputAddress = document.getElementById('input-address').value.trim();
  const inputImg = document.getElementById('input-img').value.trim();

  // Input validation
  if (!validateName(inputName)) {
    alert('שם לא תקין. יש להזין רק אותיות ורווחים.');
    return;
  }
  if (!validateNumber(inputNumber)) {
    alert('מספר טלפון לא תקין. יש להזין רק מספרים.');
    return;
  }
  if (!validateEmail(inputEmail)) {
    alert('אימייל לא תקין. יש להזין אימייל תקני.');
    return;
  }
  if (!validateAddress(inputAddress)) {
    alert('כתובת לא תקינה. יש להזין רק אותיות, רווחים ותווים בעברית.');
    return;
  }

  // Check if contact name already exists
  const existingContact = contacts.find(contact => contact.name === inputName);
  if (existingContact) {
    alert(`איש קשר בשם "${inputName}" כבר קיים.`);
    return; // Stop the function if a duplicate is found
  }

  // Create a new contact
  const defaultImg = 'img/OIP.jpeg';
  const newContact = {
    name: inputName,
    number: inputNumber,
    email: inputEmail,
    address: inputAddress,
    img: inputImg || defaultImg,
  };
  contacts.push(newContact); // Add the new contact to the list

  // Re-sort the contacts and then add the new contact at the top of the list
  sortContactsAsc();
  addContact(newContact, true);

  closeDialog(); // Close the dialog
}
function updateContactCount() {
  const count = contacts.length;
  document.getElementById('contact-count-number').textContent = count;
}

// פונקציה לחיפוש וסינון אנשי קשר
function searchContacts() {
  const searchInput = document
    .getElementById('contact-search')
    .value.toLowerCase(); // קבלת ערך חיפוש מהקלט והמרתו לאותיות קטנות
  const contactItems = document.querySelectorAll('#contacts-list .contact'); // בחירת כל פרטי אנשי הקשר ברשימה

  contactItems.forEach(item => {
    const contactName = item
      .querySelector('.contact-name')
      .textContent.toLowerCase(); // קבלת שם איש הקשר והמרתו לאותיות קטנות
    if (contactName.includes(searchInput)) {
      item.style.display = ''; // הצגת איש הקשר אם הוא תואם לחיפוש
    } else {
      item.style.display = 'none'; // הסתרת איש הקשר אם הוא לא תואם לחיפוש
    }
  });
}

// פונקציה למחיקת כל אנשי הקשר
function deleteAllContacts() {
  if (confirm('האם אתה בטוח שברצונך למחוק את כל אנשי הקשר?')) {
    // אישור למחוק את כל אנשי הקשר
    contacts = []; // ניקוי רשימת אנשי הקשר
    updateUI(); // עדכון ממשק המשתמש
  }
}
function showDialog(content) {
  const dialog = document.getElementById('contactDialog');
  const dialogBody = dialog.querySelector('.dialog-body');
  dialogBody.innerHTML = content;
  dialog.style.display = 'block'; // Make the dialog visible
}

function closeDialog() {
  const dialog = document.getElementById('contactDialog');
  dialog.style.display = 'none'; // Hide the dialog
}
// קישור מאזיני אירועים להוספת איש קשר חדש ולמחיקת כל אנשי הקשר
document
  .querySelector('.add-new-contact')
  .addEventListener('click', addNewContact);
document
  .querySelector('.delete-all-contacts')
  .addEventListener('click', deleteAllContacts);

// מאזין לאירועים לסגירת הדיאלוג אם לוחצים מחוץ לו
window.addEventListener('click', event => {
  const modal = document.getElementById('dialog');
  if (
    event.target === modal ||
    event.target.classList.contains('close-dialog')
  ) {
    closeDialog(); // סגירת הדיאלוג
  }
});
