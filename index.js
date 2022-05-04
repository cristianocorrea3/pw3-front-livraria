const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('view engine', 'ejs');

app.get('/', (req, res)=>{

	res.render('index');

});

app.listen(3001, ()=>{
	console.log('SERVIDOR FRONT-END RODANDO EM http://localhost:3001');
});