const { Router, query } = require('express');
const axios = require('axios')
const {Country, Act_Tur, Act_Country} = require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.post('/create', async(req,res)=>{
try {
    let {Nombre, Dificultad, Duracion, Temporada, Paises}= req.body

const Act =await Act_Tur.create({Nombre, Dificultad, Duracion, Temporada})
//Busco los paises que agregan la actividad
const Paises1 = await Country.findAll({
    where: {Nombre: Paises}
})
//creo las relaciones
Act.addCountry(Paises1)
res.send('Actividad Creada')
} catch (error) {
    res.send('Error Creacion de Actividad'+ error)
}

})
router.get('/', async(req,res)=>{
    let a = await Act_Tur.findAll()
    
    res.json(a)
})
router.get('/paises', async(req,res)=>{
    const {activity} = req.query
    let a = await Country.findAll({
        order: [["Nombre", "ASC"]],
                include: {
                    model: Act_Tur,
                    attributes: ['Nombre'],
                    through: [],
                    where: {Nombre: activity}
                }
    }) 
    res.json(a)
} )
router.get('/nombre', async(req,res)=>{
    let {nombre} = req.query 
    let a = await Act_Tur.findAll({
        where:{Nombre : nombre}
    })
    
    res.json(a)
})
router.delete('/delete', async(req,res)=>{
    try {
        let {nombre} = req.query
     await Act_Tur.destroy({
         where: {Nombre : nombre}
     })
     res.send('Actividad Eliminada')
    } catch (error) {
      res.send(error+'eliminando Actividad')  
    }
    
})
module.exports = router;