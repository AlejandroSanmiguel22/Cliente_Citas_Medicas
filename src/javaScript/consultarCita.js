function mostrarListaCita() {
    fetch('https://gestioncitasmedicas-production.up.railway.app/citas/todas-las-citas')
        .then(response => response.json())
        .then(data => {
            const tablaBody = document.getElementById('tablaPacientesBody');
            tablaBody.innerHTML = ''; // Limpiar la tabla antes de llenarla con los datos
            data.forEach(cita => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td class="border px-4 py-2">${cita.numeroIdentificacion}</td>
                    <td class="border px-4 py-2">${cita.nombrePaciente}</td>
                    <td class="border px-4 py-2">${cita.fecha}</td>
                    <td class="border px-4 py-2">${cita.tipoCita}</td>
                    <td class="border px-4 py-2">${cita.costo}</td>
                    <td class="border px-4 py-2">${cita.idConsultorio}</td>
  
                `;
                tablaBody.appendChild(fila);
            });
        })
        .catch(error => {
            console.error('Error al obtener datos de citas:', error);
        });
  }
  
  // Llamada a la función para mostrar la lista de citas y sus respectivos consultorios
  mostrarListaCita();