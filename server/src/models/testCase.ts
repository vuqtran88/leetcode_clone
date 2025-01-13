import mongoose, { Schema } from "mongoose";
import { ITestcase } from "../types";

export const testcaseSchema = new Schema({
    params: [
        {
            name: { type: String, required: true },
            type: { type: String, required: true },
            value: { type: String, required: true }
        }
    ],
    expected: { type: mongoose.Schema.Types.Mixed, required: true },
    problemId: { type: Schema.Types.ObjectId, ref: "Problem" },
    tag: { type: String, enum: ["default", "hidden"], required: true, default: "default" }
});

export const Testcase = mongoose.model<ITestcase>("Testcase", testcaseSchema);