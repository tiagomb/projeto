const express = require('express');

const server = express();

server.use(express.json());

const cursos = ['NodeJS', 'JavaScript', 'React Native']

server.use((req, res, next) => {
    console.log(`Url chamada: ${req.url}`);
    return next();
})

function checaCurso(req, res, next){
    if (!req.body.name){
        return res.status(400).json({error: "Nome é obrigatório"})
    }
    return next();
}

function checaIndexCurso(req, res, next){
    const curso = cursos[req.params.index];

    curso ? next() : res.status(400).json({error: "O cursoc não existe"});
}

server.get('/cursos', (req, res) => {
    return res.json(cursos);
})

server.get('/cursos/:index', checaIndexCurso,(req, res) => {
    const { index } = req.params;

    return res.json(cursos[index]);
});

server.post('/cursos', checaCurso, (req, res) => {
    const { name } = req.body;
    cursos.push(name);

    return res.json(cursos);
});

server.put('/cursos/:index', checaIndexCurso, checaCurso, (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    cursos[index] = name;

    return res.json(cursos);
});

server.delete('/cursos/:index', checaIndexCurso, (req, res) => {
    const { index } = req.params;
    
    cursos.splice(index, 1);
    return res.json(cursos);
})

server.listen(3000);