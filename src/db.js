require('dotenv').config();
const axios = require('axios')
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

/* const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/countries`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed

}); */
let sequelize =
  process.env.NODE_ENV === 'production'
    ? new Sequelize({
      database: DB_NAME,
      dialect: 'postgres',
      host: DB_HOST,
      port: 5432,
      username: DB_USER,
      password: DB_PASSWORD,
      pool: {
        max: 3,
        min: 1,
        idle: 10000,
      },
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
        keepAlive: true,
      },
      ssl: true,
    })
    : new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/countries`, {
      logging: false, // set to console.log to see the raw SQL queries
      native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    });
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Country, Act_Tur } = sequelize.models;

// Aca vendrian las relaciones
Country.belongsToMany(Act_Tur, { through: 'Act_Country' })
Act_Tur.belongsToMany(Country, { through: 'Act_Country' })

// Product.hasMany(Reviews);
/* var x = []
let cargapais =() => {
  let {data} = axios.get('https://restcountries.com/v3/all')
  data.forEach(e => {
    let a = {
      Id: e.cioc,
      Nombre: e.translations.spa.official,
      Imagen: e.flags[1],
      Continente: e.continents,
      Capital: e.capital,
      Subregion: e.subregion,
      Area: e.area,
      Poblacioin: e.population

            }
    x.push(a)
  });
}
cargapais()
for (let i = 0; i < x.length; i++) {
  
  Country.findOrCreate({
    where: {
      Id: e.Id,
      Nombre: e.Nombre,
      Imagen: e.Imagen,
      Continente: e.Continente.toString(),
      Capital: e.Capital.toString(),
      Subregion: e.Subregion,
      Area: e.Area,
      Poblacioin: e.Poblacioin
    }
  })
} */




module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
