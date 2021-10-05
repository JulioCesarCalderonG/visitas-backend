
const Usuario = require('../models/usuario');
const Role = require('../models/role');
const Tacho = require('../models/tacho');
const Alerta = require('../models/alerta');
const Anuncio = require('../models/anuncio');
const Cliente = require('../models/cliente');

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
}
const esUsuarioValido = async(id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
       throw new Error(`El id ${id} no existe en la base de datos`);
    }
}
const esNombreUsuarioValido = async(nombre='')=>{
        const name = nombre.toUpperCase();
        const existeUsuario = await Usuario.findOne({nombre:name});
        if (existeUsuario) {
            throw new Error(`El usuario ${name} ya existe en la base de datos`);
        } 
}
const esUsuarioValidoUser = async(usuario='')=>{
    const existeUsuario = await Usuario.findOne({usuario});
    if (existeUsuario) {
        throw new Error(`El usuario ${usuario} ya existe en la base de datos`);
    } 
}
const coleccionesPermitidas = (coleccion='', colecciones=[]) => {
    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La coleccion ${coleccion} no es permitida`);
    }
    return true;
}
const esTachoNombreValido = async(nombre='')=>{
    const name = nombre.toUpperCase();
    const tacho = await Tacho.findOne({nombre: name});
    if (tacho) {
        throw new Error(`El nombre ${name} ya existe en la base de datos`);
    }
}
const esTachoIdValido = async (id)=>{
    const tacho = await Tacho.findById(id);
    if (!tacho) {
        throw new Error(`El id ${id} no existe en la base de datos`);
    }
}
const esAlertaIdValido = async(id) =>{
    const alerta = await Alerta.findById(id);
    if (!alerta) {
        throw new Error(`El id ${id} no existe en la base de datos`);
    }
}
const esAnuncioIdValido = async(id)=>{
    const anuncio = await Anuncio.findById(id);
    if (!anuncio) {
        throw new Error(`El id ${id} no existe en la base de datos`);
    }
}
const esClienteIdValido = async(id)=>{
    const cliente = await Cliente.findById(id);
    if (!cliente) {
        throw new Error(`El id ${id} no existe en la base de datos`);
    }
}
module.exports = {
    esRoleValido,
    esUsuarioValido,
    esNombreUsuarioValido,
    esUsuarioValidoUser,
    coleccionesPermitidas,
    esTachoNombreValido,
    esTachoIdValido,
    esAlertaIdValido,
    esAnuncioIdValido,
    esClienteIdValido
}