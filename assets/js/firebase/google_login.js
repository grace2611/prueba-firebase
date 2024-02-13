import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js"// TODO: Add SDKs for Firebase products that you want to use
import { auth } from './firebase.js';
const googleButton = document.getElementById("google-login");

googleButton.addEventListener("click", async () => {
    const provider = new GoogleAuthProvider();

    //Forsar la seleccion de cuenta 
    provider.setCustomParameters({
        prompt: 'select_account',
    });

    try {
        const credentials = await signInWithPopup(auth, provider);

            //Ocultar el modal
            const signinModal = document.getElementById('signin-modal');
            const modal = bootstrap.Modal.getInstance(signinModal);
            //Limpiamos los campos del fom
            modal.hide();
    }
    catch (error){
        console.log(error);
    }
})