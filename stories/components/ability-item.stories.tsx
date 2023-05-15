import AbilityItem from "@/components/ability-item";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof AbilityItem> = {
  title: "Shared/Ability Item",
  component: AbilityItem,
  argTypes: {
    type: {
      type: "string",
    },
    name: {
      type: "string",
    },
    usage: {
      options: ["other", "at-will", "recharge", "per-battle", "per-day"],
      control: { type: "select" },
    },
    description: {
      type: "string",
    },
  },
  args: {
    type: "Rare Ability",
    name: "Bob",
    description: "Yo!",
    usage: "other",
    feats: [
      {
        tier: "adventurer",
        description: "A really cool adventurer feat!",
      },
    ],
  },
};

export default meta;

type Story = StoryObj<typeof AbilityItem>;

export const Default: Story = {
  render(props) {
    return <AbilityItem {...props} />;
  },
};
