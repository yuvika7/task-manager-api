const Task = require("../models/taskModel");

const createTask = async (req, res) => {

  try {

    const { title, description } = req.body;

    const task = await Task.create({
      user: req.user.id,
      title,
      description,
    });

    res.status(201).json(task);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  createTask,
};