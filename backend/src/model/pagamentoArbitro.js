import { Sequelize, DataTypes } from 'sequelize';
import Arbitro from './arbitro.js'; 

const sequelize = new Sequelize(process.env.MYSQL_URL, {
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

const PagamentoArbitro = sequelize.define('pagamento_arbitro', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_arbitro: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'arbitros',
            key: 'id',
        }
    },
    valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    pago: {
        type: DataTypes.TINYINT,
        allowNull: false
    }
}, {
});


Arbitro.hasMany(PagamentoArbitro, { foreignKey: 'id_arbitro' });
PagamentoArbitro.belongsTo(Arbitro, { foreignKey: 'id_arbitro' });

export default PagamentoArbitro;
