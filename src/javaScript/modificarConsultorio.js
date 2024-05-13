document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('buscarConsultorioForm').addEventListener('submit', function (event) {
      event.preventDefault();
  
      var consultorio = document.getElementById('consultorio').value;
  
      fetch(`http://localhost:8080/consultorios/${consultorio}`)
        .then(response => response.json())
        .then(data => {
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
      window.location.href = '/src/modificarConsultorioForm.html?id=' + data.id;
    } else {
      console.log('el consultorio no fue encontrada');
    }
  }