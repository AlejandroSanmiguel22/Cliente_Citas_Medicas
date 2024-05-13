document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('buscarCitaForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var identificacion = document.getElementById('identificacion').value;

    fetch(`https://gestioncitasmedicas-production.up.railway.app/citas/${identificacion}`)
      .then(response => response.json())
      .then(data => {
        console.log('Datos recibidos del backend:', data);
        mostrarResultado(data);
      })
      .catch(error => {
        console.error('Error al buscar cita:', error);
      });
  });
});

function mostrarResultado(data) {
  if (data) {
    console.log('Cita encontrada:', data);
    window.location.href = '/src/modificarCitaForm.html?id=' + data.numeroIdentificacion;
  } else {
    console.log('La cita no fue encontrada');
  }
}