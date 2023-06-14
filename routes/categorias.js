const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { obtenerGategorias, 
        obtenerGategoria, 
        crearCategoria, 
        actualizarCategoria, 
        borrarCategoria} = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db.validators');


const router = Router();

//Obtener todas las categorias - publico
router.get('/', obtenerGategorias);

//Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], obtenerGategoria);


//Crear categoria - privado - cualquier person con un token válido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);


//Actualizar - privado - cualquier person con un token válido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],actualizarCategoria);


//Borrar una categoria - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], borrarCategoria);

module.exports = router