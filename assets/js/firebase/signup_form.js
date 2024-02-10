import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js"
import { auth } from './firebase.js';
import { showMessaje } from "./show_message.js";
//Obtenemos el form con ese Id
const signupForm = document.getElementById('signup-form');
console.log(signupForm);

//Agregamos el evento al mandar el form
signupForm.addEventListener('submit', async (e) => {
    //Para prevenir que la página se recargue
    e.preventDefault();

    //Accedemos a los elementos con 
    const email = signupForm['email-signup'].value;
    const password = signupForm['password-signup'].value;

    console.log(email, password);

try {
    //Obtener las credennciales de forma asincrona
    const credentials = await createUserWithEmailAndPassword(auth, email, password)
    console.log(credentials)
    const signupModal = document.getElementById('signup-modal');
    const modal = bootstrap.Modal.getInstance(signupModal);
    modal.hide();
}
//Manejo de errores
catch (error) {
    console.log(error)

    if(error.code === 'auth/email-alredy-in-use') {
       showMessaje('Email alredy in use', 'red');
    }
    else if(error.code === 'auth/invalid-email') {
        showMessaje('invalid-email', 'red');
    }
    else if(error.code === 'auth/weak-password') {
        showMessaje('weak-password', 'red');
    }
    else {
        showMessaje('Something went wrong', 'red');
    }
}
});
