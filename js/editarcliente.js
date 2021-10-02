(function () {
    const nombreInput = document.querySelector('#nombre');
    const emailInput = document.querySelector('#email');
    const telefonoInput = document.querySelector('#telefono');
    const empresaInput = document.querySelector('#empresa');

    document.addEventListener('DOMContentLoaded', () => {
        // Verificar el ID de la URL

        const parametrosURL = new URLSearchParams(window.location.search);
        const idCliente = parametrosURL.get('id');

        if (idCliente) {
            conectarDB(db => { obtenerCliente(idCliente, db) });
        }
    })

    function obtenerCliente(id, db) {
        const transaction = db.transaction('crm', 'readonly');
        const objectStore = transaction.objectStore('crm');

        const cliente = objectStore.openCursor();
        cliente.onsuccess = function(e){
            const cursor = e.target.result;
            if(cursor){
                const row = cursor.value;
                if(row.id === Number(id)){
                    llenarForulario(row);
                }
                cursor.continue();
            }
        }
    }

    function llenarForulario(datosCliente){
        const {nombre, email, telefono, empresa} = datosCliente;
        nombreInput.value = nombre;
        emailInput.value = email;
        telefonoInput.value = telefono;
        empresaInput.value = empresa;
    }
    
    function conectarDB(callback) {
        const abrirConexion = window.indexedDB.open('crm', 1);
        abrirConexion.onerror = () => {
            console.log('Hubo un error');
        }
        abrirConexion.onsuccess = () => {
            console.log('Conexion establecida');
            const db = abrirConexion.result;
            if (callback) {
                return callback(db);
            }
        }
    }
})();