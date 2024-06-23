const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const bodyParser = require("body-parser");

server.use(middlewares);
server.use(bodyParser.json());

server.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = router.db.get("userData").find({ email, password }).value();

  if (user) {
    res.json({ authenticated: true });
  } else {
    res.json({ authenticated: false });
  }
});

server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
