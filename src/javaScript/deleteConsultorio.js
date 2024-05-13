document.addEventListener('DOMContentLoaded', function() {
    // Coloca aquí tu código JavaScript
    document.getElementById('eliminarConsultorioForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        var numeroConsultorio = document.getElementById('numeroConsultorio').value;
        //Necesito lo del back
        fetch(`http://localhost:8080/consultorios/${numeroConsultorio}`)
        .then(response => response.json())
        .then(data => {
            // Maneja los datos recibidos del backend aquí
            console.log('Datos recibidos del backend:', data);
            mostrarResultado(data);
        })
        .catch(error => {
            console.error('Error al buscar consultorio:', error);
        });
    });
});

function mostrarResultado(data) {
    if (data) {
        console.log('Consultorio encontrado:', data);
        // Redirige al usuario al formulario de modificación de cita con los detalles de la cita cargados en él
        window.location.href = '/src/eliminarConsultorioForm.html?id=' + data.id;

    } else {
        console.log('El consultorio no fue encontrado');
    }
}



