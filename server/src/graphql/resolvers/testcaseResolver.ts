import { GraphQLJSONObject } from "graphql-type-json";
import { Testcase } from "../../models/testcase";
import { ITestcase } from "../../types";

export const testcaseResolver = {
    JSON: GraphQLJSONObject, // Map the JSON scalar

    Query: {
        getTestcases: async () => {
            return await Testcase.find();
        },
        getTestcaseById: async ({ id }: { id: string }) => {
            return await Testcase.findById(id);
        }
    },
    Mutation: {
        addTestcase: async ({ testcase }: { testcase: ITestcase }) => {
            return await Testcase.create(testcase);
        },
        updateTestcase: async ({ id, testcase }: { id: string, testcase: ITestcase }) => {
            return await Testcase.findByIdAndUpdate(id, testcase, { new: true });
        },
        deleteTestcase: async ({ id }: { id: string }) => {
            return await Testcase.findByIdAndDelete(id);
        }
    }
}