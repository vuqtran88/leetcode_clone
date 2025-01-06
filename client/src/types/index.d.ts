export interface ProblemDocument {
    title: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard';
    executionMethod: {
        name: string;
        params: [executionMethodParam] | [];
    };
    solutions: string[];
}

export interface executionMethodParam {
    name: string;
    type: string;
}