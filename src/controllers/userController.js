const { User } = require("../models");

class UserController {

  async store(req, res) {
    try {
      const { firstName, email, age } = req.body;

      const checkUserExist = await User.findOne({
        where: {
          email,
        }
      });

      if(checkUserExist){
        return res.status(400).json({ message: "User already exists." });
      }

      if(!firstName || !email){
        return res.status(400).json({ message: "It's necessary inform name and email." });
      }

      const createUser = await User.create({ firstName, email, age });

      return res.status(201).json(createUser);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Register user failed." });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll(); 

      return res.status(200).json(users);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Users not found." });
    }
  }

  async show(req, res) {
   try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if(!user){
      return res.status(400).json({ message: "User not found." });
    }

    return res.status(200).json(user);
   } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "User not found." });
   }
  }

  async update(req, res) {
    try {
      const { email, firstName, age } = req.body;
      const { id } = req.params;

      await User.update(
        { email, firstName, age },
        {
          where: {
            id
          }
        },
      )

      return res.status(200).json({ message: "User updated"});
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Failed to update user."});
    }
  }

  async destroy(req, res) {
    try {
        
    const { id } = req.params;
    
    await User.destroy({
      where: {
        id
      }
    }); 

    return res.status(200).json({message: "User deleted"});
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Fail on delete user." });
    }
  }
}

module.exports = new UserController();