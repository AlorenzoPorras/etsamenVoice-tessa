let recognition;
const validPIN = "1234"; // PIN de ejemplo, debería ser dinámico o verificado contra una base de datos en un entorno real.

window.onload = function() {
    // Comprobar compatibilidad del navegador
    if (!('webkitSpeechRecognition' in window)) {
        document.getElementById('error').textContent = 'Tu navegador no soporta el reconocimiento de voz. Intenta con Google Chrome.';
        return;
    }

    // Configuración del reconocimiento de voz
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false; // Se detiene automáticamente después de escuchar
    recognition.interimResults = false; // No queremos resultados intermedios
    recognition.lang = 'es-ES'; // Configuración del idioma español

    // Eventos del reconocimiento de voz
    recognition.onresult = function(event) {
        const speechResult = event.results[0][0].transcript.trim();
        document.getElementById('status').textContent = `PIN detectado: ${speechResult}`;
        
        // Validación del PIN
        if (speechResult === validPIN) {
            document.getElementById('status').textContent += ' - PIN correcto. Redirigiendo...';
            // Aquí podrías redirigir al usuario a otra página o desbloquear funcionalidades.
            setTimeout(() => window.location.href = 'controlPanel.html', 2000); // Redirigir después de 2 segundos
        } else {
            document.getElementById('error').textContent = 'PIN incorrecto. Inténtalo de nuevo.';
        }
    };

    recognition.onerror = function(event) {
        document.getElementById('error').textContent = `Error en el reconocimiento de voz: ${event.error}`;
    };
}

function startRecognition() {
    recognition.start(); // Inicia el reconocimiento de voz
    document.getElementById('status').textContent = 'Escuchando...';
    document.getElementById('error').textContent = '';
}
