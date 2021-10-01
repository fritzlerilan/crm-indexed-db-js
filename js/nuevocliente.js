(function () {
    let DB;
    const formulario = document.querySelector('#formulario');
    window.onload = () => {
        conectarDB();
        formulario.addEventListener('submit', validarCliente);
    }

    function conectarDB() {
        const abrirConexion = window.indexedDB.open('crm', 1);
        abrirConexion.onerror = () => {
            console.log('Hubo un error');
        }
        abrirConexion.onsuccess = () => {
            console.log('Conexion establecida');
        }
    }
    function validarCliente(e) {
        e.preventDefault();

        //Leyendo inputs
        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        if (nombre === '' || email === '' || telefono === '' || empresa === '') {
            console.error('Campos obligatorios');
            imprimirAlerta('Todos los campos son obligatorios', 'error');
            return;
        }
    }
    function imprimirAlerta(msg, tipo) {
        const alerta = document.querySelector('.alerta');
        if(!alerta){
            const divMensaje = document.createElement('div');
            divMensaje.classList.add('px-4', 'py-3', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'border', 'alerta');
            if (tipo === 'error') {
                divMensaje.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
            } else {
                divMensaje.classList.add('bg-green-100', 'border-green-400', 'text-green-700');
            }
    
            divMensaje.textContent = msg;
            formulario.appendChild(divMensaje);
    
            setTimeout(() => {
                divMensaje.remove();
            }, 3000);
        }
    }

})();