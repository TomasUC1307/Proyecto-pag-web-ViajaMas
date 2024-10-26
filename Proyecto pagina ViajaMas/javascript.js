
// Obtener ubicación actual
document.getElementById('getLocation').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        document.getElementById('location').innerHTML = "La geolocalización no es compatible con este navegador.";
    }
});

function showPosition(position) {
    document.getElementById('location').innerHTML = 
        "Latitud: " + position.coords.latitude + 
        "<br>Longitud: " + position.coords.longitude;

    // Rellenar el formulario con la ubicación actual
    document.getElementById('latitude').value = position.coords.latitude;
    document.getElementById('longitude').value = position.coords.longitude;
}

// Guardar Puntos de Interés en Local Storage
document.getElementById('locationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const placeName = document.getElementById('placeName').value;
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;

    const places = JSON.parse(localStorage.getItem('places')) || [];
    places.push({ placeName, latitude, longitude });
    localStorage.setItem('places', JSON.stringify(places));

    displayPlaces();
    alert('Lugar guardado exitosamente!');
});

// Mostrar Puntos Guardados
function displayPlaces() {
    const placesList = document.getElementById('placesList');
    placesList.innerHTML = ''; // Limpiar la lista

    const places = JSON.parse(localStorage.getItem('places')) || [];
    
    places.forEach(function(place) {
        const li = document.createElement('li');
        li.innerHTML = `${place.placeName} - Latitud: ${place.latitude}, Longitud: ${place.longitude}`;
        placesList.appendChild(li);
    });
}

// Cargar lugares guardados cuando se cargue la página
window.onload = displayPlaces();
