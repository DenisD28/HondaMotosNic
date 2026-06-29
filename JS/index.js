window.addEventListener('load', (event) => {
    cargarMotos();
});

const moto = {
    Marca: "Honda",
    Modelo: "Navi 110",
    Descripcion: "Mini moto urbana con diseño juvenil.",
    Año: 2026,
    precio: "$2,450",
    rutadeimg: "IMG/navieditada.png",
    tipo: "Mini moto urbana"
}

function cargarMotos() {
    const contenedor = document.getElementById("contenedorMotos");

    fetch('JSON/Motos.json')
        .then(res => res.json())
        .then(data => {
            data.forEach(moto => {
                contenedor.innerHTML += crearCardMoto(moto);
            });
        })
}

function crearCardMoto(moto, index) {
    return `
        <div class="col-md-4 col-lg-3 mb-4">
            <div class="card h-100 shadow">
                <img src="${moto.rutadeimg}" class="card-img-top" alt="${moto.Modelo}">

                <div class="card-body">
                    <h5 class="card-title">${moto.Modelo}</h5>
                    <p class="card-text">${moto.Descripcion}</p>
                </div>

                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><strong>Tipo:</strong> ${moto.tipo}</li>
                    <li class="list-group-item"><strong>Año:</strong> ${moto.Año}</li>
                    <li class="list-group-item"><strong>Precio:</strong> ${moto.precio}</li>
                    <li class="list-group-item"><strong>Precio Promoción Contado:</strong> ${moto.precioPromo}</li>
                </ul>

                <div class="card-body">
                    <button class="btn btn-outline-danger w-100"
                            onclick="verMoto(${index})">
                        Ver ficha técnica
                    </button>
                </div>
            </div>
        </div>
    `;
}

