document.addEventListener('DOMContentLoaded', function() {
    // Coloca aquí tu código JavaScript
    document.getElementById('buscarCitaForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        var identificacion = document.getElementById('identificacion').value;
        //Necesito lo del back
        fetch(`https://gestioncitasmedicas-production.up.railway.app/citas/${identificacion}`)
        .then(response => response.json())
        .then(data => {
            // Maneja los datos recibidos del backend aquí
            console.log('Datos recibidos del backend:', data);
            mostrarResultado(data);
        })
        .catch(error => {
            console.error('Error al buscar cita:', error);
        });
    });
});

function mostrarResultado(data) {
    if (data) {
        console.log('Cita encontrada:', data);
        // Redirige al usuario al formulario de modificación de cita con los detalles de la cita cargados en él
        window.location.href = '/src/eliminarCitaForm.html?id=' + data.numeroIdentificacion;

    } else {
        console.log('La cita no fue encontrada');
    }
}



