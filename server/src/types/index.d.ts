export interface TestcaseType {
    id: string;
    params: ParamType[];
    expected: string;
    problemId: string;
};

export interface ParamType {
    name: string;
    type: string;
    value: string;
};

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

interface SubmissionType extends Document {
    code: string;
    problemId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    timeStamp: Date;
}

export interface executionMethodParam {
    name: string;
    type: string;
}
