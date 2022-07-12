import { library } from "./index";

class Book {
    constructor (title, author, numberOfPages, readStatus) {
      this.title = title;
      this.author = author;
      this.numberOfPages = numberOfPages;
      this.readStatus = readStatus;
    };

    addBookToLibrary() {

        library.library.push(this);
    }

    removeBookFromLibrary() {

    }
};

export { Book };