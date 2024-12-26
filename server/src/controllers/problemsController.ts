import { Request, Response } from 'express';
import {executionMethodParam, Problem, ProblemDocument} from '../models/problem';
import { TestCase } from '../models/testCase';
import { Submission } from '../models/submission';

import { PythonShell } from 'python-shell';

export const getProblem = async (req: Request, res: Response) => {

    const { id } = req.params;
    await Problem.findById(id, (err: Error, problem: ProblemDocument) => {
        if (err) {
            res.status(500).send('Problem not found');
        } else {
            res.status(200).send(problem);
        }
    });  
}

export const createProblem = async (req: Request, res: Response) => {

    const problem: ProblemDocument = { ...req.body };

    try {
        await Problem.create(problem);
        res.status(201).send('Problem created');
    } catch (error) {
        console.error(error);
        res.status(500).send('Problem not created');
    };
}

export const createTestCase = async (req: Request, res: Response) => {
    const problemId = req.params.id;
    const { input, output } = req.body;

    try {
        const testCase = await TestCase.create({ input, output, problemId });
        console.log("Test case created: ", testCase);
        res.status(201).send('Test case created');
    } catch (error) {
        console.error(error);
        res.status(500).send('Test case not created');
    }
}

export const submitCode = async (req: Request, res: Response) => {

    const problemId = req.params.id;
    const { userId, code } = req.body;

    try {
        await Submission.create({ userId, code, problemId });
        res.status(201).send('Code submitted');
    } catch (error) {
        console.error(error);
        res.status(500).send('Submission failed');
    }
}

export const runCode = async (req: Request, res: Response) => {
    const { code, testCases }: { 
        code: string; 
        testCases: { input: Record<string, any>}[]; 
    } = req.body;

    const problemId = req.params.id;

    if (!code || !testCases || !problemId) {
        return res.status(400).json({ message: 'Code, test cases, and problemId are required.' });
    }

    try {
        // Fetch problem details from database
        const problem: ProblemDocument | null = await Problem.findById(problemId);
        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }

        const { executionMethod, solutions } = problem;
        if (!executionMethod || !executionMethod.name || !executionMethod.params || !solutions || solutions.length === 0) {
            return res.status(500).json({ message: 'Problem execution details are incomplete' });
        }

        const { name: methodName, params } = executionMethod;
        // Process test cases
        const results = await Promise.all(
            testCases.map(async (testCase) => {
                const { input } = testCase;
                const userCodeResult = await executePythonCode(code, methodName, params, input);
                const solutionResult = await executePythonCode(solutions[0], methodName, params, input);

                console.log('User code result:', userCodeResult);
                console.log('Solution result:', solutionResult);

                return {
                    success: JSON.stringify(userCodeResult) === JSON.stringify(solutionResult),
                    expected: solutionResult,
                    actual: userCodeResult,
                };
            })
        );

        // Summarize results
        const passed = results.filter((result) => result.success).length;
        const failed = results.length - passed;

        return res.status(200).json({
            summary: {
                passed,
                failed,
                total: results.length,
            },
            details: results,
        });
    } catch (error) {
        console.error('Error executing Python code:', error);
        return res.status(500).json({ message: 'Internal Server Error', error: error });
    } 
}

const executePythonCode = async (code: string, methodName: string, params: executionMethodParam [], input: Record<string, any>) => {

    // Generate arguments dynamically from `params`
    const argList = params
        .map((param: { name: string; type: string }) => JSON.stringify(input[param.name]))
        .join(', ');

    // Generate Python script dynamically
    const pythonScript = `
# import required modules
from typing import List, Dict, Tuple, Optional

${code}

# Driver code
solution = Solution()
method = getattr(solution, "${methodName}")
result = method(${argList})
print(result)
`;

    // Execute Python script
    try {
        const pythonOutput = await PythonShell.runString(pythonScript, { mode: 'text', pythonOptions: ['-u'] });
        if (pythonOutput && pythonOutput[0]) {
            return JSON.parse(pythonOutput[0].trim());
        } else {
            throw new Error('No output from Python script');
        }
    } catch (err:any) {
        throw new Error(`Python execution error: ${err.message}`);
    }
}