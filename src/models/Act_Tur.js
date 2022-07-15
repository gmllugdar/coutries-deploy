const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Act_Tur', {
    
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
     Dificultad: {
      type: DataTypes.ENUM('1','2','3','4','5'), 
      allowNull: false,
    },
    Duracion:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    Temporada:{ 
      type: DataTypes.ENUM('Verano','Otoño','Invierno','Primavera'),
      allowNull: false,
    },
  },{
    timestamps: false
  });
};
