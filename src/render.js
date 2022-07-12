import { Book } from "./books";
import { library, DOMRenderer } from "./index";

class renderDOM {
    openModal() {
        const modal = document.getElementById("myModal");
        const btnOpen = document.getElementById("openModal");
        const btnClose = document.getElementById("closeModal");

        btnOpen.onclick = function() {
        modal.style.display = "block";
        document.querySelector('#title').focus();
        };

        btnClose.onclick = function() {
        modal.style.display = "none";
        };

        window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            };
        };        
    };

    submitButton() {
        const submitButton = document.querySelector('#submit-button');

        // submitButton.addEventListener('click', function() {
        //     const modal = document.getElementById("myModal");

        //     console.log('clicked submit')
        //     const title = document.getElementById('title').value;
        //     const author = document.getElementById('author').value;
        //     const numberOfPages = document.getElementById('numberOfPages').value;
        //     const readStatus = document.getElementById('readUnread').checked;
        //     const book = new Book(title, author, numberOfPages, readStatus);
        //     book.addBookToLibrary(this);

        //     console.log(this)
            
        //     DOMRenderer.createList(library.library);

        //     modal.style.display = "none";
        //     DOMRenderer.clearInputFields();
        // });

        

        const form = document.querySelector('.modal-form');
        form.addEventListener('submit', function() {
            const modal = document.getElementById("myModal");

            const title = document.getElementById('title');
            const author = document.getElementById('author');
            const numberOfPages = document.getElementById('numberOfPages');
            const readStatus = document.getElementById('readUnread');

            if(title.value !== '' && author.value !== '' && numberOfPages.value !== '') {

                const book = new Book(title.value, author.value, numberOfPages.value, readStatus.value);        
                book.addBookToLibrary(this);
                
                DOMRenderer.createList(library.library);

                modal.style.display = "none";
                DOMRenderer.clearInputFields();
            } else DOMRenderer.validateInput();
        });
    }

    createList(array) {
        const listParent = document.querySelector('.bookListItems');
        listParent.innerHTML = '';
        for (let i = 0; i < array.length; i++) {
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
            removeButton.addEventListener('click', DOMRenderer.removeBookAction);
        }
    }
    
    removeBookAction (event) {
        let buttonKey = event.target.dataset.btn;
        let listElement = document.querySelector(`[data-key="${buttonKey}"]`);
        listElement.remove();
        library.library.splice(buttonKey, 1);
    }

    clearInputFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('numberOfPages').value = '';
        document.getElementById('readUnread').checked = false;
    };

    validateInput() {
        const title = document.getElementById('title');
        const author = document.getElementById('author');
        const numberOfPages = document.getElementById('numberOfPages');
        
        const validation = function(evt) {

            if(evt.target.value === '') {
                evt.target.setCustomValidity(`Please type in the ${evt.target.placeholder.toLowerCase()}.`);
                evt.target.reportValidity();
            } else {
                evt.target.setCustomValidity("");
            };
        }

        title.addEventListener('input', validation);
        author.addEventListener('input', validation);
        numberOfPages.addEventListener('input', validation);
        title.addEventListener('focus', validation);
        author.addEventListener('focus', validation);
        numberOfPages.addEventListener('focus', validation);
    }
};

export { renderDOM };