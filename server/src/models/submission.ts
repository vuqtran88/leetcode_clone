import mongoose, { Schema } from "mongoose";

export const submissionSchema = new Schema({
    code: { type: String, required: true },
    problemId: { type: Schema.Types.ObjectId, ref: "Problem", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    timeStamp: { type: Date, default: Date.now }
});

export const Submission = mongoose.model("Submission", submissionSchema);