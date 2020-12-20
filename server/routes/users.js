import { Router } from "express";
import User from "./../models/user";

var router = Router();

/* GET users listing. */
router.post("/login", function (req, res, next) {
  res.send({ msg: "login not implemented" });
});

router.post("/:id?", async function (req, res, next) {
  try {
    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      ssn: req.body.ssn,
      address: req.body.address,
    });

    const result = await user.save();
    
    const resp = {
      msg: "created user",
      data: result,
    };

    res.status(201).send(resp);
  } catch (error) {
    throw error;
  }
});

router.get("/", async function (req, res, next) {
  try {
    const users = await User.find();

    res.status(200).send({ users });
  } catch (error) {
    throw error;
  }
});

export default router;
