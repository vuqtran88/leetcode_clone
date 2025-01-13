import { IProblemDocument } from "../../types";
import { Problem } from "../../models/problem";

export const problemResolver = {
    Query: {
        getProblems: async () => {
            return await Problem.find();
        },

        getProblemById: async ({ id }: { id: string }) => {
            return await Problem.findById(id);
        }
    },

    Mutation: {
        addProblem: async ({ problem }: { problem: IProblemDocument }) => {
            return await Problem.create(problem);
        },

        updateProblem: async ({ id, problem }: { id: string, problem: IProblemDocument }) => {
            return await Problem.findByIdAndUpdate(id, problem, { new: true });
        },

        deleteProblem: async ({ id }: { id: string }) => {
            return await Problem.findByIdAndDelete(id);
        }
    }
}