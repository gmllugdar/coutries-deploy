const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Country', {
    Id: { 
      type: DataTypes.STRING,
      
      primaryKey: true
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
     
    Imagen:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    Continente:{ 
      type: DataTypes.STRING,
      allowNull: false,
    },
    Capital: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Subregion: {
      type: DataTypes.STRING,
      
    },
    Area: {
      type: DataTypes.INTEGER,
      
    },
    Poblacion: { 
      type: DataTypes.INTEGER,
       
    }
  },{
    timestamps: false
  });
};
