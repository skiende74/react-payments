import React from "react";
import InputField from "../../components/InputField/InputField";
import { Validator } from "@/hooks/useValidation";
import useInput from "@/hooks/useInput";
import useValidation from "@/hooks/useValidation";
import { INPUT_COUNTS } from "@/constants/condition";

const VALID_LENGTH = 30;
const INPUTS_COUNT = INPUT_COUNTS.OWNER_NAME;
const individualValidators: Validator[] = [
  {
    validate: (input: string) => /^[a-zA-Z\s]*$/.test(input),
    errorMessage: "이름은 영어 대문자로 입력해주세요.",
  },
  {
    validate: (input: string) => !/\s{2,}/.test(input),
    errorMessage: "이름의 공백은 2회이상 연속되지 않아야 합니다.",
  },
];

const OwnerNameInputField = ({ inputStates }: { inputStates: ReturnType<typeof useInput>[] }) => {
  const validationStates = [useValidation(inputStates[0], individualValidators)];
  return (
    <InputField>
      <InputField.Label>소유자 이름</InputField.Label>
      <InputField.Inputs>
        {Array.from({ length: INPUTS_COUNT }).map((_, index) => (
          <InputField.Input
            key={index}
            isError={!validationStates[index].isValid}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (event.target.value.length > VALID_LENGTH) return;
              event.target.value = event.target.value.toUpperCase();
              validationStates[index].setValue(event.target.value);
            }}
            value={validationStates[index].value}
            placeholder="JOHN DOE"
          ></InputField.Input>
        ))}
      </InputField.Inputs>
      <InputField.ErrorMessage>
        {validationStates.reduce((prev, cur) => prev || cur.errorMessage, "")}
      </InputField.ErrorMessage>
    </InputField>
  );
};

export default OwnerNameInputField;
