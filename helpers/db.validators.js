
const { Categoria, Producto, Role, Usuario } = require('../models');
// const Role = require('../models/role');
// const Usuario = require('../models/usuario');

const esRolValido = async (rol = '') =>  {
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
}

const emailExiste = async(correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if(existeEmail){
        throw new Error(`El correo: ${correo} ya está registrado`);
    }
}

const existeUsuarioPorId = async(id) => {
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`El id no existe ${id}`);
    }
}

const existeCategoriaPorId = async (id) => {
    const existeCategoria = await Categoria.findById(id);
    if(!existeCategoria){
        throw new Error(`El id no existe ${id}`);
    }
}

const existeProductoPorId = async(id) => {
    console.log(id)
    const existeProducto = await Producto.findById(id);
    if(!existeProducto){
        throw new Error(`El id no existe ${id}`);
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId

}