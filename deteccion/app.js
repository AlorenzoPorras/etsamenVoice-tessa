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
            recognition.lang = 'es-ES'; // Establecer el idioma del reconocimiento
            recognition.continuous = false; // No continua automáticamente
            recognition.interimResults = false; // No devuelve resultados intermedios

            recognition.onresult = function (event) {
                const result = event.results[0][0].transcript.toLowerCase();
                console.log('Orden identificada:', result);

                // Verificar si la orden contiene la palabra clave "2B"
                if (result.includes("2b")) {
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
            EnviarOrden(fechaHora, "Encender la luz de la recámara");
        } else if (result.includes("apaga luz de recámara")) {
            orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
            EnviarOrden(fechaHora, "Apagar la luz de la recámara");
        } else if (result.includes("ir a monitoreo")) {
            orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
            window.location.href = '../monitoreo/index.html';
        } else if (result.includes("enciende luz de sala")) {
            orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
            EnviarOrden(fechaHora, "Encender la luz de la sala");
        } else if (result.includes("apaga luz de sala")) {
            orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
            EnviarOrden(fechaHora, "Apagar la luz de la sala");
        } else if (result.includes("enciende luz del jardín")) {
            orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
            EnviarOrden(fechaHora, "Encender las luces del jardín");
        } else if (result.includes("apaga luz del jardín")) {
            orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
            EnviarOrden(fechaHora, "Apagar las luces del jardín");
        } else if (result.includes("enciende el ventilador")) {
            orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
            EnviarOrden(fechaHora, "Encender el ventilador");
        } else if (result.includes("apaga el ventilador")) {
            orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
            EnviarOrden(fechaHora, "Apagar el ventilador");
        } else if (result.includes("abre las cortinas")) {
            orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
            EnviarOrden(fechaHora, "Abrir las cortinas");
        } else if (result.includes("cierra las cortinas")) {
            orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
            EnviarOrden(fechaHora, "Cerrar las cortinas");
            
        } else if (result.includes("activa la alarma")) {
            orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
            EnviarOrden(fechaHora, "Activar la alarma de la casa");
        } else if (result.includes("desactiva la alarma")) {
            orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
            EnviarOrden(fechaHora, "Desactivar la alarma de la casa");
        } else if (result.includes("enciende las cámaras")) {
            orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
            EnviarOrden(fechaHora, "Encender las cámaras de seguridad");
        } else if (result.includes("apaga las cámaras")) {
            orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
            EnviarOrden(fechaHora, "Apagar las cámaras de seguridad");
        }
    }

    // Función para obtener la fecha y hora actual en México
    function obtenerFechaHoraMexico() {
        const fechaHoraActual = new Date();
        const options = { timeZone: 'America/Mexico_City' };
        return fechaHoraActual.toLocaleString('es-MX', options);
    }

    // Función para obtener el último usuario registrado y enviar la orden
    function EnviarOrden(fechaHora, orden) {
        fetch('https://6614da0e2fc47b4cf27d3ce0.mockapi.io/Tessa', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos');
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
                throw new Error('Error al subir');
            }
            return response.json();
        })
        .then(data => console.log('Subido exitosamente:', data))
        .catch(error => console.error('Error:', error));
    }

    // Iniciar el ciclo de reconocimiento de voz automáticamente
    startRecognition();
});
