import Button from "@/components/button";
import { Meta, StoryObj } from "@storybook/react";
import Link from "next/link";

const meta: Meta<typeof Button> = {
  title: "Shared/Button",
  component: Button,
  args: {
    children: "Button",
    size: "normal",
    color: "primary",
    variant: "normal",
  },
  argTypes: {
    size: {
      options: ["normal", "large"],
      control: { type: "select" },
    },
    variant: {
      options: ["normal", "decorative", "fancy"],
      control: { type: "select" },
    },
    color: {
      options: ["primary", "secondary", "gold"],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  parameters: { controls: { include: ["size", "color", "variant"] } },
  render(props) {
    return <Button {...props} />;
  },
};

export const LinkButton: Story = {
  parameters: { controls: { include: ["size", "color", "href", "variant"] } },
  args: { href: "/link/path" },
  render(props) {
    return <Button as={Link} className="inline-block" {...props} />;
  },
};
