document.addEventListener('DOMContentLoaded', function() {
    const martialArtsList = document.getElementById('artes-marciales');
    
    // Solicitud a la API
    fetch('https://martialarts-api-mongo.onrender.com/api/martials', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Datos recibidos:", data);

        // Si no hay datos de artes marciales, mostrar mensaje
        if (!data.artesMarciales || data.artesMarciales.length === 0) {
            martialArtsList.innerHTML = '<div class="no-data">No se encontraron artes marciales.</div>';
            return;
        }

        // Limpiar el contenedor antes de agregar los nuevos elementos
        martialArtsList.innerHTML = '';

        // Iterar sobre los datos y crear las tarjetas
        data.artesMarciales.forEach(martialArt => {
            const card = document.createElement('div');
            card.classList.add('card');

            // Crear el contenido de cada tarjeta
            const content = `
                <img src="${martialArt.img}" alt="${martialArt.nombre}">
                <div class="card-content">
                    <h4>${martialArt.nombre}</h4>
                    <p><strong>Origen:</strong> ${martialArt.origen}</p>
                    <p><strong>Fundador:</strong> ${martialArt.fundador}</p>
                    <p><strong>Año de Creación:</strong> ${martialArt.año_creacion}</p>
                    <p><strong>Descripción:</strong> ${martialArt.descripcion}</p>
                    <p><strong>Filosofía:</strong> ${martialArt.filosofia || 'No disponible'}</p>
                    <p><strong>Tipo:</strong> ${martialArt.tipo || 'No especificado'}</p>
                </div>
            `;
            card.innerHTML = content;

            // Agregar la card al contenedor
            martialArtsList.appendChild(card);
        });
    })
    .catch(error => {
        console.error('Error al consumir la API:', error);
        martialArtsList.innerHTML = '<div class="error-message">Hubo un problema al cargar los datos. Intenta más tarde.</div>';
    });
});
