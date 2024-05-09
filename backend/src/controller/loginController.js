import User from '../model/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

// const secretKey = 'your_secret_key'; 
dotenv.config({ path: './config.env' });
const secretKey = process.env.SECRET_KEY;


export const login = (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: 'Usuário não encontrado' });
            }

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    return res.status(500).send({ message: 'Erro ao tentar fazer login' });
                }

                if (!isMatch) {
                    return res.status(401).send({ message: 'Credenciais inválidas' });
                }

                const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '2h' });

                return res.send({
                    message: 'Login bem-sucedido',
                    username: user.username,
                    token: token
                });
            });
        })
        .catch(err => {
            res.status(500).send({ message: 'Erro ao tentar fazer login' });
        });
};


export const requireAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).send({ message: 'Nenhum token fornecido' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.error('Falha na verificação do token:', err);
            return res.status(401).send({ message: 'Não autorizado' });
        }

        req.userId = decoded.id;
        next();
    });
};

export const getUsers = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;

        User.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: `Não foi possível encontrar user com esse id ${id}` });
                } else {
                    res.send({ username: data.username });
                }
            })
            .catch(err => {
                res.status(500).send({ message: `Erro ao acessar user com esse id ${id}` });
            })
    } else {
        User.find()
            .then(users => {
                const usernames = users.map(user => user.username);
                res.send(usernames);
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Ocorreu algum erro" });
            })
    }
};
