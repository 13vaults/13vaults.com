import Button from "@/components/button";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  title: "Shared/Button",
  component: Button,
  args: {
    children: "Button",
    size: "normal",
    color: "primary",
  },
  argTypes: {
    size: {
      options: ["normal", "large"],
      control: { type: "select" },
    },
    color: {
      options: ["primary", "secondary"],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  parameters: { controls: { include: ["size", "color"] } },
  render(props) {
    return <Button {...props} />;
  },
};
