import React from "react";
import InputField from "../components/InputField/InputField";
import useInputField, { IndividualValidator } from "@/hooks/useInputField";

const VALID_LENGTH = 2;
const INPUTS_COUNT = 2;
// const newValidator: IndividualValidator[] = [
//   {
//     errorMessage: "월은 1~12의 범위여야합니다.",
//     validate: (month: string) => month === "" || (Number(month) >= 1 && Number(month) <= 12),
//     index: [0],
//   },
//   {
//     errorMessage: `길이는 ${VALID_LENGTH}여야합니다.`,
//     validate: (input: string) => input.length === 0 || input.length === VALID_LENGTH,
//     index: [0, 1],
//   },
//   {
//     errorMessage: `입력은 숫자형이어야합니다.`,
//     validate: (input: string) => input.length === 0 || /^[0-9]*$/.test(input),
//   },
// ];
// const newValidationStates = useInputField({
//   individualValidators: newValidator,
//   length: INPUTS_COUNT,
// });

const ExpirationDateInputField = ({ validationStates }: { validationStates: ReturnType<typeof useInputField> }) => {
  return (
    <InputField>
      <InputField.Label>유효기간</InputField.Label>
      <InputField.Inputs>
        {Array.from({ length: INPUTS_COUNT }).map((_, index) => (
          <InputField.Input
            key={index}
            isError={!validationStates[index].inputState.isValid}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (event.target.value.length > VALID_LENGTH) return;
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

export default ExpirationDateInputField;
