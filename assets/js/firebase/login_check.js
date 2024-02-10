const loggedOutLinks = document.querySelectorAll('logged-out')
const loggednLinks = document.querySelectorAll('logged-in')
I
export const loginCheck = user => {
    //Si el usuario existe oculto los botones necesarios
    if (user){
        loggedInLinks.forEach(link => link.styles.display = 'block');
        loggedOutLinks.forEach(link => link.styles.display = 'none');
    }
    else {        
        loggedOutLinks.forEach(link => link.styles.display = 'none');
        loggedInLinks.forEach(link => link.styles.display = 'block');
    }
}