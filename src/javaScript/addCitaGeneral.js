document.getElementById('myForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita que el formulario se envíe automáticamente
  
  // Captura los valores de los campos del formulario
  var identificacion = document.getElementById('identificacion').value;
  var nombre = document.getElementById('nombre').value;
  var fecha = document.getElementById('fecha').value;
  var costo = document.getElementById('costo').value;
  var generalista = document.getElementById('generalista').value;
  var observaciones = document.getElementById('observaciones').value;
  
  // Crea un objeto JSON con los datos capturados
  var data = {
    numeroIdentificacion: identificacion,
    nombrePaciente: nombre,
    fecha: fecha,
    costo: costo,
    tipoCita: 'General',
    nombreGeneralista: generalista,
    observacion: observaciones
  };
  
  // Convierte el objeto JSON a una cadena
  var jsonData = JSON.stringify(data);
  
  // Envía los datos al backend utilizando fetch()
  fetch('https://gestioncitasmedicas-production.up.railway.app/citas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: jsonData
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al enviar los datos al servidor');
    }
    return response.json();
  })
  .then(data => {
    // Maneja la respuesta del servidor si es necesario
    console.log('Respuesta del servidor:', data);
    // Vacía los campos de texto después de que la solicitud sea exitosa
    document.getElementById('identificacion').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('fecha').value = '';
    document.getElementById('costo').value = '';
    document.getElementById('generalista').value = '';
    document.getElementById('observaciones').value = '';
    // Redirecciona a la página de asignar consultorio con el ID de la cita en la URL
    window.location.href = `../src/asignarConsultorio.html?idCita=${data.numeroIdentificacion}`;
})

  .catch(error => {
    console.error('Error:', error);
  });
});
