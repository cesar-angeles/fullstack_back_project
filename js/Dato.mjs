
export default class Dato {
    constructor(descripcion, valor) {
        this._descripcion = descripcion
        this._valor = valor
    }

    getDescripcion = () => this._descripcion 
    setDescripcion = (nuevaDescripcion) => this._descripcion = nuevaDescripcion

    getValor = () => this._valor
    setValor = (nuevoValor) => this._valor = nuevoValor
}