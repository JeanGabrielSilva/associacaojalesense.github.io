import mysql from "mysql2";

const connectToMySQL = async () => {
    try {
        const connection = await mysql.createConnection(process.env.MYSQL_URL, {});

        console.log(`MySQL connected: ${connection.config.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

export default connectToMySQL;