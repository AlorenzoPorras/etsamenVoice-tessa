// Función para obtener el nombre del usuario del MockAPI y actualizar el mensaje de bienvenida
function updateWelcomeMessage() {
    fetch('https://6614da0e2fc47b4cf27d3ce0.mockapi.io/Tessa')
        .then(response => response.json())
        .then(data => {
            const user = data[0].user; // Supongamos que el nombre de usuario está en la primera posición del array
            const welcomeMessage = document.getElementById('welcomeMessage');
            welcomeMessage.textContent = `Hola ${user} Me presento de nuevo soy 2B.`; // Actualizar el contenido completo
        })
        .catch(error => console.error('Error:', error));
}

// Llamar a la función para actualizar el mensaje de bienvenida
updateWelcomeMessage();
