import express from 'express';
import { getUsers, login, requireAuth } from '../controller/loginController.js';
import { createCidade, getCidades, getCidadeById, updateCidade, deleteCidade } from '../controller/cidadeController.js';
import { createCampeonato, getCampeonatos, getCampeonatoById, updateCampeonato, deleteCampeonato} from '../controller/campeonatoController.js';
import { createArbitro, deleteArbitro, getArbitroById, getArbitros, patchArbitro, updateArbitro } from '../controller/arbitroController.js';
import { createPagamentoArbitro, deletePagamentoArbitro, getPagamentoArbitroById, getPagamentosArbitro, patchPagamentoArbitro, updatePagamentoArbitro } from '../controller/pagArbitroController.js';
import { createPostagem, deletePostagem, getPostagens, getPostagensPublicadas, publicPostagem, updatePostagem } from '../controller/postagemController.js';

const route = express.Router();

//LOGIN
route.get('/users', getUsers);
route.post('/login', login);

//POSTAGENS
route.get('/postagem', requireAuth, getPostagens);
route.get('/portal', getPostagensPublicadas);
route.post('/postagem', requireAuth, createPostagem);
route.patch('/postagem/:id', requireAuth, publicPostagem);
route.put('/postagem/:id', requireAuth, updatePostagem);
route.delete('/postagem/:id', requireAuth, deletePostagem);

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

//ARBITROS
route.get('/arbitros', requireAuth, getArbitros);
route.get('/arbitros/:id', requireAuth, getArbitroById);
route.post('/arbitros', requireAuth, createArbitro);
route.put('/arbitros/:id', requireAuth, updateArbitro);
route.patch('/arbitros/:id', requireAuth, patchArbitro);
route.delete('/arbitros/:id', requireAuth, deleteArbitro);

//PAGAMENTO ARBITRO
route.get('/pagamento-arbitro', requireAuth, getPagamentosArbitro);
route.get('/pagamento-arbitro/:id', requireAuth, getPagamentoArbitroById);
route.post('/pagamento-arbitro', requireAuth, createPagamentoArbitro);
route.put('/pagamento-arbitro/:id', requireAuth, updatePagamentoArbitro);
route.patch('/pagamento-arbitro/:id', requireAuth, patchPagamentoArbitro);
route.delete('/pagamento-arbitro/:id', requireAuth, deletePagamentoArbitro);

export default route;