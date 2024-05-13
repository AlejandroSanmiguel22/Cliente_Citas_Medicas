document.addEventListener("DOMContentLoaded", function () {
    const filtroBtn = document.querySelector(".filtro-btn");
    const filtroContainer = document.querySelector(".opciones");

    filtroContainer.style.display = "none";


    filtroBtn.addEventListener("click", function () {
        if (filtroContainer.style.display === "none") {
            filtroContainer.style.display = "block";
        } else {
            filtroContainer.style.display = "none";
        }
    });

    const btnAceptar = document.getElementById("btnAceptar");
    btnAceptar.addEventListener("click", function () {
        const id = document.getElementById("filtroID").value;
        const nombre = document.getElementById("filtroNombre").value;
        const costoMinimo = document.getElementById("filtroCostoMin").value || 0;
        const costoMaximo = document.getElementById("filtroCostoMax").value;
        const tipoCita = document.getElementById("tipoCita").value;

        const queryParams = new URLSearchParams();
        if (id) queryParams.append('id', id);
        if (nombre) queryParams.append('nombre', nombre);
        if (costoMinimo) queryParams.append('costoMinimo', costoMinimo);
        if (costoMaximo) queryParams.append('costoMaximo', costoMaximo);
        if (tipoCita) queryParams.append('tipo', tipoCita);

        let url = 'http://localhost:8080/citas';
        if (queryParams.toString()) {
            url += '?' + queryParams.toString();
            console.log("IF");
        } else {
            url += '/todas-las-citas';
            console.log("else");
        }

        fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener citas: ' + response.status);
        }
        return response.json();
    })
    .then(citas => {
        // Verificar si las citas son un array y no está vacío
        if (Array.isArray(citas) && citas.length > 0) {
            console.log('Datos recibidos:', citas);

            let tablaHTML = '';
            citas.forEach(cita => {
                tablaHTML += `
                    <tr>
                        <td class="border px-4 py-2">${cita.numeroIdentificacion}</td>
                        <td class="border px-4 py-2">${cita.nombrePaciente}</td>
                        <td class="border px-4 py-2">${cita.fecha}</td>
                        <td class="border px-4 py-2">${cita.tipoCita}</td>
                        <td class="border px-4 py-2">${cita.costo}</td>
                        <td class="border px-4 py-2">${cita.idConsultorio}</td>
                    </tr>
                `;
            });
            console.log('HTML de la tabla:', tablaHTML);
            window.parent.postMessage(tablaHTML, 'http://127.0.0.1:5500');
        } else {
            throw new Error('No se recibieron datos de citas válidos');
        }
    })
    .catch(error => console.error('Error al obtener citas:', error));

    });
});

