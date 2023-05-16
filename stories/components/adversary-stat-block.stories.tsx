import AdversaryStatBlock from "@/components/adversary-stat-block";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof AdversaryStatBlock> = {
  title: "Shared/Adversary Stat Block",
  component: AdversaryStatBlock,
  argTypes: {
    sizeOrStrength: {
      options: [
        "normal",
        "large",
        "huge",
        "double-strength",
        "triple-strength",
      ],
      control: { type: "select" },
    },
    strengthModifier: {
      options: [null, "elite", "weakling"],
      control: { type: "select" },
    },
    role: {
      options: [
        "mook",
        "troop",
        "blocker",
        "wrecker",
        "caster",
        "archer",
        "spoiler",
        "leader",
      ],
      control: { type: "select" },
    },
  },
  args: {
    name: "Giant Web Spider",
    initiative: 4,
    level: 2,
    role: "troop",
    type: "BEAST",
    sizeOrStrength: "normal",
    hp: 68,
    ac: 17,
    pd: 16,
    md: 12,
    flavorText:
      "The largest nests of these spiders exist in the root systems of abandoned elven forests and in the caverns surrounding dark elf temples. Elsewhere, you’re normally dealing with only one or two spiders at a time on the hunt for a meal.",
    specials: [
      {
        name: "Wall-crawler",
        text: "A giant web spider can climb on ceilings and walls as easily as it moves on the ground.",
      },
    ],
    nastierSpecials: [],
    attacks: [
      {
        name: "Crafty fangs",
        targetDefense: "AC",
        attackModifier: 7,
        damageEffects:
          "5 damage, and 5 ongoing poison damage; if the target is dazed or stuck, the ongoing poison damage is 10 instead of 5",
      },
      {
        name: "Web",
        range: "close-quarters",
        targetDefense: "AC",
        attackModifier: 7,
        limitedUseDescription: "1/battle",
        damageEffects:
          "3 damage, and the target is dazed until the end of the spider’s next turn",
        targets: ["up to 2 nearby enemies in a group"],
        triggeredEffects: [
          {
            name: "Natural 18+",
            text: "The target is also stuck until the end of the spider’s next turn.",
          },
        ],
      },
    ],
  },
};

export default meta;

type Story = StoryObj<typeof AdversaryStatBlock>;

export const Default: Story = {
  render(props) {
    return <AdversaryStatBlock {...props} />;
  },
};
