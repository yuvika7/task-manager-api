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

const getTasks = async (req, res) => {

  try {

    const tasks = await Task.find({
      user: req.user.id,
    });

    res.status(200).json(tasks);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const updateTask = async (req, res) => {

  try {

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // Ownership validation
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updatedTask);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const deleteTask = async (req, res) => {

  try {

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // Ownership validation
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      message: "Task deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};