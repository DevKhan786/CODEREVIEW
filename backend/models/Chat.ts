import mongoose, { Schema, Document } from "mongoose";

interface IMessage {
  role: "user" | "assistant";
  content: string;
}

interface IChat extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  messages: IMessage[];
  createdAt: Date;
}

const ChatSchema = new Schema<IChat>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    messages: [
      {
        role: { type: String, enum: ["user", "assistant"], required: true },
        content: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IChat>("Chat", ChatSchema);
