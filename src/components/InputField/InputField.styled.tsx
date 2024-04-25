import styled from "styled-components";
import Input from "../Input/Input";
import { ReactNode } from "react";
const Label = styled.label`
  font-size: 12px;
  font-weight: 500;
`;

const Inputs: React.FC<{
  children: ReturnType<typeof Input>[] | ReturnType<typeof Input>;
}> = styled.div`
  display: flex;
  gap: 8px;
  height: 32px;
`;

const InputField: React.FC<{
  children: ReactNode | ReactNode[];
}> = styled.div`
  gap: 8px;
  display: flex;
  flex-direction: column;
`;

const ErrorMessage = styled.div`
  font-size: 9.5px;
  font-weight: 400;
  color: ${({ theme }) => theme.COLOR.error};
  height: 14px;
`;

const S = {
  Label,
  Inputs,
  ErrorMessage,
  InputField,
};

export default S;
