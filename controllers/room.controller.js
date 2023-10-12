const router = require("express").Router();
const Room = require("../models/messageRoom.model");

function errorResponse(res, err) {
  res.status(500).json({
    ERROR: err.message,
  });
};

router.post("/room", async (req, res) => {
  
  try {
    const messageRoom = {
      title: req.body.title,
      description: req.body.desc,
      messages: req.body.message,
      ownerId: req.user._id
    };

    const room = new Room(messageRoom);
    const newRoom = await room.save();

    res.status(200).json({
      message: "New Room Created!",
      title: newRoom,
    });
  } catch (err) {
    errorResponse(res, err);
  }
});

// Get Single Room
router.get('/room/:id', async (req, res) => {
  try {
    const singleRoom = await Room.findOne({ _id: req.params.id });

    res.status(200).json({ found: singleRoom });
  } catch (err) {
    errorResponse(res, err);
  }
});

// Get All Rooms
router.get("/list", async (req, res) => {
  try {
    console.log('user:', req.user.id); 
    const getAllRooms = await Room.find(); 
    getAllRooms.length > 0 ?
      res.status(200).json({ getAllRooms })
      :
      res.status(404).json({ message: "No Rooms Found" });
  } catch (err) {
    errorResponse(res, err);
  }
});

// Update Room
router.patch('/:id', async(req, res) => {
  try {
    let _id = req.params.id;
    let owner = req.user.id;

    console.log(_id);
    console.log(owner);

    let updatedInfo = req.body;

    const updated = await Room.findOneAndUpdate({ _id, owner }, updatedInfo, { new: true });

    if (!updated)
      throw new Error("Invalid Room/User Combination")

    res.status(200).json({
      message: `${updated._id} Updated!`,
      updated
    })
    
    res.send('Patch Endpoint');
} catch (err) {
    errorResponse(res, err);
}
});

// Delete Room
router.delete('/:id', async (req, res) => {
  try {
  const { id } = req.params;
  let owner = req.user.id;
  const deletedRoom = await Room.deleteOne({ _id: id, owner });
if (!deletedPizza.deletedCount) {
  throw new Error('Could not find room')
} 
  res.status(200).json({ 
    message: 'Room Deleted!',
    deletedRoom
  });
} catch (error) {
  res.status(500).json({ error: error.message });
}
})

module.exports = router;