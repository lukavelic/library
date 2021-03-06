import "./style.css";
import { Library } from "./library";
import { renderDOM } from "./render";

const library = new Library();
const DOMRenderer = new renderDOM();

DOMRenderer.openModal();
DOMRenderer.submitButton();
DOMRenderer.validateInput();

export { library, DOMRenderer };