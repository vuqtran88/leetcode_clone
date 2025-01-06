import React, { use, useEffect, useState } from "react";
import Testcase from "./Testcase";
import { executionMethodParam } from "@/types";

type InputFieldType = {
  name: string;
  type: "List" | "number" | "string";
  value: string;
};

type TestcaseType = {
  input: InputFieldType[];
};

type TestcaseEditorProps = {
  executionMethodParams: [executionMethodParam] | [];
};

const TestcaseEditor = ({ executionMethodParams } : TestcaseEditorProps) => {

  const defaultInput =
  { 
      input: executionMethodParams.map((param) => {
        return {
          name: param.name, type: param.type as "List" | "number" | "string", value: param.type.startsWith("List") ? "[]" : "",
        };
      })
  }

  const [testcases, setTestcases] = useState<TestcaseType[]>(
    [defaultInput]
  );

  useEffect(() => {
    setTestcases([defaultInput]);
  }, [executionMethodParams]);

  const handleInputChange = (
    testcaseIndex: number,
    inputIndex: number,
    newValue: string
  ) => {
    const updatedTestcases = [...testcases];
    updatedTestcases[testcaseIndex].input[inputIndex].value = newValue;
    setTestcases(updatedTestcases);
  };

  const addTestcase = () => {
    setTestcases([
      ...testcases,
      defaultInput,
    ]);
  };

  return (
    <div>
      {testcases.map((testcase, index) => (
        <Testcase
          key={index}
          testcase={testcase} // Pass the renamed prop
          onInputChange={(inputIndex, newValue) =>
            handleInputChange(index, inputIndex, newValue)
          }
        />
      ))}
      <button
        onClick={addTestcase}
        style={{ marginTop: "10px", padding: "10px 20px", cursor: "pointer" }}
      >
        Add Test Case
      </button>
    </div>
  );
};

export default TestcaseEditor;