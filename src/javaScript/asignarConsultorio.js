document.getElementById('guardar').addEventListener('click', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente
    
    // Captura el valor del número de consultorio
    var consultorioId = document.getElementById('consultorio').value;

    // Captura el ID de la cita de la URL
    var urlParams = new URLSearchParams(window.location.search);
    var citaId = urlParams.get('idCita');

    // Verifica que el consultorioId no esté vacío
    if (!consultorioId.trim()) {
        console.error('El número del consultorio no puede estar vacío.');
        return;
    }

    // Verifica que el citaId no esté vacío
    if (!citaId.trim()) {
        console.error('El ID de la cita no puede estar vacío.');
        return;
    }

    // Llama a la función para asignar el consultorio a la cita
    asignarConsultorioACita(citaId, consultorioId);
});

function asignarConsultorioACita(citaId, consultorioId) {
    fetch(`http://localhost:8080/consultorios/${consultorioId}/asignar-cita?idCita=${citaId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            console.log(`Consultorio ${consultorioId} asignado a la cita ${citaId} correctamente.`);
            // Redirige a la página de lista de citas después de asignar el consultorio
            window.location.href = "/src/listaCitas.html";
        } else {
            console.error('Error al asignar el consultorio a la cita.');
        }
    })
    .catch(error => {
        console.error('Error al realizar la asignación:', error);
    });
}


