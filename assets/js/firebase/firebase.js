import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js"
import {
    getFirestore,
    collection,
    doc,
    addDoc,
    getDocs,
    deleteDoc,
    onSnapshot,
    //Obtener una unica tarea para el edit
    getDoc,
    updateDoc,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAdzzFZitw1GRNl-2R6A9TNCFjn6k7HH7Y",
  authDomain: "primer-firebase-2024.firebaseapp.com",
  projectId: "primer-firebase-2024",
  storageBucket: "primer-firebase-2024.appspot.com",
  messagingSenderId: "954438129290",
  appId: "1:954438129290:web:8ab6f3f790aaaf1df7bf73",
  measurementId: "G-E8Q5HQGZ48"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)

// Funciones del CRUD

/**
 * Guarda una nueva tarea en Firestore
 * @param {string} title - El título de la tarea
 * @param {string} description - La descripción de la tarea
 */
export const saveTask = (title, description) =>
  addDoc(collection(db, "tasks"), { title, description });

/**
 * Obtiene todas las tareas y ejecuta una función de retorno de llamada
 * @param {function} callback - Función de retorno de llamada para manejar los datos obtenidos
 */
export const onGetTasks = (callback) =>
  onSnapshot(collection(db, "tasks"), callback);

/**
 * Elimina una tarea específica de Firestore
 * @param {string} id - ID de la tarea a eliminar
 */
export const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

/**
 * Obtiene los detalles de una tarea específica
 * @param {string} id - ID de la tarea
 */
export const getTask = (id) => getDoc(doc(db, "tasks", id));

/**
 * Actualiza una tarea específica en Firestore
 * @param {string} id - ID de la tarea a actualizar
 * @param {object} newFields - Nuevos campos y valores para actualizar la tarea
 */
export const updateTask = (id, newFields) => updateDoc(doc(db, "tasks", id), newFields);

/**
 * Obtiene todas las tareas almacenadas en Firestore
 */
export const getTasks = () => getDocs(collection(db, "tasks"));
