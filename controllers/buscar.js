const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { Usuario, Categoria, Producto } = require("../models");
const usuario = require("../models/usuario");

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const buscarUsuarios  = async(termino = '', res = response) => {
    const esMongoID =  ObjectId.isValid(termino);
    if(esMongoID){
        const usuario = await Usuario.findById(termino);
        res.json({
            results: (usuario) ? [usuario]: []
        });
    }

    const regex = new RegExp( termino, 'i');
    const usuarios = await Usuario.find({
        $or: [{nombre:regex }, {correo:regex }],
        $and: [{estado: true}]
    });

    res.json({
        results: usuarios
    });
}

const bucarCategorias = async(termino = '', res = response) => {

    const isMongoID = ObjectId.isValid(termino);
    if(isMongoID){
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria]: []
        });
    }

    const regex = RegExp( termino, 'i');
    const categorias = await Categoria.find({nombre: regex, estado: true});
    res.json({
        results: categorias
    });
}

const buscarProductos = async (termino = '', res = response) => {

    const isMongoID = ObjectId.isValid(termino);
    if(isMongoID){
        const producto = await Producto.findById(termino)
                            .populate('categoria', 'nombre');
        res.json({
            results: (producto) ? [producto]: []
        });
    }

    const regex = RegExp( termino, 'i');
    const productos = await Producto.find({nombre: regex, estado: true})
                        .populate('categoria', 'nombre');

    res.json({
        results: productos
    });

}



const buscar = (req, res = response) => {
    const { coleccion, termino } = req.params;
    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `Las colecciones permitidas son ${coleccionesPermitidas}`
        });
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        case 'categorias':
            bucarCategorias(termino, res);
            break;
        case 'productos':
            buscarProductos(termino, res);
            break;
        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta búsqueda'
            });
            break
    }
}

module.exports = {
    buscar
}