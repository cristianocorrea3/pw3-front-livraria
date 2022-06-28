const express = require('express');
const axios = require('axios').default;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
	res.render('index');
});

app.get('/categoria', (req, res)=>{
	
	res.render('categoria/index');
});

app.get('/listagemCategorias', (req, res)=>{

	/** CHAMADA DO AXIOS **/
	const urlListarCategoria = 'http://localhost:3000/categoria/listarCategoria';

	/** 
	PARAMETROS:
	1 - URL DA ROTA
	2 - CALLBACK DA RESPOSTA DA CHAMADA
	**/
axios.get(urlListarCategoria)
		.then((response)=>{
			console.log(response.data);
			let categorias = response.data;
			res.render('categoria/listagemCategoria',{categorias});
		});
});

/* RECEBE A REQUISIÇÃO DA LISTAGEM */
app.get('/editarCategorias/:id', (req, res)=>{

	let {id} = req.params;
	
	const urlSelecionarCategoriaID = 
	`http://localhost:3000/categoria/listarCategoria/${id}`;

	/*
	PARAMETROS DO AXIOS:
	1 - URL (ROTA)
	*/
	axios.get(urlSelecionarCategoriaID)
		.then((response)=>{
			let categoria = response.data;
			console.log(categoria);
			res.render('categoria/editarCategoria.ejs', {categoria});
		});
});

/* RECEBE A REQUISIÇÃO DO FORMULÁRIO DE CADASTRO DE CATEGORIAS*/
app.post('/editarCategorias', (req, res)=>{

	console.log(req.body);

	const urlAlterarCategoria = 
	`http://localhost:3000/categoria/alterarCategoria`;

	/*
	PARAMETROS DO AXIOS:
	1 - URL (ROTA)
	2 - CORPO DOS DADOS (BODY)
	*/
	axios.put(urlAlterarCategoria, req.body)
	.then((response)=>{

		const urlListarCategoria = 'http://localhost:3000/categoria/listarCategoria';
		axios.get(urlListarCategoria)
			.then((response)=>{
				console.log(response.data);
				let categorias = response.data;
				res.render('categoria/listagemCategoria',{categorias});
			});

	});

});

app.get('/excluirCategoria/:id', (req, res)=>{

	// console.log('ROTA DE EXCLUSÃO - ID: ' + req.params.id);
	let {id} = req.params;

	const urlExcluirCategoria = 
	`http://localhost:3000/categoria/excluirCategoria/${id}`;
	
	/*
	PARAMETROS DO AXIOS:
	1 - URL (ROTA)
	*/
	axios.delete(urlExcluirCategoria)
	.then((response)=>{

		// console.log(response);
		const urlListarCategoria = 
		'http://localhost:3000/categoria/listarCategoria';
		
		/*
		PARAMETROS DO AXIOS:
		1 - URL (ROTA)
		*/
		axios.get(urlListarCategoria)
		.then((response)=>{
			let categorias = response.data;
			res.render('categoria/listagemCategoria', {categorias});
		});

	})

});

/* CARREGA O FORMULÁRIO DE CADASTRO DE LIVROS*/
app.get('/livro', (req, res)=>{

	const urlListarCategoria = 'http://localhost:3000/categoria/listarCategoria';
		axios.get(urlListarCategoria)
			.then((response)=>{
				console.log(response.data);
				let categorias = response.data;
				res.render('livro/index',{categorias});
			});
});

app.listen(3001, ()=>{
	console.log('SERVIDOR FRONT-END RODANDO EM http://localhost:3001');
});