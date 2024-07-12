const { Router } = require("express");

const routes = Router();

const userController = require("./controllers/userController");

routes.get("/health", (req, res) =>{
  return res.json({message: "ok"})
})

routes.post("/users", userController.store);
routes.get("/users", userController.index);
routes.get("/users/:id", userController.show);
routes.put("/users/:id", userController.update);
routes.delete("/users/:id", userController.destroy);

module.exports = routes;