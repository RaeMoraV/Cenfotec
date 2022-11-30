'use strict';

const express = require("express");
const router = express.Router();
const Persona = require('../models/PersonaModel');

//post = insertar
//put = actualizar o desactivar
//delete = eliminar
//get = obtener o listar o buscar


router.post('/RegistrarPersona', (req, res) => {
    let body = req.body;
    let nuevaPersona = new Persona({
        TipoIdentificacion: body.TipoIdentificacion,
        Identificacion: body.Identificacion,
        Nombre: body.Nombre,
        Apellido1: body.Apellido1,
        Apellido2: body.Apellido2,
        Sexo: body.Sexo,
        Nacimiento: body.Nacimiento,
        Edad: body.Edad,
        Estado: body.Estado,
        Email: body.Email,
        Password: body.Password,
        Rol: body.Rol,
        FotoPerfil: body.FotoPerfil
    });
    nuevaPersona.save((err, personaDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo registrar la persona, ocurrio un error!: ',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Registro realizado de manera correcta',
                personaDB
            });
        }
    });
});
router.put('/ModificarPersona', (req, res) => {
    let body = req.body;
    Persona.updateOne({ _id: body._id }, {
        $set: body
        // $set:{
        //     Nombre: body.Nombre,
        //     Edad: body.Edad
        // }
    }, function (err, info) {
        if (err) {
            res.json({
                resultado: false,
                msj: 'Ocurrio un error inesperado y no se pudieron actulizar los datos',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los datos se actualizaron de manera correcta',
                info
            });
        }
    });
});
router.put('/DesactivarPersona', (req, res) => {
    let body = req.body;
    Persona.updateOne({ _id: body._id }, {
        $set: {
            Estado: 0
        }
    }, function (err, info) {
        if (err) {
            res.json({
                resultado: false,
                msj: 'Ocurrio un error inesperado y no se desactivar la persona',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Persona inactivada de manera correcta',
                info
            });
        }
    });
});
router.delete('/EliminarPersona', (req, res) => {
    let body = req.body;
    Persona.remove({ _id: body._id }, (err, result) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'Ocurrio un error inesperado y no se elimino a la persona',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Persona eliminada de manera correcta',
                result
            });
        }
    });
});
router.get('/ListarPersonas', (req, res) => {
    Persona.find((err, ListaPersonasDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo obtener los datos: ',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los datos se obtuvieron de manera correcta: ',
                ListaPersonasDB
            });
        }
    });
});
router.get('/BuscarPersonaPorIdentificacion', (req, res) => {
    let params = req.query;
    Persona.findOne({ Identificacion: params.Identificacion }, (err, PersonaDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo obtener los datos: ',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los datos se obtuvieron de manera correcta: ',
                PersonaDB
            });
        }
    });
});
router.get('/BuscarPersonaPorId', (req, res) => {
    let params = req.query;
    Persona.findOne({ _id: params._id }, (err, PersonaDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo obtener los datos: ',
                err
            });
        } else {
            res.json({
                resultado: true,
                msj: 'Los datos se obtuvieron de manera correcta: ',
                PersonaDB
            });
        }
    });
});
router.get('/AutenticarUsuario', (req, res) => {
    let params = req.query;
    Persona.findOne({ Email: params.Email, Password: params.Password }, (err, personaDB) => {
        if (err) {
            res.json({
                resultado: false,
                msj: 'No se pudo obtener los datos: ',
                err
            });
        } else {
            if (personaDB == null) {
                res.json({
                    resultado: false,
                    msj: 'Usuario y/o contraseña incorrectos ',
                    personaDB
                });
            } else if (Number(personaDB.Estado) == 0) {
                res.json({
                    resultado: false,
                    msj: 'Usuario inactivo, por favor comuniquese con el administrador ',
                    personaDB
                });
            } else {
                res.json({
                    resultado: true,
                    msj: 'Los datos se obtuveron de manera correcta: ',
                    personaDB
                });
            }
        }
    });
});


module.exports = router