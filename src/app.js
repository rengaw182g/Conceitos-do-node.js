const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs } = request.body;
  const repositorio = {id:uuid(),title,url,techs,likes:0};
  repositories.push(repositorio);
  return response.json(repositories);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const {title,url,techs} = request.body;
  
  const findRepo = repositories.findIndex(item => item.id === id);

  if(findRepo === -1){
    return response.status(400).json({error:'Repositório não encontrado'});
  }

  const repositorio = {id,title,url,techs,likes:repositories[findRepo].likes};

  repositories[findRepo] = repositorio;

  return response.status(200).json(repositorio);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const findRepo = repositories.findIndex(item => item.id === id);
  // console.log(findRepo);
  if(findRepo >= 0){
    repositories.splice(findRepo,1);
  }else{
    return response.status(400).json({error:'O repositório não foi encontrado'})
  }

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  const findRepo = repositories.findIndex(item => item.id === id);
  
  if(findRepo === -1){
    return response.status(400).json({error:'Repositório não encontrado'});
  }

  const repo = repositories[findRepo].likes += 1;

  return response.json(repo);
});

module.exports = app;
