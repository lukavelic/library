let myLibrary = [];

class Book {
  constructor (title, author, numberOfPages, readStatus) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.readStatus = readStatus;
  }
}

function addBookToLibrary() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const numberOfPages = document.getElementById('numberOfPages').value;
    const readStatus = document.getElementById('readUnread').checked;
    if ( title != '' && author != '' && numberOfPages != 0 ) {
        const tempObject = new Book (title, author, numberOfPages, readStatus);
        myLibrary.push(tempObject);
        clearInputFields();
        createList(myLibrary);
    } else { alert('Please complete all fields!') };
}

function clearInputFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('numberOfPages').value = '';
    document.getElementById('readUnread').checked = false;
}

function createList(array) {
    const listParent = document.querySelector('.bookListItems');
    listParent.innerHTML = '';
    for (i = 0; i < array.length; i++) {
        const book = array[i];
        let readStatus = ''
        const newList = document.createElement('li');
        newList.dataset.key = i;
        if (array[i].readStatus === true) {
            readStatus = 'finished'
        } else { readStatus = 'not finished yet'}
        newList.innerText = `${book.title} by ${book.author}, ${book.numberOfPages} pages, ${readStatus}.`
        newList.innerHTML += `<button type="submit" id="removeBook" data-btn="${i}">&times;</button>`;
        listParent.appendChild(newList);
        let removeButton = document.querySelector(`[data-btn="${i}"]`)
        removeButton.addEventListener('click', removeBookAction);

        console.log(removeButton)
    }
}

function removeBookAction (event) {
    let buttonKey = event.target.dataset.btn;
    let listElement = document.querySelector(`[data-key="${buttonKey}"]`);
    console.log(listElement)
    listElement.remove();
    myLibrary.splice(buttonKey, 1);
}

const submitButton = document.querySelector('#submitButton');
submitButton.addEventListener('click', addBookToLibrary);

// Modal script

const modal = document.getElementById("myModal");
const btnOpen = document.getElementById("openModal");
const btnClose = document.getElementById("closeModal");

btnOpen.onclick = function() {
  modal.style.display = "block";
}

btnClose.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

const book1 = new Book ('The Hobbit', 'J.R.R. Tolkien', 500, true)
const book2 = new Book ('Harry Potter', 'J.K. Rowling', 450, true)
myLibrary.push(book1);
myLibrary.push(book2);
createList(myLibrary);