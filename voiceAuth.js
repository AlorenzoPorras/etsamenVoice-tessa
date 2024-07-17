let recognition;
const validPINs = {
    "2271": "Adriel E. Lorenzo",
    "4401": "Victor M. Pinedo"
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
    //recognition.lang = 'en-US';

    recognition.onresult = function(event) {
        const speechResult = event.results[0][0].transcript.trim();
        document.getElementById('status').textContent = `PIN detectado: ${speechResult}`;
        
        if (validPINs.hasOwnProperty(speechResult)) {
            const user = validPINs[speechResult];
            document.getElementById('status').textContent += ` - PIN correcto. Usuario: ${user}. Redirigiendo...`;
            setTimeout(() => window.location.href = 'deteccion/index.html', 2000);

            const mexicoCityTime = new Date().toLocaleString("es-MX", {timeZone: "America/Mexico_City", hour12: true});
            const data = {
                "user": user,
                "fecha-hora": mexicoCityTime,
                "id": "1",
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

    initSpeechSynthesis();
}

function initSpeechSynthesis() {
    let synth = window.speechSynthesis;
    let voicesLoaded = false;

    function speak() {
        if (!voicesLoaded) {
            console.log("Las voces aún no están cargadas.");
            return;
        }
        
        let utterance = new SpeechSynthesisUtterance(textToSay);
        
        let voices = synth.getVoices();
        let spanishVoice = voices.find(voice => voice.lang === 'es-ES' || voice.lang.startsWith('es-'));
        if (spanishVoice) {
            utterance.voice = spanishVoice;
            console.log("Usando la voz:", spanishVoice.name);
        } else {
            console.log("Voz española no encontrada. Se usará la voz predeterminada.");
        }

        synth.speak(utterance);
    }

    synth.onvoiceschanged = function() {
        voicesLoaded = true;
        speak();
    };

    if (synth.getVoices().length !== 0) {
        voicesLoaded = true;
    }
}

function startRecognition() {
    recognition.start();
    document.getElementById('status').textContent = 'Escuchando...';
    document.getElementById('error').textContent = '';
    initSpeechSynthesis();
}
