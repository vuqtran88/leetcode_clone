import React from "react";

type InputFieldProps = {
  input: {
    name: string;
    type: "List" | "number" | "string";
    value: string;
  };
  onChange: (newValue: string) => void;
};

const InputField: React.FC<InputFieldProps> = ({ input, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label className="block ml-2">
        {input.name} ({input.type})
      </label>
      <input
          type={input.type === "number" ? "number" : "text"}
          value={input.value}
          onChange={handleChange}
          className="m-2 bg-gray-700 border rounded-m border-gray-700"
       />
    </div>
  );
};

export default InputField;