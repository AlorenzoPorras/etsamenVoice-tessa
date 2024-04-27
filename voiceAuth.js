let recognition;
const validPINs = {
    "0071": "Adriel E.",
    "4401": "Victor P."
};

const url = 'https://6614da0e2fc47b4cf27d3ce0.mockapi.io/Tessa';

window.onload = function() {
    if (!('webkitSpeechRecognition' in window)) {
        document.getElementById('error').textContent = 'Tu navegador no soporta el reconocimiento de voz. Intenta con Google Chrome.';
        return;
    }

    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'es-ES';

    recognition.onresult = function(event) {
        const speechResult = event.results[0][0].transcript.trim();
        document.getElementById('status').textContent = `PIN detectado: ${speechResult}`;
        
        if (Object.keys(validPINs).includes(speechResult)) {
            const user = validPINs[speechResult];
            document.getElementById('status').textContent += ` - PIN correcto. Usuario: ${user}. Redirigiendo...`;
            setTimeout(() => window.location.href = 'controlPanel.html', 2000);

            // Subir la información del usuario a la API
            const mexicoCityTime = new Date().toLocaleString("es-MX", {timeZone: "America/Mexico_City", hour12: true});
            const data = {
                "user": user,
                "fecha-hora": mexicoCityTime,
                "id": "1",
                "order": ""  // Asignar una cadena vacía al campo "order"
            };
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        } else {
            document.getElementById('error').textContent = 'PIN incorrecto. Inténtalo de nuevo.';
        }
    };


    recognition.onerror = function(event) {
        document.getElementById('error').textContent = `Error en el reconocimiento de voz: ${event.error}`;
    };

    let synth = window.speechSynthesis;

    function speak() {
        let utterance = new SpeechSynthesisUtterance(textToSay);
        
        // Configura la voz deseada
        let voices = synth.getVoices();
        let spanishVoice = voices.find(voice => voice.name === 'Español (EE.UU.) Premium' && voice.lang === 'es-US-Wavenet-A');
        if (spanishVoice) {
            utterance.voice = spanishVoice;
        } else {
            console.log("Voz 'es-US-Wavenet-A' no encontrada. Se usará la voz predeterminada.");
        }

        // Reproduce el mensaje de voz
        synth.speak(utterance);
    }

    if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = speak;
    } else {
        speak();
    }
}

function startRecognition() {
    recognition.start();
    document.getElementById('status').textContent = 'Escuchando...';
    document.getElementById('error').textContent = '';
}
