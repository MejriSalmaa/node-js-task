const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
router.post("/register", async (req, res) => {
  data = req.body;
  user = new User(data);
  salt = bcrypt.genSaltSync(10);
  cryptedPass = await bcrypt.hashSync(data.password, salt);
  user.password = cryptedPass;
  user
    .save()
    .then((saved) => {
      res.status(200).send(saved);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.post("/login", async (req, res) => {
  data = req.body;
  user = await User.findOne({ email: data.email });

  if (!user) {
    res.status(404).send("email or password not found");
  } else {
    validPass = bcrypt.compareSync(data.password, user.password);
    if (!validPass) {
      res.status(401).send("email or password not valid");
    } else {
      payload = {
        _id: user.id,
        email: user.email,
        name: user.name,
      };
      token = jwt.sign(payload, "12345");
      res.status(200).send({ mytoken: token });
    }
  }
});

router.post("/add", (req, res) => {
  //krina mel body taa l request teina
  data = req.body;
  // sna3na instance teina 3la tri9 l model l sna3neh l fouk
  usr = new User(data);
  usr
    .save()
    //ken tsajel b shih bch nekhou l objet w nabthou f response lel front
    .then((savedUser) => {
      res.send(savedUser);
    })
    //ken fama err ysir l affichage teha
    .catch((err) => {
      res.send(err);
    });
});
//méthode ashel
router.post("/create", async (req, res) => {
  try {
    data = req.body;
    usr = new User(data);
    savedUser = await usr.save();
    res.send(savedUser);
  } catch (error) {
    res.send(error);
  }
});

router.get("/getall", (req, res) => {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get("/all", async (req, res) => {
  try {
    users = await User.find({ age: 21 });
    res.send(users);
  } catch (error) {
    res.send(error);
  }
});

router.get("/getbyid/:id", (req, res) => {
  myid = req.params.id;
  User.findOne({ _id: myid })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get("/byid/:id", async (req, res) => {
  try {
    id = req.params.id;
    user = await User.findById({ _id: id });

    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

router.put("/update/:id", (req, res) => {
  id = req.params.id;
  newData = req.body;
  User.findByIdAndUpdate({ _id: id }, newData)
    .then((updated) => {
      res.send(updated);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.put("/upd/:id", async (req, res) => {
  try {
    id = req.params.id;
    newData = req.body;
    updated = await User.findByIdAndUpdate({ _id: id }, newData);

    res.send(updated);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/delete/:id", (req, res) => {
  id = req.params.id;
  User.findByIdAndDelete({ _id: id })
    .then((deletedUser) => {
      res.send(deletedUser);
    })
    .catch((err) => {
      res.send(err);
    });
});
router.delete("/del/:id", async (req, res) => {
  try {
    id = req.params.id;
    deletedUser = await User.findByIdAndDelete({ _id: id });

    res.send(deletedUser);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
