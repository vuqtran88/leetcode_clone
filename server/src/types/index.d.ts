export interface ITestcase {
    id: string;
    params: IParam[];
    expected: string;
    problemId: string;
};

export interface IParam {
    name: string;
    type: string;
    value: string;
};

export interface IProblemDocument extends Document {
    title: string;
    description: string;
    difficulty: 'easy' | 'medium' | 'hard';
    executionMethod: {
        name: string;
        params: [IExecutionMethodParam];
    };
    solutions: string[];
}

interface ISubmission extends Document {
    code: string;
    problemId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    timeStamp: Date;
}

export interface IExecutionMethodParam {
    name: string;
    type: string;
}
