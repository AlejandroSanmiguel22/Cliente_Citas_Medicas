document.addEventListener("DOMContentLoaded", function () {
    const filtroBtn = document.querySelector(".filtro-btn");
    const filtroContainer = document.querySelector(".opciones");

    filtroContainer.style.display = "none";

    filtroBtn.addEventListener("click", function () {
        filtroContainer.style.display = filtroContainer.style.display === "none" ? "block" : "none";
    });

    const btnAceptar = document.getElementById("btnAceptar");
    btnAceptar.addEventListener("click", function () {
        const numeroIdentificacion = document.getElementById("filtroID").value;
        const nombrePaciente = document.getElementById("filtroNombre").value;
        const costoMinimo = document.getElementById("filtroCostoMin").value;
        const costoMaximo = document.getElementById("filtroCostoMax").value;
        const tipoCita = document.getElementById("tipoCita").value;

        const queryParams = new URLSearchParams();
        queryParams.append('numeroIdentificacion', numeroIdentificacion || '');
        queryParams.append('nombrePaciente', nombrePaciente || '');
        queryParams.append('costoMinimo', costoMinimo || '');
        queryParams.append('costoMaximo', costoMaximo || '');
        queryParams.append('tipoCita', tipoCita || '');

        let url = 'https://gestioncitasmedicas-production.up.railway.app/citas/filtro?' + queryParams.toString();

        console.log("URL generada: ", url); // Debug URL

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener citas: ' + response.status);
                }
                return response.json();
            })
            .then(citas => {
                console.log('Datos recibidos:', citas);

                if (Array.isArray(citas) && citas.length > 0) {
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
                    window.parent.postMessage(tablaHTML, 'https://zingy-parfait-e3c17a.netlify.app');
                } else {
                    throw new Error('No se recibieron datos de citas válidos');
                }
            })
            .catch(error => console.error('Error al obtener citas:', error));
    });
});

