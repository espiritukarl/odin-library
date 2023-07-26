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

let myLibrary = [
  new Book("A Game of Thrones", "George R.R. Martin", 694, false),
  new Book("Harry Potter and the Goblet of Fire", "J.K. Rowlinbg", 752, true)
];

function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
}

function mainLibrary(event) {
  event.preventDefault()
  addBookToLibrary();
  clearLibrary()
  displayLibrary();
}

function addBookToLibrary() {
  let form = document.forms.BookForm
  let data = new FormData(form)
  let newBook = new Book(data.get('book-title'), data.get('book-author'), data.get('book-pages'), data.get('book-completed'))
  if (myLibrary.some(book => book.title === newBook.title) && myLibrary.some(book => book.author === newBook.author)) {
    alert("Book is already in the library")
  } else {
    myLibrary.push(newBook)
  }

  // Close the Modal when you submit, and then reset the input
  modal.style.display = "none";
  form.reset()
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