import { ProblemDocument } from "@/types";

const severUrl = process.env.SERVER_URL!;
const problemsApiUrl = `${severUrl}/api/problems`;

export const getProblem = async (problemId: string) => {
    try {
        console.log(problemsApiUrl);
        const response = await fetch(`${severUrl}/api/problems/${problemId}`);
        const data: ProblemDocument = await response.json();
        return data;
    }
    catch (error) {
        console.error("error");
        console.error(error);
        return null;
    }
};

export const getTestcases = async (problemId: string) => {
    try {
        const response = await fetch(`${problemsApiUrl}/${problemId}/testcases`);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}
