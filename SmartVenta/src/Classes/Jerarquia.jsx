import React from 'react';
import { Button } from 'antd';
import { PlusOutlined, DeleteOutlined, CompassOutlined } from '@ant-design/icons';


class Jerarquia {
    static jerarquia = {
        "Año": {
            "Mes por nombre": {
                "Semana del mes": {
                    "Dia de la semana": {
                        "Iniciales": {}
                    },
                    "Nombre": {}

                },
                "Tipo": {
                    "Categoria": {
                        "Nombre": {}
                    }
                }
            },
        },
        "Nombre": {

        }
    };
    static nivel = '';
    static listeners = []; // Almacenará los escuchadores
    static setNivel(nivel) {
        if (this.nivel === nivel) {
            this.nivel = '';
        } else {
            this.nivel = nivel;
        }
    }
    static limpiarJerarquia() {
        this.jerarquia = {};
        this.notifyListeners();
    }
    // Método para añadir escuchadores
    static addListener(listener) {
        this.listeners.push(listener);
    }
    // Método para notificar a todos los escuchadores
    static notifyListeners() {
        this.listeners.forEach(listener => listener());
    }
    // Método para eliminar escuchadores
    static removeListener(listener) {
        this.listeners = this.listeners.filter(l => l !== listener);
    }
    static agregarNivel(nuevoElemento) {
        // Si no hay nivel (nivel es una cadena vacía), agregar directamente al nivel más alto
        if (this.nivel === '') {
            this.jerarquia[nuevoElemento] = {};  // Añadir el nuevo elemento en el nivel más alto
        } else {
            // Si hay un nivel especificado, agregar al nivel correspondiente
            const niveles = this.nivel.split('.');
            let currentLevel = this.jerarquia;
            for (const nivel of niveles) {
                if (!currentLevel[nivel]) {
                    currentLevel[nivel] = {};  // Crear nivel si no existe
                }
                currentLevel = currentLevel[nivel];  // Desplazarse al siguiente nivel
            }
            if (typeof nuevoElemento === 'object') {
                Object.assign(currentLevel, nuevoElemento);  // Combinar el objeto si el nuevoElemento es un objeto
            } else {
                currentLevel[nuevoElemento] = {};  // Si no, agregar el nuevo elemento vacío
            }
        }
        // Notificar a los escuchadores sobre el cambio
        // this.notifyListeners();
    }
    static EliminarNivel(key) {
        const niveles = key.split('.');
        let currentLevel = this.jerarquia;
        for (let i = 0; i < niveles.length - 1; i++) {
            const nivel = niveles[i];
            if (!currentLevel[nivel]) {
                alert(`El nivel "${nivel}" no existe en la jerarquía.`);
                return;
            }
            currentLevel = currentLevel[nivel];
        }
        const ultimoNivel = niveles[niveles.length - 1];
        if (currentLevel[ultimoNivel]) {
            delete currentLevel[ultimoNivel];
            console.log(`Nivel "${ultimoNivel}" eliminado.`);
            // Notificar a los escuchadores sobre el cambio
            this.notifyListeners();
        } else {
            alert(`El nivel "${ultimoNivel}" no existe.`);
        }
    }
    static convertToMenuItems(obj = this.jerarquia, parentKey = '') {
        let result = [];
        for (const [key, value] of Object.entries(obj)) {
            const newKey = parentKey ? `${parentKey}.${key}` : key;
            let item = {
                key: newKey,
                label: (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>{key}</span>
                        <div style={{ display: 'flex', gap: '5px' }}>
                            <Button
                                icon={<DeleteOutlined />}
                                size="small"
                                onClick={() => this.EliminarNivel(newKey)}
                            />
                            <Button
                                icon={<PlusOutlined />}
                                size="small"
                                onClick={() => this.setNivel(newKey)}
                            />
                        </div>
                    </div>
                ),
            };
            if (Object.keys(value).length > 0) {
                item.children = this.convertToMenuItems(value, newKey);
            }
            result.push(item);
        }
        return result;
    }
    static convertToMenuItemsAnalisis(obj = this.jerarquia, parentKey = '') {
        let result = [];
        for (const [key, value] of Object.entries(obj)) {
            const newKey = parentKey ? `${parentKey}.${key}` : key;
            if(key != 'total'){
            
            // Construcción del item
            let item = {
                key: newKey,
                label: (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>{key}</span>
                        <div style={{ display: 'flex', gap: '5px' }}>
                            {value.total !== undefined && (
                                <span style={{ fontWeight: 'bold' }}>
                                    Total: {value.total}
                                </span>
                            )}
                        </div>
                    </div>
                ),
            };
            // Si tiene hijos (es decir, si hay más propiedades dentro de 'value')
            if (Object.keys(value).length > 0) {
                item.children = this.convertToMenuItemsAnalisis(value, newKey);
            }
    
            // Agregar el item al resultado final
            result.push(item);
        }
        }
        return result;
    }

    // Método estático para obtener todos los nombres de los datos
    static obtenerTodosLosNombres() {
        const obtenerNombresRecursivo = (obj, nombresArray) => {
            for (const [key, value] of Object.entries(obj)) {
                // Solo agregar el nombre si no existe ya en el arreglo
                if (!nombresArray.includes(key)) {
                    nombresArray.push(key);  // Agregar la clave al arreglo
                }
                if (typeof value === 'object' && Object.keys(value).length > 0) {
                    // Si el valor es otro objeto, recursivamente obtener sus claves
                    obtenerNombresRecursivo(value, nombresArray);
                }
            }
        };
        const nombresArray = [];  // Crear un arreglo para almacenar los nombres
        obtenerNombresRecursivo(this.jerarquia, nombresArray);
        return nombresArray;  // Devolver el arreglo con todos los nombres sin duplicados
    }
    static async crearJerarquia() {
        const reemplazos = {
            'Mes por nombre': 'nombremes',
            'Semana del mes': 'numerosemanames',
            'Dia de la semana': 'diadelasemana',
            'Tiempo trabajando': 'tiempotrabajando',
            'Nombre': 'producto'
        };
        const col = this.obtenerTodosLosNombres().map(item => reemplazos[item] || item).map(parte => parte.toLowerCase());

        let tablaFecha = false, tablaProducto = false, tablaMesero = false;
        for (let i = 0; i < col.length; i++) {
            if (['año', 'mes', 'dia', 'nombremes', 'numerosemanames', 'diadelasemana'].includes(col[i])) {
                tablaFecha = true;
                continue;
            }
            if (['nombre', 'tipo', 'categoria'].includes(col[i])) {
                tablaProducto = true;
                continue;
            }
            if (['iniciales', 'tiempotrabajando'].includes(col[i])) {
                tablaMesero = true
                continue;
            }
        }
        let query = "select " + col.join(',') + ",(cantidad*precio) as total" + " from hecho";

        if (tablaProducto) {
            query += " INNER JOIN producto ON hecho.producto = producto.nombre";
        }

        if (tablaFecha) {
            query += " INNER JOIN fecha ON hecho.fecha = fecha.fecha";
        }

        if (tablaMesero) {
            query += " INNER JOIN mesero ON hecho.mesero = mesero.nombre";
        }

        const encodedQuery = encodeURIComponent(query); // Codifica la consulta para que sea segura en la URL
        fetch(`/api/dashboardHechos/${encodedQuery}`, {
            method: 'GET', // Método GET para obtener datos
            headers: {
                'Content-Type': 'application/json', // Indicamos que esperamos recibir datos en JSON
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la API');
                }
                return response.json(); // Convertimos la respuesta a formato JSON
            })
            .then(data => {
                this.jerarquia = this.reemplazarClaves(this.jerarquia, reemplazos)
                const rutas = this.generarRutas();
                this.p(data, rutas);
            })
            .catch(error => {
                console.error('Error al hacer la solicitud:', error);
            });
    }
    static generarRutas(obj = this.jerarquia, rutaActual = []) {
        let rutas = [];
        for (let clave in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, clave)) {
                // Crea una nueva ruta como copia del arreglo actual y añade la clave
                const nuevaRuta = [...rutaActual, clave];
                rutas.push(nuevaRuta);

                // Si el valor es un objeto, llamamos recursivamente
                if (typeof obj[clave] === "object" && obj[clave] !== null) {
                    rutas = rutas.concat(this.generarRutas(obj[clave], nuevaRuta));
                }
            }
        }
        // Devuelve las rutas como un arreglo de arreglos en minúsculas
        return rutas.map(ruta => ruta.map(parte => parte.toLowerCase()));
    }
    static p(data, rutas) {

        this.jerarquia = {}
        let r = [], r2 = [];
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            for (let j = 0; j < rutas.length; j++) {
                let cont = rutas[j].length - 1;
                let columna = rutas[j][cont];
                let dato = item[rutas[j][cont]];
                console.log(item)
                if (rutas[j].length == 1) {
                    if (!r.some(arr => JSON.stringify(arr) === JSON.stringify(rutas[j]))) {
                        this.nivel = '';
                        this.agregarNivel(columna);
                        this.actualizarTotalEnCadaNivel([columna], item.total)
                        r.push(rutas[j]);
                    }
                    if (!r.some(arr => JSON.stringify(arr) === JSON.stringify([...rutas[j], dato]))) {
                        this.nivel = columna;
                        this.agregarNivel(dato)
                        this.actualizarTotalEnCadaNivel([columna, dato], item.total)
                        r.push([...rutas[j], dato]);
                    }
                } else {
                    let rutaAgregar = [];
                    for (let clave of rutas[j]) {
                        rutaAgregar.push(clave, item[clave]);
                    }

                    if (!r.some(arr => JSON.stringify(arr) === JSON.stringify(rutaAgregar.slice(0, -1)))) {
                        this.nivel = rutaAgregar.slice(0, -2).join('.');
                        this.agregarNivel(rutaAgregar[rutaAgregar.length - 2]);
                        this.actualizarTotalEnCadaNivel(rutaAgregar.slice(0, -1), item.total);
                        r.push(rutaAgregar.slice(0, -1));
                    }
                    if (!r.some(arr => JSON.stringify(arr) === JSON.stringify(rutaAgregar))) {
                        this.nivel = rutaAgregar.slice(0, -1).join('.');
                        this.agregarNivel(rutaAgregar[rutaAgregar.length - 1]);
                        this.actualizarTotalEnCadaNivel(rutaAgregar, item.total);
                        r.push(rutaAgregar);
                    }
                }
                //   break;
            }
        }
        // console.log(JSON.stringify(this.jerarquia, null, 2))
       // console.log(this.jerarquia)
         this.notifyListeners();
    }
    static actualizarTotalEnCadaNivel(path, value) {
        let current = this.jerarquia;

        // Asegurarnos de que el valor de 'value' es un número
        value = parseFloat(value); // Convierte el valor a un número de punto flotante

        // Recorremos la ruta nivel por nivel
        path.forEach((key, index) => {
            // Si estamos en el último nivel de la ruta
            if (index === path.length - 1) {
                // Si ya existe la propiedad 'total', la actualizamos sumando el valor
                if (current[key] && current[key].hasOwnProperty('total')) {
                    current[key].total += value; // Sumar correctamente como número
                } else {
                    // Si no existe, creamos la propiedad 'total' con el valor
                    current[key] = { total: value };
                }
            } else {
                // Si no estamos en el último nivel, seguimos profundizando
                if (!current[key]) {
                    // Si no existe la clave, la inicializamos
                    current[key] = {};
                }
                current = current[key]; // Nos movemos al siguiente nivel
            }
        });

        // Ahora recorremos todas las claves del objeto 'jerarquia' desde el principio
        Object.keys(this.jerarquia).forEach(level => {
            let levelObj = this.jerarquia[level];
            if (levelObj && typeof levelObj === 'object') {
                if (!levelObj.hasOwnProperty('total')) {
                    levelObj.total = value; // Asignamos el valor como número
                } else {
                    levelObj.total += value; // Sumamos correctamente como número
                }
            }
        });
    }

    static reemplazarClaves(obj, reemplazos) {
        if (typeof obj !== 'object' || obj === null) {
            return obj; // Si no es un objeto, devolver tal cual
        }

        const nuevoObj = {}; // Nuevo objeto con claves reemplazadas

        for (const clave in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, clave)) {
                // Reemplazar clave si está en el objeto de reemplazos
                const nuevaClave = reemplazos[clave] || clave;

                // Recursión para los valores (en caso de que sean objetos)
                nuevoObj[nuevaClave] = this.reemplazarClaves(obj[clave], reemplazos);
            }
        }

        return nuevoObj; // Devuelve el objeto transformado
    }
}


export default Jerarquia;



/*
Fecha

Fecha             =    
Año               = año
Mes               = mes
Día               = dia
Mes por nombre    = nombremes
Semana del mes    = numerosemanames
Dia de la semana  = diadelasemana

Producto          

Nombre            = nombre
Tipo              = tipo
Categoria         = categoria

Mesero      

Iniciales         = iniciales
Tiempo trabajando = tiempotrabajando
*/ 