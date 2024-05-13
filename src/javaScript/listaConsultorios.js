// Función para hacer la solicitud al backend y mostrar la lista de pacientes
function mostrarListaConsultorio() {
    fetch('http://localhost:8080/consultorios') // Reemplazar 'URL_DEL_BACKEND/pacientes' con la URL correcta de la API en el backend que proporciona la lista de pacientes ingresados.
      .then(response => response.json())
      .then(data => {
        const tablaBody = document.getElementById('tablaConsultoriosBody');
        tablaBody.innerHTML = ''; // Limpia la tabla antes de llenarla con los datos
  
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
        console.error('Error al obtener datos de consultorios:', error);
      });
  }
  
  // Llamar a la función para mostrar la lista de citas al cargar la página
  mostrarListaConsultorio();
  
  