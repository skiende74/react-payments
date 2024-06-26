import React from "react";
import InputField from "../../components/InputField/InputField";
import { Validator } from "@/hooks/useValidation";
import useValidation from "@/hooks/useValidation";
import useInput from "@/hooks/useInput";
import { INPUT_COUNTS } from "@/constants/condition";

const VALID_LENGTH = INPUT_COUNTS.EXPIRATION_DATE;
const INPUTS_COUNT = INPUT_COUNTS.EXPIRATION_DATE;
const individualValidators: Validator[] = [
  {
    errorMessage: "월은 1~12의 범위여야합니다.",
    validate: (month: string) => month === "" || (Number(month) >= 1 && Number(month) <= 12),
    index: [0],
  },
  {
    errorMessage: `길이는 ${VALID_LENGTH}여야합니다.`,
    validate: (input: string) => input.length === 0 || input.length === VALID_LENGTH,
    index: [0, 1],
  },
  {
    errorMessage: `숫자만 입력 가능합니다.`,
    validate: (input: string) => input.length === 0 || /^[0-9]*$/.test(input),
  },
];

const ExpirationDateInputField = ({ inputStates }: { inputStates: ReturnType<typeof useInput>[] }) => {
  const validationStates = [
    useValidation(inputStates[0], individualValidators),
    useValidation(inputStates[1], individualValidators.slice(1)),
  ];
  return (
    <InputField>
      <InputField.Label>유효기간</InputField.Label>
      <InputField.Inputs>
        {Array.from({ length: INPUTS_COUNT }).map((_, index) => (
          <InputField.Input
            key={index}
            isError={!validationStates[index].isValid}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (event.target.value.length > VALID_LENGTH) return;
              validationStates[index].setValue(event.target.value);
            }}
            value={validationStates[index].value}
            placeholder={index === 0 ? "MM" : "YY"}
          ></InputField.Input>
        ))}
      </InputField.Inputs>
      <InputField.ErrorMessage>
        {validationStates.reduce((prev, cur) => prev || cur.errorMessage, "")}
      </InputField.ErrorMessage>
    </InputField>
  );
};

export default ExpirationDateInputField;
