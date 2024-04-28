document.addEventListener('DOMContentLoaded', function () {
    // Obtener referencias a los elementos HTML necesarios
    const orderResultDiv = document.getElementById('orderResult');
    const usuario = localStorage.getItem('usuarioNombre') || "Usuario Desconocido"; // Obtiene el nombre del usuario desde localStorage
    const fechaHora = obtenerFechaHoraMexico();

    // Función para iniciar el reconocimiento de voz
    const startRecognition = () => {
        // Verificar si el navegador es compatible con el reconocimiento de voz
        if ('webkitSpeechRecognition' in window) {
            // Crear una nueva instancia de reconocimiento de voz
            const recognition = new webkitSpeechRecognition();
            recognition.lang = 'es-ES'; // Establecer el idioma del reconocimiento
            recognition.continuous = false; // No continua automáticamente
            recognition.interimResults = false; // No devuelve resultados intermedios

            recognition.onresult = function (event) {
                const result = event.results[0][0].transcript.toLowerCase();
                console.log('Orden identificada:', result);

                // Verificar si la orden contiene la palabra clave "Tessa"
                if (result.includes("tesa")) {
                    // Procesar la orden identificada
                    processCommand(result);
                }
            };

            recognition.onend = function () {
                // Reiniciar automáticamente el reconocimiento de voz después de 2 segundos o inmediatamente después de procesar un comando
                setTimeout(() => {
                    console.log("Reiniciando el reconocimiento...");
                    recognition.start();
                }, 2000);
            };

            // Iniciar el reconocimiento de voz
            recognition.start();
        } else {
            alert('El reconocimiento de voz no es soportado por este navegador.');
        }
    };

    // Función para procesar la orden identificada por voz
    function processCommand(result) {
        if (result.includes("enciende luz de recámara")) {
            orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
            insertarJson(usuario, fechaHora, "Encender la luz de la recámara");
        } else if (result.includes("apaga luz de recámara")) {
            orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
            insertarJson(usuario, fechaHora, "Apagar la luz de la recámara");
        } else if (result.includes("ir a monitoreo")) {
            orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
            // Redireccionar a la página de monitoreo
            window.location.href = '../monitoreo/index.html';
        }

        // Agrega más condiciones según sea necesario para otros comandos
    }

    // Función para enviar los datos a la API
    function insertarJson(usuario, fechaHora, orden) {
        return fetch('https://6614da0e2fc47b4cf27d3ce0.mockapi.io/Tessa', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usuario, fechaHora, orden })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al subir');
            }
            return response.json();
        })
        .then(data => console.log('Subido exitosamente:', data))
        .catch(error => console.error('Error:', error));
    }

    // Función para obtener la fecha y hora actual en México
    function obtenerFechaHoraMexico() {
        const fechaHoraActual = new Date();
        const options = { timeZone: 'America/Mexico_City' };
        return fechaHoraActual.toLocaleString('es-MX', options);
    }

    // Iniciar el ciclo de reconocimiento de voz automáticamente
    startRecognition();
});
