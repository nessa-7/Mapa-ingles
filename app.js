// Cargar el JSON y generar lista + eventos
fetch("lista.json")
  .then(response => response.json())
  .then(data => {
    const ul = document.getElementById("list");

    data.forEach(item => {
      const li = document.createElement("li");
      li.id = item.id;
      li.textContent = `${item.id} - ${item.name}`;
      ul.appendChild(li);

      li.addEventListener("click", () => {
        mostrarAlerta(item.id, item.name);
        resaltarMarker(item.id);
      });
    });

    const markers = document.querySelectorAll(".marker");
    markers.forEach(marker => {
      marker.addEventListener("click", () => {
        const lugar = data.find(l => l.id == marker.id);
        if (lugar) {
          mostrarAlerta(lugar.id, lugar.name);
          resaltarMarker(lugar.id);
        }
      });
    });
  })
  .catch(error => console.error("Error cargando lista.json:", error));



function mostrarAlerta(id, name) {
  Swal.fire({
    title: name,
    text: `ID: ${id}`,
    imageUrl: `./imagenes/${id}.jpeg`,
    imageWidth: 200,
    imageHeight: 200,
    imageAlt: `Imagen ${name}`,
    confirmButtonText: "¡Entendido!"
  });
}

function resaltarMarker(id) {
  const markers = document.querySelectorAll(".marker");
  markers.forEach(m => m.style.color = "transparent");

  const marker = document.getElementById(id);
  if (marker) {
    marker.style.color = "red";
  }
}
