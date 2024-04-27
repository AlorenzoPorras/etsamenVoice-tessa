document.addEventListener('DOMContentLoaded', function () {
    // Obtener referencias a los elementos HTML necesarios
    const orderResultDiv = document.getElementById('orderResult');

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
                if (result.includes("tessa")) {
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
    const processCommand = (result) => {
        // Procesar cada comando específico
        if (result.includes("enciende la luz de la recámara")) {
            orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
            // Cambiar la imagen de la luz de la recámara a encendida
            document.getElementById('imagenRecamara').src = 'luz_encendida.jpg';
            insertarJson("Encender la luz de la recámara");
        } else if (result.includes("apaga la luz de la recámara")) {
            orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
            // Cambiar la imagen de la luz de la recámara a apagada
            document.getElementById('imagenRecamara').src = 'luz_apagada.jpg';
            insertarJson("Apagar la luz de la recámara");
            
        } else if (result.includes("enciende la luz de la sala")) {
            orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
            // Cambiar la imagen de la luz de la sala a encendida
            document.getElementById('imagenSala').src = 'luz_encendida.jpg';
            insertarJson("Encender la luz de la sala");
        } else if (result.includes("apaga la luz de la sala")) {
            orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
            // Cambiar la imagen de la luz de la sala a apagada
            document.getElementById('imagenSala').src = 'luz_apagada.jpg';
            insertarJson("Apagar la luz de la sala");

        } else if (result.includes("enciende las luces del jardín")) {
            orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
            // Cambiar la imagen de las luces del jardín a encendidas
            document.getElementById('imagenJardin').src = 'luces_encendidas.jpg';
            insertarJson("Encender las luces del jardín");
        } else if (result.includes("apaga las luces del jardín")) {
            orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
            // Cambiar la imagen de las luces del jardín a apagadas
            document.getElementById('imagenJardin').src = 'luces_apagadas.jpg';
            insertarJson("Apagar las luces del jardín");

        } else if (result.includes("enciende el ventilador")) {
            orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
            // Cambiar la imagen del ventilador a encendido
            document.getElementById('imagenVentilador').src = 'ventilador_encendido.jpg';
            insertarJson("Encender el ventilador");
        } else if (result.includes("apaga el ventilador")) {
            orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
            // Cambiar la imagen del ventilador a apagado
            document.getElementById('imagenVentilador').src = 'ventilador_apagado.jpg';
            insertarJson("Apagar el ventilador");

        } else if (result.includes("abre las cortinas")) {
            orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
            // Cambiar la imagen de las cortinas a abiertas
            document.getElementById('imagenCortinas').src = 'cortinas_abiertas.jpg';
            insertarJson("Abrir las cortinas");
        } else if (result.includes("cierra las cortinas")) {
            orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
            // Cambiar la imagen de las cortinas a cerradas
            document.getElementById('imagenCortinas').src = 'cortinas_cerradas.jpg';
            insertarJson("Cerrar las cortinas");

        } else if (result.includes("activa la alarma de la casa")) {
            orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
            // Cambiar la imagen de la alarma a activada
            document.getElementById('imagenAlarma').src = 'alarma_activada.jpg';
            insertarJson("Activar la alarma de la casa");
        } else if (result.includes("desactiva la alarma de la casa")) {
            orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
            // Cambiar la imagen de la alarma a desactivada
            document.getElementById('imagenAlarma').src = 'alarma_desactivada.jpg';
            insertarJson("Desactivar la alarma de la casa");

        } else if (result.includes("enciende las cámaras de seguridad")) {
            orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
            // Cambiar la imagen de las cámaras de seguridad a encendidas
            document.getElementById('imagenCamaras').src = 'camaras_encendidas.jpg';
            insertarJson("Encender las cámaras de seguridad");
        } else if (result.includes("apaga las cámaras de seguridad")) {
            orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
            // Cambiar la imagen de las cámaras de seguridad a apagadas
            document.getElementById('imagenCamaras').src = 'camaras_apagadas.jpg';
            insertarJson("Apagar las cámaras de seguridad");
        }
    };

    // Función para enviar los datos a la API
    function insertarJson(ingresos) {
        return fetch('https://6614da0e2fc47b4cf27d3ce0.mockapi.io/Tessa', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ingresos })
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
