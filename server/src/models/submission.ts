import mongoose, { Schema, Document } from "mongoose";
import { SubmissionType } from "../types";

export const submissionSchema = new Schema({
    code: { type: String, required: true },
    problemId: { type: Schema.Types.ObjectId, ref: "Problem", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    timeStamp: { type: Date, default: Date.now }
});

export const Submission = mongoose.model<SubmissionType>("Submission", submissionSchema);