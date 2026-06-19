import { model, Schema } from "mongoose";

export const taskStatuses = ["To Do", "In Progress", "Done"] as const;

export type TaskStatus = (typeof taskStatuses)[number];

export type TaskDocument = {
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
};

const taskSchema = new Schema<TaskDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      enum: taskStatuses,
      default: "To Do",
    },
  },
  {
    timestamps: true,
  },
);

export const Task = model<TaskDocument>("Task", taskSchema);
