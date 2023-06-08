const { response } = require('express');

const usuariosGet = (req, res = response) => {
    const { q, nombre} = req.query;
    res.json({
        msj:'get API - controlador',
        q,
        nombre
    });
}

const usuariosPost = (req, res = response) => {
    const { nombre, edad = 'No hay nombre' } = req.body;
    res.json({
        msj:'get API POST - controlador',
        nombre,
        edad
    });
}

const usuariosPut = (req, res = response) => {
    const id = req.params.id;
    res.json({
        msj:'get API PUT - controlador',
        id
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msj:'get API PATCH - controlador'
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msj:'get API DELETE - controlador'
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}