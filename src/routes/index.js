const { Router } = require('express');
const axios = require('axios')
const {Country, Act_Tur} = require('../db')
// Importar todos los routers;
const CountriesRouter = require('./Countries')
const TurismoRouter = require('./Turismo')
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();


// Configurar los router
// Ejemplo: router.use('/auth', authRouter);
//router.use('/countries',CountriesRouter);
router.use('/turismo',TurismoRouter);
router.use('/countries',CountriesRouter)
//carga countries en db
const x = []

  


const a = Country.findAll()
const carga = async()=> {
  

  let {data} =await axios.get('https://restcountries.com/v3/all')
  data.forEach(e => {
    
    let a = {
      Id: e.cca3,
      Nombre: e.translations.spa.common,
      Imagen: e.flags[0],
      Continente: e.continents?.toString().replace('{', '').replace('}', ''),
      Capital: e.capital?.toString().replace('{', '').replace('}', '') || 'No tiene capital',
      Subregion: e.subregion || 'No tiene Subregion',
      Area: e.area ||'No tiene Area',
      Poblacion: e.population
    }
    x.push(a)

  }); 
      
       for (let i = 0; i < x.length; i++) {
         
         Country.findOrCreate({
         
        where: {Id: x[i].Id,
          Nombre: x[i].Nombre,
          Imagen: x[i].Imagen,
          Continente: x[i].Continente,
          Capital: x[i].Capital,
          Subregion: x[i].Subregion,
          Area: x[i].Area,
          Poblacion: x[i].Poblacion
        }
      
    })
       }  
        

}

if (!a) {
 carga() 
  
}
console.log('bd CARGADA')
  


module.exports = router;
