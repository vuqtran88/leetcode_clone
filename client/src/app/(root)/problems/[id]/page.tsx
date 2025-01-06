'use client'

import { useEffect, useState } from 'react';
import CodeMirror from "@uiw/react-codemirror";
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import TestcaseEditor from '@/components/TestcaseEditor';
import { getProblem } from '@/app/_api/problemsApi';
import { ProblemDocument } from '@/types';
import { useParams } from 'next/navigation';


const defaultProblem: ProblemDocument = {
    title: "",
    description: "",
    difficulty: "easy",
    executionMethod: {
        name: "",
        params: []
    },
    solutions: []
    };

const defaultCode = {
    javascript: `function solution() {
    // Your solution here
}`,
    python: `def solution():
    # Your solution here`
}

const ProblemDetails = () => {
    
    const { id: problemId } : {id: string} = useParams();
    const [code, setCode] = useState("");
    const [language, setLanguage] = useState<string>("javascript");
    const [fetchedProblem, setFetchingProblem] = useState<ProblemDocument>(defaultProblem);

    useEffect(() => {
        if (problemId) {
            getProblem(problemId).then((problem) => {
                if (problem === null) {
                    return;
                }
                setFetchingProblem((prev) => {
                    console.log("Fetched problem from API:", problem);
                    return problem; 
                });
            });
        }

        setCode(defaultCode.javascript);
    }, [problemId]);

    const languageMap: { [key: string]: any } = {
        "javascript": javascript(),
        "python": python()
    };

    const languageChange = (val: string): void => { 
        setLanguage(val);
        setCode(defaultCode[val as keyof typeof defaultCode]);
    };

    return (
        <>
            <div className='flex flex-row h-screen'>
                <div className='flex flex-col w-1/3 p-4 border rounded-lg border-gray-700 m-2'>
                    <h1>{fetchedProblem.title}</h1>
                    <p>{fetchedProblem.description}</p>
                </div>
                <div className='flex flex-col flex-grow p-4 overflow-auto border rounded-lg border-gray-700 m-2'>
                    <div>
                        <div className="m-2">
                            <Select defaultValue='javascript' onValueChange={languageChange}>
                                <SelectTrigger className="w-[120px] h-[5px]">
                                    <SelectValue placeholder="" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                    <SelectItem value="javascript">JavaScript</SelectItem>
                                    <SelectItem value="python">Python</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <CodeMirror
                            className='w-full m-2'
                            value={code}
                            height="500px"
                            theme={dracula} // CodeMirror theme
                            extensions={[languageMap[language]]} // Language mode
                            onChange={(value) => {
                                setCode(value);
                            }}
                        />
                        <Button className='ml-2 h-7 w-20'>Submit</Button>
                        <Button className='ml-2 h-7 w-20'>Run</Button>
                        <div className='m-2'>
                            <TestcaseEditor executionMethodParams={fetchedProblem.executionMethod.params} />
                        </div>
                    </div>                    
                </div>
            </div>
        </>
    );
};

export default ProblemDetails;