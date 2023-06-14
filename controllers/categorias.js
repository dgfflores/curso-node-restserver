const { response } = require("express");
const { Categoria } = require('../models');

//paginado- total - populate
const obtenerGategorias =  async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query  = { estado: true };

    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.status(200).json({
        total,
        categorias
    });
}

const obtenerGategoria = async(req, res = response) => {
    const { id } = req.params;
    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');
    res.status(200).json(categoria);
}

const crearCategoria = async(req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});
    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoria ${nombre}, ya existe`
        });
    }

    //Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }
    
    const categoria = new Categoria(data);
    //Guardar
    await categoria.save();

    res.status(201).json(categoria);
}


const actualizarCategoria = async (req, res = response) => {

    const { id } = req.params;
    const { _id, estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;
    
    const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true});
    res.status(200).json(categoria);

}

const borrarCategoria = async (req, res = response) => {

    const { id } = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id, {estado: false}, {new: true});
    res.status(200).json(categoria);
}

module.exports = {
    obtenerGategorias,
    obtenerGategoria,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
}