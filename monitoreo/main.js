let ultimaIdEjecutada = 0; // Variable para almacenar la ID de la última orden ejecutada

const mostrarOrden = async () => {
    try {
        const tagOrden = document.getElementById("lastOrderText");
        const orden = await ultimaOrden();

        // Verificar si la orden recibida es diferente a la última orden ejecutada
        if (orden && orden.id && orden.id !== ultimaIdEjecutada) {
            // Actualizar la ID de la última orden ejecutada
            ultimaIdEjecutada = orden.id;
            // Ejecutar la orden
            processCommand(orden.orden);
        }

        tagOrden.innerText = orden.orden;
    } catch (error) {
        console.error('Error al mostrar la orden:', error);
    }
}

const ultimaOrden = async () => {
    try {
        const json = await obtenerData();
        // Ordenar los datos por ID de manera descendente
        json.sort((a, b) => b.id - a.id);
        // Tomar el primer elemento (última orden)
        const ultimaOrden = json[0];
        return ultimaOrden;
    } catch (error) {
        console.error('Error al obtener la última orden:', error);
        throw error;
    }
}

const obtenerData = async () => {
    try {
        const response = await fetch('https://6614da0e2fc47b4cf27d3ce0.mockapi.io/Tessa', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('No se pudo obtener la respuesta de la API');
        }
        return await response.json();
    } catch (error) {
        console.error('Error al obtener datos:', error);
        throw error;
    }
}

const processCommand = (result) => {
    try {
        const lowerCaseResult = result.toLowerCase();
        const controlTexto = document.getElementById("lastOrderText");

    switch (true) {
        case lowerCaseResult.includes("encender la luz de la recámara"):
            controlTexto.innerText = "Encender la luz de la recámara";
            toggleLightImage('luzSala', 'img/on.png');
            break;
        case lowerCaseResult.includes("apagar la luz de la recámara"):
            controlTexto.innerText = "Apagar la luz de la recámara";
            toggleLightImage('luzSala', 'img/off.png');
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
    } catch (error) {
        console.error('Error al procesar el comando:', error);
    }
};

const toggleLightImage = (elementId, imageName) => {
    try {
        const imageElement = document.getElementById(elementId);
        if (imageElement) {
            imageElement.src = imageName;
        } else {
            console.error(`Elemento con ID ${elementId} no encontrado`);
        }
    } catch (error) {
        console.error('Error al cambiar la imagen:', error);
    }
};

// Iniciar la función para mostrar la orden y establecer la frecuencia de actualización
mostrarOrden();
setInterval(mostrarOrden, 1000); // Actualizar cada 1 segundo