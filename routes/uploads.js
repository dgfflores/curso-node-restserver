
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarArchivoSubir } = require('../middlewares');
const { coleccionePermitidas } = require('../helpers');
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');


const router = Router();


router.post('/', validarArchivoSubir, cargarArchivo);

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c =>  coleccionePermitidas(c, ['usuarios', 'productos'])),
    validarCampos
// ], actualizarImagen);
], actualizarImagenCloudinary);

router.get('/:coleccion/:id', [
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c =>  coleccionePermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImagen);

module.exports = router;