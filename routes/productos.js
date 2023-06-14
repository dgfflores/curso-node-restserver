
const { Router } = require('express');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db.validators');
const { obtenerProductos, 
        obtenerProducto, 
        crearProducto, 
        actualizarProducto, 
        borrarProducto } = require('../controllers/productos');
const { check } = require('express-validator');

const router = Router();

router.get('/',obtenerProductos);

router.get('/:id', [
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], obtenerProducto);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es requerida').not().isEmpty(),
    check('categoria', 'El id de la categoria no es válido').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], crearProducto);

router.put('/:id', [
    validarJWT,
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    /*opcionales
    check('categoria', 'El id de la categoria no es válido').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    */
    validarCampos
], actualizarProducto);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], borrarProducto);

module.exports = router