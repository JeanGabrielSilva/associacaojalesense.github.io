// import mongoose from 'mongoose';

// const { Schema, model } = mongoose;

// const campeonatoSchema = new Schema({
//     nome: {
//         type: String,
//         required: true
//     },
//     data: {
//         type: Date,
//         required: true
//     },
//     cidade: {
//         type: Schema.Types.ObjectId,
//         ref: 'Cidade' 
//     }
// });

// const Campeonato = model('Campeonato', campeonatoSchema);

// export default Campeonato;
import { Sequelize, DataTypes } from 'sequelize';
import Contratante from './contratante.js';

const sequelize = new Sequelize(process.env.MYSQL_URL, {
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

const Campeonato = sequelize.define('campeonato', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_contratante: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'contratantes', 
            key: 'id'
        }
    },
    instituicao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['Concluído', 'Planejado', 'Em Andamento']]
        }
    }
});

Contratante.hasMany(Campeonato, { foreignKey: 'id_contratante' });
Campeonato.belongsTo(Contratante, { foreignKey: 'id_contratante' });

export default Campeonato;

