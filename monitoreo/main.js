let ultimaIdEjecutada = 0; // Variable para almacenar la ID de la última orden ejecutada

const mostrarOrden = async () => {
    const tagOrden = document.getElementById("lastOrderText");
    const orden = await ultimaOrden();
    
    // Verificar si la ID de la orden recibida es diferente a la ID de la última orden ejecutada
    if (orden.id !== ultimaIdEjecutada) {
        // Actualizar la ID de la última orden ejecutada
        ultimaIdEjecutada = orden.id;
        // Ejecutar la orden
        processCommand(orden.ingresos);
    }
    
    tagOrden.innerText = orden.ingresos;
}

const ultimaOrden = async () => {
    const json = await obtenerData();

    // Encontrar la ID más alta
    let ultimaId = 0;
    json.forEach(item => {
        if (parseInt(item.id) > ultimaId) {
            ultimaId = parseInt(item.id);
        }
    });

    // Encontrar el registro con la ID más alta
    const ultimaOrden = json.find(item => parseInt(item.id) === ultimaId);

    // Retornar el registro completo
    return ultimaOrden;
}

mostrarOrden();

setInterval(mostrarOrden, 1000); // Reinicia cada 1 segundo

async function obtenerData() {
    return new Promise((resolve, reject) => {
        fetch('https://6614da0e2fc47b4cf27d3ce0.mockapi.io/Tessa', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener la respuesta de la API');
            }
            return response.json();
        })
        .then(data => {
            resolve(data);
        })
        .catch(error => {
            console.error('Error al obtener datos:', error);
            reject(error);
        });
    });
}

const processCommand = (result) => {
    let lowerCaseResult = result.toLowerCase();
    const controlTexto = document.getElementById("lastOrderText"); 

    switch (true) {
        case lowerCaseResult.includes("enciende la luz de la sala"):
            controlTexto.innerText = "Enciende la luz de la sala";
            toggleLightImage('luzSala', 'on.png');
            break;
        case lowerCaseResult.includes("apaga la luz de la sala"):
            controlTexto.innerText = "Apaga la luz de la sala";
            toggleLightImage('luzSala', 'off.png');
            break;
        case lowerCaseResult.includes("enciende las luces del jardín"):
            controlTexto.innerText = "Enciende las luces del jardín";
            toggleLightImage('lucesJardin', 'on.png');
            break;
        case lowerCaseResult.includes("apaga las luces del jardín"):
            controlTexto.innerText = "Apaga las luces del jardín";
            toggleLightImage('lucesJardin', 'off.png');
            break;
        case lowerCaseResult.includes("enciende el ventilador"):
            controlTexto.innerText = "Enciende el ventilador";
            toggleLightImage('ventilador', 'on.png');
            break;
        case lowerCaseResult.includes("apaga el ventilador"):
            controlTexto.innerText = "Apaga el ventilador";
            toggleLightImage('ventilador', 'off.png');
            break;
        case lowerCaseResult.includes("abre las cortinas"):
            controlTexto.innerText = "Abre las cortinas";
            toggleCurtainsImage('cortinas', 'abiertas.png');
            break;
        case lowerCaseResult.includes("cierra las cortinas"):
            controlTexto.innerText = "Cierra las cortinas";
            toggleCurtainsImage('cortinas', 'cerradas.png');
            break;
        case lowerCaseResult.includes("activa la alarma de la casa"):
            controlTexto.innerText = "Activa la alarma de la casa";
            playAlarmSound('activada.mp3');
            break;
        case lowerCaseResult.includes("desactiva la alarma de la casa"):
            controlTexto.innerText = "Desactiva la alarma de la casa";
            playAlarmSound('desactivada.mp3');
            break;            
        case lowerCaseResult.includes("enciende las cámaras de seguridad"):
            controlTexto.innerText = "Enciende las cámaras de seguridad";
            toggleCamerasImage('camaras', 'encendidas.png');
            break;
        case lowerCaseResult.includes("apaga las cámaras de seguridad"):
            controlTexto.innerText = "Apaga las cámaras de seguridad";
            toggleCamerasImage('camaras', 'apagadas.png');
            break;
        default:
            controlTexto.innerText = "Comando no reconocido";
            break;
    }
};

const toggleLightImage = (elementId, imageName) => {
    const imageElement = document.getElementById(elementId);
    imageElement.src = imageName;
};
