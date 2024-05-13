// Función para obtener los datos del servidor
function obtenerDatosDelServidor() {
    fetch('URL_DEL_ENDPOINT') // Reemplaza 'URL_DEL_ENDPOINT' con la URL de tu endpoint en Spring Boot
        .then(response => response.json())
        .then(data => {
            // Actualizar los campos con los datos recibidos
            document.getElementById('totalGeneral').value = data.totalGeneral;
            document.getElementById('totalEspecialista').value = data.totalEspecialista;
            document.getElementById('costoTotal').value = data.costoTotal;
        })
        .catch(error => console.error('Error al obtener los datos:', error));
}

// Llamar a la función para obtener los datos al cargar la página
document.addEventListener('DOMContentLoaded', obtenerDatosDelServidor);