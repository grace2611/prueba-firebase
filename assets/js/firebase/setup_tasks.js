// Importación de funciones relacionadas con Firebase
import {
    onGetTasks,
    saveTask,       // Parte del CREAR
    deleteTask,     // Parte del ELIMINAR
    getTask,
    updateTask,     // Parte del EDITAR
    getTasks,
} from "./firebase.js";

// Obtención de elementos del DOM
const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container");

// Variables de estado para el modo de edición
let editStatus = false;
let id = "";

// Evento que se ejecuta cuando se carga la página
window.addEventListener("DOMContentLoaded", async (e) => {
    // Llamada a la función que obtiene las tareas y las muestra en el contenedor
    onGetTasks((querySnapshot) => {
        // Limpia el contenedor antes de agregar las tareas
        tasksContainer.innerHTML = "";

        // Itera sobre las tareas y las agrega al contenedor
        querySnapshot.forEach((doc) => {
            const task = doc.data();

            tasksContainer.innerHTML += `
                <div class="card card-body mt-2 border-primary">
                    <h3 class="h5 text-dark">${task.title}</h3>
                    <p class="text-dark">${task.description}</p>
                    <div>
                        <button class="btn btn-danger btn-delete" data-id="${doc.id}">
                            🗑 Eliminar
                        </button>
                        <button class="btn btn-primary btn-edit" data-id="${doc.id}">
                            🖉 Editar
                        </button>
                    </div>
                </div>`;
        });

        // Asigna eventos a los botones de eliminar y editar en cada tarea
        const btnsDelete = tasksContainer.querySelectorAll(".btn-delete");
        btnsDelete.forEach((btn) =>
            btn.addEventListener("click", async ({ target: { dataset } }) => {
                try {
                    // Llamada a la función de eliminación
                    await deleteTask(dataset.id); // Parte del ELIMINAR
                } catch (error) {
                    console.log(error);
                }
            })
        );

        const btnsEdit = tasksContainer.querySelectorAll(".btn-edit");
        btnsEdit.forEach((btn) => {
            btn.addEventListener("click", async (e) => {
                try {
                    // Obtención de la tarea para editar y actualización del formulario
                    const doc = await getTask(e.target.dataset.id);
                    const task = doc.data();
                    taskForm["task-title"].value = task.title;
                    taskForm["task-description"].value = task.description;

                    // Configuración del modo de edición
                    editStatus = true;
                    id = doc.id;
                    taskForm["btn-task-form"].innerText = "Actualizar";
                } catch (error) {
                    console.log(error);
                }
            });
        });
    });
});

// Evento que se ejecuta al enviar el formulario
taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Obtención de valores del formulario
    const title = taskForm["task-title"];
    const description = taskForm["task-description"];

    try {
        if (!editStatus) {
            // Si no está en modo de edición, crea una nueva tarea
            await saveTask(title.value, description.value); // Parte del CREAR
            //en cambio si es verdadero= esta en modo edición
        } else {
            // Si está en modo de edición, actualiza la tarea existente
            await updateTask(id, {
                title: title.value,
                description: description.value,
            });

            // Restablece variables de estado y texto del botón para crear tarea
            editStatus = false;  // Sale del modo de edición
            id = "";  // Limpia el ID de la tarea en edición
            taskForm["btn-task-form"].innerText = "Guardar";  // Cambia el texto del botón
        }

        // Reinicio del formulario y enfoque en el campo de título
        taskForm.reset();
        title.focus();
    } catch (error) {
        // Manejo de excepciones en caso de error durante la creación o actualización de tareas
        console.error("Error:", error);
    }
});
