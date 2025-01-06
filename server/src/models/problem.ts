import { model, Schema } from 'mongoose';
import { ProblemDocument } from '../types';

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
