import mongoose, { model, Schema } from 'mongoose';

export interface ProblemDocument extends Document {
    title: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard';
    executionMethod: {
        name: string;
        params: [executionMethodParam];
    };
    solutions: string[];
}

export interface executionMethodParam {
    name: string;
    type: string;
}

export const problemSchema = new Schema<ProblemDocument>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true, default: 'easy' },
    executionMethod: { 
        name: {type: String, required: true},
        params: [
            {
                name: {type: String, required: true},
                type: {type: String, required: true}
            }
        ]
    },
    solutions: { type: [String], required: true },
});

export const Problem = model<ProblemDocument>('Problem', problemSchema);
