window.addEventListener('load', () => {
    cargarMotos();
});


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

function crearCardMoto(moto) {
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
                    <button type="button" class="btn btn-outline-danger w-100" data-bs-toggle="modal" data-bs-target="#exampleModal" 
                            onclick="verMoto(${moto.id})">
                        Ver ficha técnica
                    </button>
                </div>
            </div>
        </div>
    `;
}

function verMoto(id) {
    const modalContainer = document.getElementById("fichaTecnica");

    fetch('JSON/Motos.json')
        .then(res => res.json())
        .then(data => {
            const moto = data.find(m => m.id === id);
            modalContainer.innerHTML=mostrarModal(moto);
        });
}

function mostrarModal(moto) {
    console.log(moto);
    
    document.getElementById("exampleModalLabel").textContent = moto.Modelo;
    document.getElementById("exampleModal").querySelector(".modal-body").innerHTML = `
        <img src="${moto.rutadeimg}" class="img-fluid mb-3" alt="${moto.Modelo}">
        <p><strong>Tipo:</strong> ${moto.tipo}</p>
        <p><strong>Año:</strong> ${moto.Año}</p>
        <p><strong>Precio:</strong> ${moto.precio}</p>
        <p><strong>Precio Promoción Contado:</strong> ${moto.precioPromo}</p>
        <p><strong>Descripción:</strong> ${moto.Descripcion}</p>
        <p><strong>Ficha Técnica:</strong></p>
        <p><strong>Motor:</strong>${moto.Caracteristicas.Motor}</p>
        <p><strong>Potencia:</strong>${moto.Caracteristicas.Potencia}</p>
        <p><strong>Transmisión:</strong>${moto.Caracteristicas.Transmision}</p>
        <p><strong>Arranque:</strong>${moto.Caracteristicas.Arranque}</p>
        <p><strong>FrenosDelantero:</strong>${moto.Caracteristicas.FrenoDelantero}</p>
        <p><strong>FrenosTrasero:</strong>${moto.Caracteristicas.FrenoTrasero}</p>
        <p><strong>Capacidad de Tanque:</strong>${moto.Caracteristicas.CapacidadTanque}</p>
    `;
    document.getElementById("btnWa").innerHTML = `<button type="button" class="btn btn-success" onclick="redireccion(${moto.id})">Compra la tuya</button>`;
}


function redireccion(id) {
    console.log(id);

    fetch('JSON/Motos.json')
        .then(res => res.json())
        .then(data => {
            const moto = data.find(m => m.id === id);
            window.location.href = `https://wa.me/50586644337?text=Hola,%20estoy%20interesado%20en%20la%20moto%20${encodeURIComponent(moto.Modelo)}.%20¿Podrías%20darme%20más%20información? Foto: ${encodeURIComponent(moto.rutadeimg)}`;
        });
    
}

