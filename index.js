const express = require("express");
const server = express();
server.use(express.json());

const projects = [];

function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const projectExists = projects.find(p => p.id == id);

  if (!projectExists) {
    res.json({ message: "O projeto não existe" });
  } else {
    req.project = projectExists;
  }
  next();
}

server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);
  console.log(project);

  project.tasks.push(title);

  return res.json(project);
});

server.post("/projects", (req, res) => {
  const { id, title } = req.body;
  const project = {
    id,
    title,
    tasks: []
  };
  projects.push(project);
  res.send();
});

server.get("/projects", (req, res) => {
  res.json(projects);
});

server.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.project;
  const projectIndex = projects.findIndex(p => p.id == id);

  projects.splice(projectIndex, 1);
  res.send();
});

server.listen(1000, () => console.log("Api rodando"));
