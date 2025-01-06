import React from "react";
import InputField from "./InputField";

type InputFieldType = {
  name: string;
  type: "List" | "number" | "string";
  value: string;
};

type TestcaseType = {
  input: InputFieldType[];
};

type TestcaseProps = {
  testcase: TestcaseType; // Renamed the prop to avoid conflict
  onInputChange: (inputIndex: number, newValue: string) => void;
};

const Testcase: React.FC<TestcaseProps> = ({ testcase, onInputChange }) => {
  return (
    <div className="border rounded-lg border-gray-700 mt-2 mb-2">
      {testcase.input.map((input, index) => (
        <InputField
          key={index}
          input={input}
          onChange={(newValue) => onInputChange(index, newValue)}
        />
      ))}
    </div>
  );
};

export default Testcase;