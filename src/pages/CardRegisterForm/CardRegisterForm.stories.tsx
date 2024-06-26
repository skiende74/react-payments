import type { Meta, StoryObj } from "@storybook/react";
import CardRegisterForm from "./CardRegisterForm";
import useInput from "@/hooks/useInput";
import { useState } from "react";

const CardRegisterFormWithHook = () => {
  const cardNumbersStates = [useInput(""), useInput(""), useInput(""), useInput("")];
  const expirationDateStates = [useInput(""), useInput("")];
  const ownerNameStates = [useInput(""), useInput("")];
  const cardCompanyStates = [useInput("BC카드")];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setIsCVCFocused] = useState<boolean>(false);

  return (
    <CardRegisterForm
      cardNumbersStates={cardNumbersStates}
      expirationDateStates={expirationDateStates}
      ownerNameStates={ownerNameStates}
      CVCStates={[useInput("")]}
      passwordStates={[useInput("")]}
      setIsCVCFocused={setIsCVCFocused}
      cardCompanyStates={cardCompanyStates}
    />
  );
};

const meta = {
  title: "CardRegisterForm",
  component: CardRegisterForm,
} satisfies Meta<typeof CardRegisterForm>;

export default meta;

type Story = StoryObj<typeof CardRegisterForm>;

export const Default: Story = {
  render: () => <CardRegisterFormWithHook />,
};
