import Ingreso from "./Ingreso.mjs";
import Egreso from "./Egreso.mjs";

window.egresos = []
window.ingresos = []


export const cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos()
    let porcentajeEgreso = (totalEgresos()/totalIngresos())*100
    
    document.getElementById('presupuesto').innerText = formatoMoneda(presupuesto)
    document.getElementById('porcentaje').innerText = formatoPorcentaje(porcentajeEgreso)
    document.getElementById('ingresos').innerText = formatoMoneda(totalIngresos())
    document.getElementById('egresos').innerText = formatoMoneda(totalEgresos())    
} 


const totalIngresos = () => {
    let totalIngreso = 0

    for (const ingreso of window.ingresos) {
        totalIngreso = parseInt(totalIngreso) + parseInt(ingreso.getValor())
    }
    return totalIngreso
}

const totalEgresos = () => {
    let totalEgreso = 0

    for (const egreso of window.egresos) {
        totalEgreso = parseInt(totalEgreso) +  parseInt(egreso.getValor()) 
    }

    return totalEgreso
}

const formatoMoneda = (valor, moneda = 'MXN') => {
    return `$${valor.toLocaleString()} ${moneda}`
}

const formatoPorcentaje = (valor) => {
    return `${valor.toLocaleString()}%`
}

const crearIngresoHTML = ({getDescripcion, getValor},id) => `
    <article class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${getDescripcion()}</div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">${formatoMoneda(getValor())} </div>
                    <div class="elemento_eliminar" id=${id}>
                        <button class="elemento_eliminar_btn" onclick="window.eliminarIngreso(${id})">
                         <ion-icon name="close-circle-outline"></ion-icon>
                        </button>
                    </div>
            </div>
    </article>
    `

export const cargarIngresos = () => {
    let ingresosHTML = ''
    
    for (const [id,ingreso] of window.ingresos.entries()) {
        ingresosHTML += crearIngresoHTML(ingreso,id)
    }

    document.getElementById('lista-ingresos').innerHTML = ingresosHTML
}


const crearEgresoHTML = ({getDescripcion, getValor}, id) => {
    let porcentaje = (getValor() / totalIngresos()) * 100;

    return `<article class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${getDescripcion()}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">-${formatoMoneda(getValor())}</div>
            <div class="elemento_porcentaje">${formatoPorcentaje(porcentaje)}</div>
            <div class="elemento_eliminar" id=${id}>
                <button class="elemento_eliminar_btn" onclick="window.eliminarEgreso(${id})">
                    <ion-icon name="close-circle-outline"></ion-icon>
                </button>
            </div>
        </div>
    </article>`
}

export const cargarEgresos = () => {
    let egresosHTML = ''

    for (const [id,egreso] of window.egresos.entries()) {
        egresosHTML += crearEgresoHTML(egreso,id)
    }

    document.getElementById('lista-egresos').innerHTML = egresosHTML
} 

window.eliminarEgreso = (id) => {
    let newEgresos = window.egresos.filter((egreso,index) => {
        if(id != index) {
            console.log("condition true")
            return egreso;
        }
    });
    window.egresos = newEgresos;
    cargarEgresos()
}

window.eliminarIngreso = (id) => {
    let newIngresos = window.ingresos.filter((ingreso,index) => {
        if (id != index) {
            return ingreso;
        }
    });
    window.ingresos = newIngresos;
    cargarIngresos()
}

window.agregarDato = () => {
    const forma = document.getElementById('forma')
    const tipo = document.getElementById('tipo').value
    const descripcion = document.getElementById('descripcion').value
    const valor = document.getElementById('valor').value

    if (descripcion != '' && valor != '') {
        if (tipo == 'ingreso') {
            window.ingresos.push(new Ingreso(descripcion, valor))
            cargarCabecero()
            cargarIngresos()
        }
    }
}






