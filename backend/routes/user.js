const express = require('express');
const zod = require('zod');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../config.js");
const { User } = require("../db.js");
const bcrypt = require('bcrypt');
const { authMiddleware } = require("../middleware.js");


const signupver = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string()
});

router.post("/signup", async (req, res) => {
  const { success } = signupver.safeParse(req.body);  //safeParse returns an object success:true 
  if (!success) {
    return res.status(411).json({
      msg: " Email address is already taken or Incorrect Inputs"
    })
  }

  const existingUser = await User.findOne({
    username: req.body.username
  })

  if (existingUser) {
    return res.status(411).json({
      msg: "Email already exisits"
    })
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10)

  const user = await User.create({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: hashedPassword
  })

  const userId = user._id;

  await Account.create({
    userId,
    balance :1 + Math.random()*100000 
  })

  const token = jwt.sign({
    userId
  }, JWT_SECRET);

  res.json({
    msg: " User successfully created",
    token: token
  })
})

const signinver = zod.object({
  username: zod.string(),
  password: zod.string()

})

router.post("/signin", async (req, res) => {

  const { success } = signinver.safeParse(req.body)

  if (!success) {
    return res.status(411).json({
      msg: "Incorect Inputs"
    })
  }

  const exuser = await User.findOne({
    username: req.body.username,
  })

  if (!exuser) {
    return res.status(411).json({
      msg: "user not found"
    })
  }

  const isPasswordDn = await bcrypt.compare(req.body.password, exuser.password)

  if (isPasswordDn) {
    const token = jwt.sign({
      userId: exuser._id
    }, JWT_SECRET);

    res.json({
      token: token
    })

    return;
  }


  res.status(411).json({
    msg: "Error while loggin in"
  })
})

const updateBody = zod.object({
  username: zod.string().optional(),
  firstName: zod.string().optional(),
  password: zod.string().optional()
})

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    return res.status(403).json({
      msg: "Invalid format"
    })
  }

  await User.updateOne({
    _id: req.userId
  }, req.body);

  res.json({
    msg: "User updated successfully"
  })
})


router.get("/bulk".authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [{
      firstName: {
        "$regex": filter
      },
    }, {
      lastName: {
        "$regex": filter
      }
    }]
  })

  res.json({
    user: users.map(user => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName
    }))
  })
});




module.exports = router;


