import mongoose, { Schema } from "mongoose";

export const testCaseSchema = new Schema({
    input: { type: Map, of: mongoose.Schema.Types.Mixed, required: true },
    output: { type: mongoose.Schema.Types.Mixed, required: true },
    problemId: { type: Schema.Types.ObjectId, ref: "Problem" }
});

export const TestCase = mongoose.model("TestCase", testCaseSchema);