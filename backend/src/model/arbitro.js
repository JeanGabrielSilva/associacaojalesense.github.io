import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize(process.env.MYSQL_URL, {
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

const Arbitro = sequelize.define('arbitro', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Arbitro;
