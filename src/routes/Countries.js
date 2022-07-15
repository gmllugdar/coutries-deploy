const { Router } = require('express');
const {Country, Act_Tur} = require('../db')
const {Op} = require('sequelize')




const router = Router();



//Get All Countries: Name 
router.get('/' ,async (req,res)=> {
  try {
      const {name,continent} = req.query
    console.log(name)
        let result
        if (name !== undefined){
            result = await Country.findAll({
                where:  { Nombre: {[Op.iLike]: `%${name}%`}},
                order: [["Nombre", "ASC"]]
            })
            }else if (continent) {
                result = await Country.findAll({
                    where:  { Continente: {[Op.iLike]: `%${continent}%`}},
                    order: [["Nombre","ASC"]]
                })
            }else{
            result = await Country.findAll({
                order: [["Nombre","ASC"]]
                })
    }
    if(result.length) return res.json(result)
        
        return res.send({message: 'Sorry, Country not Found'});
  
  } catch (error) {
      res.send('Error Get Country'+error)
  }
    
} )

//Get Country por Id
router.get('/:id' ,async (req,res)=> {
    try {
        var id= req.params.id
        let data =await Country.findAll({ where: {Id : id }, include: Act_Tur })
        res.json(data)
    } catch (error) {
        console.log('Error en get country por Id', error)
    }
} )
router.post('/create', async(req,res)=>{
    let {Nombre,Imagen,Continente,Capital}=req.body

   await Country.create({

        Nombre,
        Imagen,
        Continente,
        Capital,
    })
    res.send('Pais creado')
})

module.exports = router;