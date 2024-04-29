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


const luzRecamara = document.getElementById('luzRecamara')
const luzJardin = document.getElementById('luzJardin')
const luzSala = document.getElementById('luzSala')

const closeCurtains = () => {
    // Cambiar el src a la versión animada del GIF
    cortinas.src = 'img/cortinason.gif';

    // Después de un tiempo, revertir el src a la versión estática
    setTimeout(() => {
        cortinas.src = 'img/cortinasoff.png';
    }, 1000); // Cambia 5000 por el tiempo de duración del GIF en milisegundos
}

const cortinas = document.getElementById('cortinas')
const alarma = document.getElementById('alarma')
const alarmas = document.getElementById('alarmas')
const ventilador = document.getElementById('ventilador')
const camaras = document.getElementById('camaras')

const processCommand = (result) => {
    try {
        
        if ( result === 'Encender la luz de la recámara' ){
            luzRecamara.setAttribute('src', 'img/on.jpg')    
        }
        if ( result === 'Apagar la luz de la recámara' ){
            luzRecamara.setAttribute('src', 'img/off.jpg') 
        }
        if ( result === 'Enciende las luces del jardín' ){
            luzJardin.setAttribute('src', 'img/on.jpg') 
        }
        if ( result === 'Apaga las luces del jardín' ){
            luzJardin.setAttribute('src', 'img/off.jpg') 
        }
        if ( result === 'Enciende el ventilador' ){
            ventilador.setAttribute('src', 'img/ventoff.gif') 
        }
        if ( result === 'Apaga el ventilador' ){
            ventilador.setAttribute('src', 'img/venton.png') 
        }

        if ( result === 'Activa la alarma de la casa' ){
            alarma.setAttribute('src', 'img/alarmaon.gif') 
        }
        if ( result === 'Desactiva la alarma de la casa' ){
            alarma.setAttribute('src', 'img/alarmaoff.png') 
        }
        if ( result === 'Enciende las cámaras de seguridad' ){
            camaras.setAttribute('src', 'img/camera_on.gif') 
        }
        if ( result === 'Apaga las cámaras de seguridad' ){
            camaras.setAttribute('src', 'img/camera_off.png') 
        }
        } catch (error) {
        console.error('Error al procesar el comando:', error);
    
    }
};


// Iniciar la función para mostrar la orden y establecer la frecuencia de actualización
mostrarOrden();
setInterval(mostrarOrden, 1000); // Actualizar cada 1 segundo