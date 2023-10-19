const router = require("express").Router();
const Message = require("../models/messages.model");
const User = require("../models/users.model")
const currentDate = new Date();

function errorResponse(res, err) {
  res.status(500).json({
    ERROR: err.message,
  });
};

router.post('/:id', async (req, res) => {
  try{
  //! req for posting message
  // we need toppings - string, crust - string, and slices - number
  const userMessage = {
    
    date: currentDate,
    text: req.body.text,
    owner: req.user._id,
  };

  //! Creating a new message
  const messagePost =  new Message(userMessage);

  //! Save message to database
  const newMessage = await messagePost.save(); 

res.status(200).json({message:'Message Posted ;)!'})
  // newPizza.save().then(saved => {
   
  //?4. assuming our pizza was added to the database successfully, we send a response
  
  } catch (err) {
    res.status(500).json({
      ERROR: err.message,
    });
  }
}); 

module.exports = router;