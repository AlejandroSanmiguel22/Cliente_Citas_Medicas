document.addEventListener('DOMContentLoaded', function () {
    // Obtener el valor del parámetro "id" de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const consultorioId = urlParams.get('id');
    
    // Realizar una solicitud al backend para obtener los detalles del consultorio a modificar
    fetch(`http://localhost:8080/consultorios/${consultorioId}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error al obtener los detalles del consultorio');
            }
        })
        .then(data => {
            // Rellenar los campos del formulario con los detalles del consultorio obtenidos
            document.getElementById('numeroConsultorio').value = data.id;
            document.getElementById('seccion').value = data.nombre;
        })
        .catch(error => {
            console.error('Error al obtener los detalles del consultorio:', error);
        });

    // Agregar un evento de escucha al formulario
    document.getElementById('myForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        // Obtener los valores de los campos del formulario
        const numeroConsultorio = document.getElementById('numeroConsultorio').value;
        const seccion = document.getElementById('seccion').value;

        // Crear el objeto con los datos del consultorio a actualizar
        const consultorioActualizado = {
            id: numeroConsultorio,
            nombre: seccion,
        };

        // Realizar una solicitud al backend para actualizar el consultorio
        fetch(`http://localhost:8080/consultorios/${consultorioId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(consultorioActualizado)
        })
        .then(response => {
            if (response.ok) {
                console.log('Consultorio actualizado exitosamente');
                // Limpiar los campos de texto después de una modificación exitosa
                limpiarCampos();
                // Redirigir a otra página o realizar alguna acción adicional si es necesario
            } else {
                throw new Error('Error al actualizar consultorio');
            }
        })
        .catch(error => {
            console.error('Error al actualizar el consultorio:', error);
        });
        
        // Función para limpiar los campos de texto
        function limpiarCampos() {
            document.getElementById('numeroConsultorio').value = "";
            document.getElementById('seccion').value = "";
        }
    });
});
