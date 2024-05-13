function mostrarListaConsultorios() {
    fetch('http://localhost:8080/consultorios')
        .then(response => response.json())
        .then(data => {
            const tablaBody = document.getElementById('tablaConsultoriosBody');
            tablaBody.innerHTML = ''; // Limpiar la tabla antes de llenarla con los datos
            data.forEach(consultorio => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td class="border px-4 py-2">${consultorio.id}</td>
                    <td class="border px-4 py-2">${consultorio.nombre}</td>
                `;
                tablaBody.appendChild(fila);
            });
        })
        .catch(error => {
            console.error('Error al obtener datos de citas:', error);
        });
  }
  
  // Llamada a la función para mostrar la lista de citas y sus respectivos consultorios
  mostrarListaConsultorios();