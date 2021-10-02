(function () {
    let DB;
    const tbodyListadoClientes = document.querySelector('#listado-clientes');
    
    window.onload = () => {
        crearDB(db => mostrarClientes(db));
    }

    function crearDB(callback) {
        const crearDB = window.indexedDB.open('crm', 1);
        crearDB.onerror = () => {
            console.log('Hubo un error');
        }

        crearDB.onsuccess = (e) => {
            DB = crearDB.result;
            if (callback) {
                return callback(e.target.result);
            }
        }

        crearDB.onupgradeneeded = function (e) {
            const db = e.target.result;

            const objectStore = db.createObjectStore('crm', { keyPath: 'id', autoIncrement: true });

            objectStore.createIndex('nombre', 'nombre', { unique: false });
            objectStore.createIndex('email', 'email', { unique: true });
            objectStore.createIndex('telefono', 'telefono', { unique: false });
            objectStore.createIndex('empresa', 'empresa', { unique: false });
            objectStore.createIndex('id', 'id', { unique: true });

            console.log('DB LISTA Y CREADA');

        }

    }

    function mostrarClientes(db) {
        // Obtener el cursor
        const transaction = db.transaction('crm', 'readwrite');
        const objectStore = transaction.objectStore('crm');

        objectStore.openCursor().onsuccess = (e) => {
            let cursor = e.target.result;
            if (cursor) {
                const cliente = cursor.value;

                // const clienteHTML = crearElementoCliente(cliente);
                // 

                cursor.continue();
            }else {
                console.log('Todas las entradas fueron recorridas');
            }
        }

    }
})();

