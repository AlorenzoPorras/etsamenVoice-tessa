document.addEventListener('DOMContentLoaded', function () {
    // Obtener referencias a los elementos HTML necesarios
    const orderResultDiv = document.getElementById('orderResult');
    const fechaHora = obtenerFechaHoraMexico();

    // Función para iniciar el reconocimiento de voz
    const startRecognition = () => {
        // Verificar si el navegador es compatible con el reconocimiento de voz
        if ('webkitSpeechRecognition' in window) {
            // Crear una nueva instancia de reconocimiento de voz
            const recognition = new webkitSpeechRecognition();
            recognition.lang = 'en-US'; // Establecer el idioma del reconocimiento
            recognition.continuous = false; // No continua automáticamente
            recognition.interimResults = false; // No devuelve resultados intermedios

            recognition.onresult = function (event) {
                const result = event.results[0][0].transcript.toLowerCase();
                console.log('Identified order:', result);

                // Verificar si la orden contiene la palabra clave "2B"
                if (result.includes("2b")) {
                    // Procesar la orden identificada
                    processCommand(result);
                }
            };

            recognition.onend = function () {
                // Reiniciar automáticamente el reconocimiento de voz después de 2 segundos o inmediatamente después de procesar un comando
                setTimeout(() => {
                    console.log("Restarting recognition...");
                    recognition.start();
                }, 2000);
            };

            // Iniciar el reconocimiento de voz
            recognition.start();
        } else {
            alert('Voice recognition is not supported by this browser.');
        }
    };

    // Función para procesar la orden identificada por voz
    function processCommand(result) {
        if (result.includes("turn on bedroom light")) {
            orderResultDiv.innerHTML = `<p>Identified order: <strong>${result}</strong></p>`;
            sendOrder(fechaHora, "Turn on the bedroom light");
        } else if (result.includes("turn off bedroom light")) {
            orderResultDiv.innerHTML = `<p>Identified order: <strong>${result}</strong></p>`;
            sendOrder(fechaHora, "Turn off the bedroom light");

        } else if (result.includes("go to monitoring")) {
            orderResultDiv.innerHTML = `<p>Identified order: <strong>${result}</strong></p>`;
            window.open('https://asdnaindafi1291392312nsd.github.io/examenVoice-2b/', '_blank');

        } else if (result.includes("turn on living room light")) {
            orderResultDiv.innerHTML = `<p>Identified order: <strong>${result}</strong></p>`;
            sendOrder(fechaHora, "Turn on the living room light");
        } else if (result.includes("turn off living room light")) {
            orderResultDiv.innerHTML = `<p>Identified order: <strong>${result}</strong></p>`;
            sendOrder(fechaHora, "Turn off the living room light");
        } else if (result.includes("turn on garden lights")) {
            orderResultDiv.innerHTML = `<p>Identified order: <strong>${result}</strong></p>`;
            sendOrder(fechaHora, "Turn on the garden lights");
        } else if (result.includes("turn off garden lights")) {
            orderResultDiv.innerHTML = `<p>Identified order: <strong>${result}</strong></p>`;
            sendOrder(fechaHora, "Turn off the garden lights");
        } else if (result.includes("turn on the fan")) {
            orderResultDiv.innerHTML = `<p>Identified order: <strong>${result}</strong></p>`;
            sendOrder(fechaHora, "Turn on the fan");
        } else if (result.includes("turn off the fan")) {
            orderResultDiv.innerHTML = `<p>Identified order: <strong>${result}</strong></p>`;
            sendOrder(fechaHora, "Turn off the fan");
        } else if (result.includes("open the curtains")) {
            orderResultDiv.innerHTML = `<p>Identified order: <strong>${result}</strong></p>`;
            sendOrder(fechaHora, "Open the curtains");
        } else if (result.includes("close the curtains")) {
            orderResultDiv.innerHTML = `<p>Identified order: <strong>${result}</strong></p>`;
            sendOrder(fechaHora, "Close the curtains");

        } else if (result.includes("deactivate the alarm")) {
            orderResultDiv.innerHTML = `<p>Identified order: <strong>${result}</strong></p>`;
            sendOrder(fechaHora, "Deactivate the house alarm");

        } else if (result.includes("activate the alarm")) {
            orderResultDiv.innerHTML = `<p>Identified order: <strong>${result}</strong></p>`;
            sendOrder(fechaHora, "Activate the house alarm");

        } else if (result.includes("turn on the cameras")) {
            orderResultDiv.innerHTML = `<p>Identified order: <strong>${result}</strong></p>`;
            sendOrder(fechaHora, "Turn on the security cameras");
        } else if (result.includes("turn off the cameras")) {
            orderResultDiv.innerHTML = `<p>Identified order: <strong>${result}</strong></p>`;
            sendOrder(fechaHora, "Turn off the security cameras");
        }
    }

    // Función para obtener la fecha y hora actual en México
    function obtenerFechaHoraMexico() {
        const fechaHoraActual = new Date();
        const options = { timeZone: 'America/Mexico_City' };
        return fechaHoraActual.toLocaleString('en-US', options);
    }

    // Función para obtener el último usuario registrado y enviar la orden
    function sendOrder(fechaHora, orden) {
        fetch('https://6614da0e2fc47b4cf27d3ce0.mockapi.io/Tessa', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error getting data');
            }
            return response.json();
        })
        .then(data => {
            // Obtener el último usuario registrado
            const ultimoUsuario = data[data.length - 1].user;
            // Enviar la orden con el último usuario
            insertarJson(ultimoUsuario, fechaHora, orden);
        })
        .catch(error => console.error('Error:', error));
    }

    // Función para enviar los datos a la API
    function insertarJson(usuario, fechaHora, orden) {
        return fetch('https://6614da0e2fc47b4cf27d3ce0.mockapi.io/Tessa', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user: usuario, fechaHora, orden })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error uploading');
            }
            return response.json();
        })
        .then(data => console.log('Successfully uploaded:', data))
        .catch(error => console.error('Error:', error));
    }

    // Iniciar el ciclo de reconocimiento de voz automáticamente
    startRecognition();
});
