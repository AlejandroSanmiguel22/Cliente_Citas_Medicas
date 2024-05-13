document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById('formulario');
    const guardarBtn = document.getElementById('guardar');

    guardarBtn.addEventListener("click", function () {
        const consultorio = document.getElementById('consultorio').value;
        const seccion = document.getElementById('seccion').value;

        // Validar que los campos no estén vacíos
        if (consultorio.trim() === '' || seccion.trim() === '') {
            alert('Por favor, complete todos los campos.');
            return;
        }

        // Crear un objeto con los datos del formulario
        const nuevoConsultorio = {
            id: consultorio,
            nombre: seccion
        };

        //Con fetch api
        fetch('http://localhost:8080/consultorios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoConsultorio)
        })
            .then(response => {
                if (response.ok) {
                    alert('Consultorio guardado exitosamente.');
                    // Limpiar el formulario después de guardar
                    formulario.reset();
                } else {
                    throw new Error('Error al guardar el consultorio.');
                }
            })
            
            .then(nuevoConsultorio => {
                // Maneja la respuesta del servidor si es necesario
                console.log('Respuesta del servidor:', nuevoConsultorio);
                // Vacía los campos de texto después de que la solicitud sea exitosa
                document.getElementById('consultorio').value = '';
                document.getElementById('seccion').value = '';
              })

            .catch(error => {
                console.error('Error:', error);
                alert('Ocurrió un error al guardar el consultorio. Por favor, inténtelo de nuevo.');
            });
    });
});

