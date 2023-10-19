const router = require('express').Router();
const User = require('../models/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const encryptPassword = (password) => {
  const encrypt = bcrypt.hashSync(password, 10);
  console.log('ENCRYPT:', encrypt);
}

// Create User
router.post('/signup', async (req, res) => {
  try {
    const user = new User({
      firstName: req.body.first,
      lastName: req.body.last,
      email: req.body.mail,
      password: bcrypt.hashSync(req.body.pass, 13)
    });

    const newUser = await user.save();

    const token = jwt.sign({ id: newUser['_id'] }, process.env.JWT, { expiresIn: "1 day" });

    res.status(200).json({
      user: newUser,
      message: 'Success! User Created!',
      token
    })
  } catch (err) {
    res.status(500).json({
      ERROR: err.message
    });
  }
});

// User Login
router.post('/login', async function (req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) throw new Error('Email or Password does not match');

    const token = jwt.sign({ id: user._id }, process.env.JWT, { expiresIn: '1 day' });

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) throw new Error('Email or Password does not match');

    res.status(200).json({
      user,
      message: 'Successful Login!',
      token
    });
  } catch (err) {
    res.status(500).json({
      ERROR: err.message
    })
  }
})

router.patch('/:id', async(req, res) => {
  try {
    let _id = req.params.id;
    let owner = req.user.id;

    console.log(_id);
    console.log(owner);

    let updatedInfo = req.body;

    const updated = await User.findOneAndUpdate({ _id, owner }, updatedInfo, { new: true });

    if (!updated)
      throw new Error("Invalid Pizza/User Combination")

    res.status(200).json({
      message: `${updated._id} Updated!`,
      updated
    })
} catch (err) {
    errorResponse(res, err);
}
});


router.delete('/:id', async (req, res) => {
  try {
  const { id } = req.params;
  let owner = req.user.id;
  const deletedPizza = await Pizza.deleteOne({ _id: id, owner });
if (!deletedPizza.deletedCount) {
  throw new Error('could not find pizza bud')
} 
  res.status(200).json({ 
    message: 'Pizza Deleted!',
    deletedPizza
  });
} catch (error) {
  res.status(500).json({ error: error.message });
}
})

module.exports = router;