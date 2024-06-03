// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
// -----------------------------------------------------------------------

const tbody = document.getElementsByTagName("tbody")[0]
const btitle = document.getElementById("book-title")
const bauthor = document.getElementById("book-author")
const bpages = document.getElementById("book-pages")
const bookForm = document.getElementById("BookForm")
const spanError = document.getElementsByClassName("error")

let myLibrary = [
  new Book("A Game of Thrones", "George R.R. Martin", 694, false),
  new Book("Harry Potter and the Goblet of Fire", "J.K. Rowling", 752, true)
];

function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
}

function mainLibrary(event) {
  event.preventDefault()
  clearError();
  addBookToLibrary();
  clearLibrary()
  displayLibrary();
}

function addBookToLibrary() {
  let form = document.forms.BookForm
  let data = new FormData(form)
  let newBook = new Book(data.get('book-title'), data.get('book-author'), data.get('book-pages'), data.get('book-completed'))

  if (myLibrary.some((book) => (book.title === newBook.title) && (book.author === newBook.author))) {
    spanError[0].textContent = "Book is already in library"
    btitle.classList.add("invalid")
  } else if (!validateForm()) {
    myLibrary.push(newBook)
    // Close the Modal when you submit, and then reset the input
    modal.style.display = "none";
    form.reset()
  }
}

function validateForm() {
  if (btitle.validity.valueMissing) {
    spanError[0].textContent = "Please enter a book title"
  }
  if (bauthor.validity.valueMissing) {
    spanError[1].textContent = "Please enter a book author"
  }
  if (bpages.validity.valueMissing) {
    spanError[2].textContent = "Please enter amount of pages" 
  }
  if (bpages.validity.rangeUnderflow || bpages.validity.rangeOverflow) {
    spanError[2].textContent = "Please enter amount of pages that range from 1 to 10000" 
  }
  let val = btitle.validity.valueMissing || bauthor.validity.valueMissing || bpages.validity.valueMissing || bpages.validity.rangeUnderflow || bpages.validity.rangeOverflow
  if (val) bookForm.classList.add("submitted")
  return val
}

function clearError() {
  Array.from(spanError).forEach(el => el.textContent = "");
  Array.from(spanError).forEach(el => {
    if (el.classList.contains("active")) {
      el.classList.remove("active")
    }
  });
  if (btitle.classList.contains("submitted")) btitle.remove.classList("invalid")
  bookForm.classList.remove("submitted")
}

function displayLibrary() {
  myLibrary.forEach((newBook, index) => {
    let tr = document.createElement("tr")
    let title = document.createElement("td")
    let author = document.createElement("td")
    let completed = document.createElement("td")
    let pages = document.createElement("td")
    let remove = document.createElement("td")

    const button = document.createElement('button');
    button.innerText = "Remove";
    button.classList.add("button-17")
    button.classList.add("remove-button")
    button.onclick = () => {
      removeItem(tr)
    }

    const button2 = document.createElement('button');
    classForRead(button2, newBook)
    button2.onclick = () => {
      toggleRead(button2, newBook)
    }

    title.textContent = newBook.title
    author.textContent = newBook.author
    pages.textContent = newBook.pages
    completed.append(button2)
    remove.append(button)

    tr.append(title)
    tr.append(author)
    tr.append(pages)
    tr.append(completed)
    tr.append(remove)

    tbody.append(tr)
  })
}

function removeItem(tr) {
  myLibrary.splice(tr.rowIndex - 1, 1);
  clearLibrary()
  displayLibrary()
}

function classForRead(button2, newBook) {
  if (newBook.read) {
    button2.innerText = "Read"
    button2.classList.add('completed')
    button2.classList.add('button-17')
  } else {
    button2.innerText = "Unread"
    button2.classList.add('not-completed')
    button2.classList.add('button-17')
  }
}

function toggleRead(button2, newBook) {
  newBook.read = !newBook.read
  if (newBook.read) {
    button2.classList.remove('not-completed')
    button2.classList.add('completed')
  } else {
    button2.classList.remove('completed')
    button2.classList.add('not-completed')
  }
  classForRead(button2, newBook)
}


function clearLibrary() {
  tbody.innerHTML = ""
}

function deleteLibrary() {
  clearLibrary()
  myLibrary = []
}

displayLibrary()