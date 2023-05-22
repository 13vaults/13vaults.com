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
    description: {
      raw: "Yo!",
      html: "<p>Yo!</p>",
    },
    usage: "other",
    feats: [
      {
        tier: "adventurer",
        description: {
          raw: "A really cool adventurer feat!",
          html: "<p>A really cool adventurer feat!</p>",
        },
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
