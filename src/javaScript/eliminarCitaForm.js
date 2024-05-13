document.addEventListener('DOMContentLoaded', function () {
    // Obtener el valor del parámetro "id" de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const citaId = urlParams.get('id');
    
    // Realizar una solicitud al backend para obtener los detalles de la cita a modificar
    fetch(`https://gestioncitasmedicas-production.up.railway.app/citas/${citaId}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error al obtener los detalles de la cita');
            }
        })
        .then(data => {
            // Rellenar los campos del formulario con los detalles de la cita obtenidos
            document.getElementById('identificacion').value = data.numeroIdentificacion;
            document.getElementById('nombrePaciente').value = data.nombrePaciente;
            document.getElementById('fecha').value = data.fecha;
            document.getElementById('costo').value = data.costo;
            document.getElementById('generalista').value = data.nombreGeneralista;
            document.getElementById('observaciones').value = data.observacion;
        })
        .catch(error => {
            console.error('Error al obtener los detalles de la cita:', error);
        });

    // Agregar un evento de escucha al formulario
    document.getElementById('myForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        // Obtener los valores de los campos del formulario
        const identificacion = document.getElementById('identificacion').value;
        const nombrePaciente = document.getElementById('nombrePaciente').value;
        const fecha = document.getElementById('fecha').value;
        const costo = document.getElementById('costo').value;
        const nombreGeneralista = document.getElementById('generalista').value;
        const observacion = document.getElementById('observaciones').value;

        // Crear el objeto con los datos de la cita a eliminar
        const citaEliminada = {
            numeroIdentificacion: identificacion,
            nombrePaciente: nombrePaciente,
            fecha: fecha,
            costo: costo,
            nombreGeneralista: nombreGeneralista,
            observacion: observacion,
            tipoCita: 'General' 
        };

        // Realizar una solicitud al backend para eliminar la cita
        fetch(`https://gestioncitasmedicas-production.up.railway.app/citas/${citaId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(citaEliminada)
        })
        .then(response => {
            if (response.ok) {
                console.log('Cita eliminada exitosamente');
                // Limpiar los campos de texto después de una eliminación exitosa
                limpiarCampos();
                // Redirigir a otra página o realizar alguna acción adicional si es necesario
            } else {
                throw new Error('Error al eliminar la cita');
            }
        })
        .catch(error => {
            console.error('Error al eliminar la cita:', error);
        });
        
        // Función para limpiar los campos de texto
        function limpiarCampos() {
            document.getElementById('identificacion').value = "";
            document.getElementById('nombrePaciente').value = "";
            document.getElementById('fecha').value = "";
            document.getElementById('costo').value = "";
            document.getElementById('generalista').value = "";
            document.getElementById('observaciones').value = "";
        }
    });
});