import http from "node:http";
import { bodyParser } from "./bodyParser.js";
const PORT = process.env.PORT ?? 4321;

let users = [
  {
    id: 1,
    name: "matrix",
  },
];

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  switch (method) {
    case "GET":
      switch (url) {
        case "/":
          getDocs(req, res);
          break;
      }
      break;
    case "POST":
      switch (url) {
        case "/employees":
          addDoc(req, res);

          break;
      }
      break;
    case "PUT":
      patchDoc(req, res);
      break;
    //Delete
    case "DELETE":
      deleteDoc(req, res);
      break;
    default:
      res.writeHead(404, { "Content-Type": "appliaction/json" });
      res.end("404 not found");
      break;
  }
});

server.listen(PORT, () => {
  console.log(`Server is runing on port http://localhost:${PORT}`);
});

async function getDocs(req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(users))
  res.end(JSON.stringify({ message: "obteniendo datos" }));
}

async function addDoc(req, res) {
 await bodyParser(req);

  res.writeHead(201, { "Content-Type": "application/json" });
  res.write(JSON.stringify(req.body));
  res.end();
  console.log("objeto creado");
}

async function patchDoc(req, res) {
  const idQuery = url.split("?")[1]; // id=2
  const idKey = idQuery.split("=")[0]; // id
  const idValue = parseInt(idQuery.split("=")[1]); // 2

  if (url.includes("/employees") && idKey === "id") {
    console.log("include", true);

    const userIndex = users.findIndex((u) => u.id === idValue);
    console.log(userIndex);
    // const [,idQuery] = url.split('?')
    // const [idKey, idValue] = idQuery.split('=')

    const newUser = {
      ...users[userIndex],
      ...req.body,
    };

    console.log(newUser);
    users[0] = newUser;

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } else return console.log("include", false);
}

async function deleteDoc(req, res) {
  const idQuery = url.split("?")[1]; // id=2
  const idKey = idQuery.split("=")[0]; // id
  const idValue = parseInt(idQuery.split("=")[1]); // 2

  if (url.includes("/employees") && idKey === "id") {
    const userIndex = users.findIndex((u) => u.id === idValue);

    users.splice(userIndex, 1);

    res.writeHead(401, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  }
}

