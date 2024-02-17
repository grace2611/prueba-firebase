import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
import { getDocs, collection } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"
import { auth, db } from "../js/firebase/firebase.js";
import { loginCheck } from "../js/firebase/loginCheck.js";
import { setupPosts } from "../js/firebase/postList.js";

import './firebase/signupForm.js'
import './firebase/signinForm.js'
import './firebase/googleLogin.js'
import './firebase/facebookLogin.js'
import './firebase/githubLogin.js'
import './firebase/logout.js'
import './firebase/postList.js'
import './firebase/setup_tasks.js'

// lista de cambios de estado de autenticación
onAuthStateChanged(auth, async (user) => 
{
  // Si ha ingresado
  if (user) {
    loginCheck(user);
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));
      setupPosts(querySnapshot.docs);
    } catch (error) {
      console.log(error)
    }
  // Si ha salido
  } else {
    setupPosts([]);
    loginCheck(user);
  }
});