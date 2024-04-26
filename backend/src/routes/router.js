import express from 'express';
import { getUsers, login, requireAuth } from '../controller/loginController.js';
import { createCidade, getCidades, getCidadeById, updateCidade, deleteCidade } from '../controller/cidadeController.js';
import { createCampeonato, getCampeonatos, getCampeonatoById, updateCampeonato, deleteCampeonato} from '../controller/campeonatoController.js';

const route = express.Router();

//LOGIN
route.get('/users', getUsers);
route.post('/login', login);

//CIDADE
route.post('/cidades', requireAuth, createCidade);
route.get('/cidades', requireAuth, getCidades);
route.get('/cidades/:id', requireAuth, getCidadeById);
route.put('/cidades/:id', requireAuth, updateCidade);
route.delete('/cidades/:id', requireAuth, deleteCidade);

//CAMPEONATO
route.post('/campeonatos', requireAuth, createCampeonato);
route.get('/campeonatos', requireAuth, getCampeonatos);
route.get('/campeonatos/:id', requireAuth, getCampeonatoById);
route.put('/campeonatos/:id', requireAuth, updateCampeonato);
route.delete('/campeonatos/:id', requireAuth, deleteCampeonato);

export default route;