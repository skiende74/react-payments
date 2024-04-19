import { limitNumberLength } from "@/components/utils/numberHelper";
import { FocusEvent, useState } from "react";
import React from "react";
import { makeStringArray } from "@/components/utils/arrayHelper";

type validate = (input: string[]) => string;
interface Props {
  initialValue: string[];
  onBlurValidate?: validate;
  onChangeValidate?: validate;
  maxNumberLength?: number;
  validLength?: number;
}

const useInput = ({
  initialValue = [],
  onBlurValidate = (inputs) => "",
  onChangeValidate = (inputs) => "",
  maxNumberLength: maxLength,
  validLength,
}: Props) => {
  const [input, setInput] = useState<string[]>(initialValue);
  const [errorMessages, setErrorMessages] = useState(
    makeStringArray(initialValue.length)
  );

  const updateErrorMessages = (errorMessage: string, index: number) => {
    setErrorMessages((prev) => {
      const newErrorMessages = [...prev];
      newErrorMessages[index] = errorMessage;
      return newErrorMessages;
    });
  };

  const validateLength: validate = (inputs) => {
    if (validLength === undefined) return "";
    return inputs.every(
      (input) => input.length === 0 || input.length === validLength
    )
      ? ""
      : "유효하지 않은 길이입니다.";
  };
  const onBlurValidateWrapper: validate = (inputs) => {
    if (validateLength(inputs).length > 0) return validateLength(inputs);
    if (onBlurValidate(inputs).length > 0) return onBlurValidate(inputs);
    return "";
  };

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    if (maxLength) {
      event.target.value = limitNumberLength({
        value: event.target.value,
        maxLength,
      });
    }

    const newValue = event.target.value;

    setInput((prev) => {
      const newInput = [...prev];
      newInput[index] = newValue;
      return newInput;
    });

    const errorMessageOnChange = onChangeValidate([newValue]);
    if (errorMessageOnChange) {
      updateErrorMessages(errorMessageOnChange, index);
      return;
    }

    const errorMessageOnBlur = onBlurValidateWrapper([newValue]);
    if (errorMessageOnBlur) return;

    updateErrorMessages("", index);
  };

  const onBlur = (event: FocusEvent<Element, Element>, index: number) => {
    const errorMessage = onBlurValidateWrapper(input);
    if (errorMessage.length > 0) {
      updateErrorMessages(errorMessage, index);
      return;
    }

    updateErrorMessages("", index);
  };

  return { input, errorMessages, onChange, onBlur };
};
export default useInput;
