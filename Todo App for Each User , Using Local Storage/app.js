var email = document.getElementById("email");
var password = document.getElementById("password");
var user_email = document.getElementById("user_email");
var login_container = document.getElementById("login_container");
var home_container = document.getElementById("home_container");
var note = document.getElementById("note");
var note1 = document.getElementById("note1");
var note2 = document.getElementById("note2");


function loginUser() {
    if (!email.value || !password.value)
        return alert("Please add email and password.");
    localStorage.setItem("email", email.value);
  checkIsUserLogin();
}

function checkIsUserLogin() {
  var email = localStorage.getItem("email");
  if (email) {
    login_container.style.display = "none";
    home_container.style.display = "block";
    user_email.innerText = email;
    displayUserNotes();
  } else {
    login_container.style.display = "block";
    home_container.style.display = "none";
  }
}

checkIsUserLogin();

function logout() {
    email.value = "";
    password.value = "";
  localStorage.removeItem("email");
  checkIsUserLogin();
 }

function submitNote() {
  var email = localStorage.getItem("email");

  var obj = {
    email: email,
    note: note.value,
    note1:note1.value,
    note2:note2.value
  };

  saveValueToLocalStorage(obj);
  note.value = "";
  note1.value = "";
  note2.value = "";
}

function saveValueToLocalStorage(obj) {
  var notes = localStorage.getItem("notes");
  if (notes) {
    notes = JSON.parse(notes);
    notes.push(obj);
    localStorage.setItem("notes", JSON.stringify(notes));
  } else {
    notes = [obj];
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  displayUserNotes();
}

function displayUserNotes() {
  var notes = localStorage.getItem("notes");
  var list = document.getElementById("list");
  var currentUserEmail = localStorage.getItem("email");
  if (notes) {
    list.innerHTML = "";
    notes = JSON.parse(notes);
    console.log(notes);
    notes.forEach(function (data, ind) {
      if (data.email === currentUserEmail) {
        var liElement = ` <li class="border rounded p-2 my-2">
        <p class = "font-medium"> <p>Todo:${data.note}</p>
         <p>description:${data.note1}</p>
        <p>Category: ${data.note2}</p>
        <p>${data.email}</p>
          </li>` ;
        list.innerHTML += liElement;
      }
    });
  }
}

displayUserNotes();

