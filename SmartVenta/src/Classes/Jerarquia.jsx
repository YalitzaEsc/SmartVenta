import React from 'react';
import { Button } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

class Jerarquia {
    static jerarquia = {

        "Año": {
            "Mes": {
                "Dia": {},
                "Iniciales": {
                    "Categoria": {}
                }
            }
        },
        "Producto": {
            "Tipo": {
                "Categoria": {}
            }
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
    static a() {
        alert(JSON.stringify(this.jerarquia, null, 2));
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
        this.notifyListeners();
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

    static crearJerarquia() {
        const col = this.obtenerTodosLosNombres()
        let tablaFecha = false, tablaProducto = false, tablaMesero = false;
        for (let i = 0; i < col.length; i++) {
          if (['Año', 'Mes', 'Día', 'Mes por nombre', 'Semana del mes', 'Dia de la semana'].includes(col[i])) {
            tablaFecha = true;
          }
          if (['Nombre', 'Tipo', 'Categoria'].includes(col[i])) {
            tablaProducto = true;
          }
          if (['Iniciales', 'Tiempo trabajando'].includes(col[i])) {
            tablaMesero = true
          }
        }
        alert(tablaFecha+"  "+tablaProducto+"  "+tablaMesero)
      //  this.limpiarJerarquia();
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