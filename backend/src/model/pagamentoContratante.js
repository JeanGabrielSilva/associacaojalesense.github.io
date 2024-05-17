import { Sequelize, DataTypes } from 'sequelize';
import Contratante from './contratante.js';

const sequelize = new Sequelize(process.env.MYSQL_URL, {
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

const PagamentoContratante = sequelize.define('pagamento_contratante', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_contratante: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'contratantes', // Nome da tabela referenciada
            key: 'id'
        }
    },
    valor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pago: {
        type: DataTypes.TINYINT,
        allowNull: false
    }
});

// Definindo a relação
Contratante.hasMany(PagamentoContratante, { foreignKey: 'id_contratante' });
PagamentoContratante.belongsTo(Contratante, { foreignKey: 'id_contratante' });

export default PagamentoContratante;