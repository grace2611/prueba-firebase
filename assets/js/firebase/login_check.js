import { showMessaje } from "./show_message.js";
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

export const loginCheck = user => {
    // Si el usuario existe, oculto los botones necesarios
    if (user) {
        loggedInLinks.forEach(link => link.style.display = 'block');
        loggedOutLinks.forEach(link => link.style.display = 'none');
        showMessaje('logged in', 'orange');

    } else {
        loggedInLinks.forEach(link => link.style.display = 'none');
        loggedOutLinks.forEach(link => link.style.display = 'block');
        showMessaje('logged out', 'orange');

    }
}
