import type { Request, Response } from "express";
import { Task, taskStatuses, type TaskStatus } from "../models/task.model.js";

function isTaskStatus(value: unknown): value is TaskStatus {
  return taskStatuses.includes(value as TaskStatus);
}

export async function getTasks(_req: Request, res: Response) {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
}

export async function createTask(req: Request, res: Response) {
  try {
    const { title, description = "", status = "To Do" } = req.body;

    if (!title || typeof title !== "string" || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (!isTaskStatus(status)) {
      return res.status(400).json({ message: "Invalid task status" });
    }

    const task = await Task.create({
      title,
      description,
      status,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to create task" });
  }
}

export async function updateTaskStatus(req: Request, res: Response) {
  try {
    const { status } = req.body;

    if (!isTaskStatus(status)) {
      return res.status(400).json({ message: "Invalid task status" });
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to update task" });
  }
}

export async function deleteTask(req: Request, res: Response) {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
}
