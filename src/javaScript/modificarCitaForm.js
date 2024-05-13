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
            document.getElementById('citaId').value = citaId; // Asignar el valor de citaId al campo oculto citaId
            document.getElementById('consultorioAsignado').value = data.idConsultorio; // Asignar el valor de idConsultorio al campo oculto consultorioAsignado
        })
        .catch(error => {
            console.error('Error al obtener los detalles de la cita:', error);
        });

    const myForm = document.getElementById('myForm');

    myForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Obtener los valores de los campos del formulario
        const identificacion = document.getElementById('identificacion').value;
        const nombrePaciente = document.getElementById('nombrePaciente').value;
        const fecha = document.getElementById('fecha').value;
        const costo = document.getElementById('costo').value;
        const generalista = document.getElementById('generalista').value;
        const observaciones = document.getElementById('observaciones').value;
        const citaId = document.getElementById('citaId').value;
        const consultorioAsignado = document.getElementById('consultorioAsignado').value;

        // Crear el objeto con los datos de la cita a actualizar
        const citaActualizada = {
            numeroIdentificacion: identificacion,
            nombrePaciente: nombrePaciente,
            fecha: fecha,
            costo: costo,
            nombreGeneralista: generalista,
            observacion: observaciones,
            tipoCita: 'General',
            idConsultorio: consultorioAsignado
        };

        // Realizar una solicitud al backend para actualizar la cita
        fetch(`https://gestioncitasmedicas-production.up.railway.app/citas/${citaId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(citaActualizada)
        })
        .then(response => {
            if (response.ok) {
                console.log('Cita actualizada exitosamente');
                limpiarCampos();
            } else {
                throw new Error('Error al actualizar la cita');
            }
        })
        .catch(error => {
            console.error('Error al actualizar la cita:', error);
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