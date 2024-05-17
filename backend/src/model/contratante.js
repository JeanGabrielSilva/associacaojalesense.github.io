import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize(process.env.MYSQL_URL, {
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

const Contratante = sequelize.define('contratante', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contato: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cidade: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Contratante;
