const router = require("express").Router();
const Message = require("../models/messages.model");
const validateSession = require("../middleware/validatesession");
const currentDate = new Date();

// Function for error response
function errorResponse(res, error) {
  res.status(500).json({
    ERROR: error.message,
  });
}

// Creating messages
router.post("/:id", validateSession, async (req, res) => {
  try {
    //! req for posting message

    const userMessage = {
      date: currentDate,
      text: req.body.text,
      ownerId: req.user._id,
    };

    //! Creating a new message
    const newMessage = new Message(userMessage);

    //! Save message to database
    await newMessage.save();

    res.status(200).json({ message: "Message Posted ;)!" });
  } catch (error) {
    res.status(500).json({
      ERROR: error.message,
    });
  }
});

// View all messages in room
router.get("/allMessages/:room", validateSession, async (req, res) => {
  try {
    if (!req.user) {
      res.status(500).json({ error: "Authentication required" });
    }
    const messages = await Message.find({ userMessage });

    if (!messages || messages.length === 0) {
      res.status(403).json({ message: "Message not found" });
    }

    res.status(200).json({ messages });
  } catch (error) {
    errorResponse(res, error);
  }
});

// Update messages
router.patch(
  "/updateMessage/:room/:message",
  validateSession,
  async (req, res) => {
    try {
      const room = req.params.room;
      const messageId = req.params.message;
      const owner = req.user.id;

      const message = await Message.findOne({ id: messageId, room });

      if (!message) {
        res.status(403).json({ error: "Message not found" });
      }

      if (message.owner !== owner) {
        res.status(403).json({ error: "This user cannot update this message" });
      }

      const updatedMessage = await message.save();

      res.status(200).json({
        message: "Message has been updated",
        message: updatedMessage,
      });
    } catch (error) {
      errorResponse(res, error);
    }
  }
);

// Delete messages
router.delete(
  "/deleteMessage/:room/:message",
  validateSession,
  async (req, res) => {
    try {
      const room = req.params.room;
      const messageId = req.params.message;
      const owner = req.user.id;
      const message = await Message.findById(messageId);

      if (!message) {
        res.status(403).json({ error: "Message not found" });
      }

      if (message.owner.toString() !== owner.toString()) {
        res.status(403).json({ error: "This user cannot delete this message" });
      }

      const deleteMessage = await Message.deleteOne({ id: messageId, room });

      if (!deleteMessage) {
        res.status(403).json({ error: "Message not found" });
      }

      res.status(200).json({
        message: "Message has been deleted",
        deletedMessage,
      });
    } catch (error) {
      errorResponse(res, error);
    }
  }
);

module.exports = router;
