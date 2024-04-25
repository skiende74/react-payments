import React from "react";
import InputField from "../../components/InputField/InputField";
import { Validator } from "@/hooks/useValidation";
import useInput from "@/hooks/useInput";
import useValidation from "@/hooks/useValidation";
import { INPUT_COUNTS } from "@/constants/condition";

const VALID_LENGTH = 2;
const MAX_LENGTH = VALID_LENGTH;
const LABEL = "비밀번호 앞 2자리";
const INPUTS_COUNT = INPUT_COUNTS.OWNER_NAME;
const individualValidators: Validator[] = [
  {
    validate: (input: string) => /^[0-9]*$/.test(input),
    errorMessage: "숫자로 입력해주세요.",
  },
  {
    errorMessage: `길이는 ${VALID_LENGTH}여야합니다.`,
    validate: (input: string) => input.length === 0 || input.length === VALID_LENGTH,
  },
];

const PasswordInputField = ({ reduceds }: { reduceds: ReturnType<typeof useInput>[] }) => {
  const validationStates = reduceds.map((reduced) => useValidation(reduced, individualValidators));
  return (
    <InputField>
      <InputField.Label>{LABEL}</InputField.Label>
      <InputField.Inputs>
        {Array.from({ length: INPUTS_COUNT }).map((_, index) => (
          <InputField.Input
            type="password"
            key={index}
            isError={!validationStates[index].inputState.isValid}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (event.target.value.length > MAX_LENGTH) return;
              validationStates[index].setValue(event.target.value);
            }}
            value={validationStates[index].inputState.value}
          ></InputField.Input>
        ))}
      </InputField.Inputs>
      <InputField.ErrorMessage>
        {validationStates.reduce((prev, cur) => prev || cur.inputState.errorMessage, "")}
      </InputField.ErrorMessage>
    </InputField>
  );
};

export default PasswordInputField;