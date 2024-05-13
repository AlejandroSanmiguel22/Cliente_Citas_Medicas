document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente
    
    // Captura los valores de los campos del formulario
    var identificacion = document.getElementById('identificacion').value;
    var nombre = document.getElementById('nombre').value;
    var fecha = document.getElementById('fecha').value;
    var costo = document.getElementById('costo').value;
    var especialidad = document.getElementById('especialidad').value;
    var especialista = document.getElementById('especialista').value;
    
    // Crea un objeto JSON con los datos capturados
    var data = {
      identificacion: identificacion,
      nombre: nombre,
      fecha: fecha,
      costo: costo,
      especialidad: especialidad,
      especialista: especialista
    };
    
    // Convierte el objeto JSON a una cadena
    var jsonData = JSON.stringify(data);
    
    // Envía los datos al backend utilizando fetch() ; necesito lo del back
    fetch('url_del_backend', {
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
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });
  