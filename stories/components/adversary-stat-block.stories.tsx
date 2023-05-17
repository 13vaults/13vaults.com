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
        "quadruple-strength",
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
    name: "Ailor the Draco-Druid",
    initiative: ["+23", "+17", "+12"],
    level: 11,
    role: "spoiler",
    type: "HUMANOID",
    sizeOrStrength: "quadruple-strength",
    hp: 1160,
    ac: 27,
    pd: 21,
    md: 25,
    flavorText:
      "Ailor’s power grows with every territory he consumes. Unless stopped, his insatiable hunger for power will lead him to devour the entire natural world.",
    specials: [
      {
        name: "Acts three times per round",
        text: "Ailor is a quadruple-strength enemy that gets to act three times per round. Roll once for initiative, adding +23, +17, and +12 to determine when he takes his three turns. Ailor isn’t required to use different attacks on each of his three turns in the round, but it’s a lot more interesting if you avoid repetition!",
      },
      {
        name: "Beyond your concept of time",
        text: "Any effect which would last until the end of the round, or until the end of Ailor’s next turn, instead lasts until the end of Ailor’s next action. Ailor makes checks to end ‘save ends’ effects at the end of each of his turns.",
      },
      {
        name: "Tainted blood",
        text: "If Ailor is struck by a critical hit in melee or staggered by a melee attack, he may make a tangling thorns attack as a free action.",
      },
      {
        name: "Command the earth",
        text: "At the start of battle, Ailor gains a number of druidic invocations equal to 1 + the number of relationship dice his foes possess with any of the following icons: the Three, the Elf Queen, the Prince of Shadows, or the Crusader. Successful maw of the druid attacks may give Ailor additional druidic invocations.",
      },
      {
        name: "Druidic Invocation",
        text: `Once per round as a free action, Ailor may
invoke his tainted druidic powers and spend an invocation to
do one of the following:
- Deny a foe access to the escalation die until the end of their
next turn
- Gain access to the escalation die himself for the rest of his
turn
- Grant access to the escalation die to one of his allies until
the end of their next turn
- Gain _resistance 16+_ to a chosen energy damage until the end
of his next turn
- Alter the battlefield to create obstacles or cover
- Regain 30 hit points
- Reroll a beast-thing’s attack`,
      },
    ],
    nastierSpecials: [
      {
        name: "Undying",
        text: "If reduced to 0 hit points, Ailor may resurrect in an elemental form, with a total of 50 hit points per remaining druidic invocation.",
      },
    ],
    attacks: [
      {
        name: "Claws of desecration",
        targetDefense: "AC",
        attackModifier: 16,
        damageEffects: "40 damage, plus 20 ongoing necrotic damage (save ends)",
        triggeredEffects: [
          {
            name: "Natural 16+",
            text: "Ailor may make a maw of the druid attack against that target as a free action.",
          },
        ],
      },
      {
        name: "Maw of the druid",
        targetDefense: "PD",
        attackModifier: 18,
        damageEffects:
          "54 damage, and Ailor gains authority over icon relationships held by the target (see command the earth, below).",
        trigger: "Special trigger",
        triggeredEffects: [
          {
            name: "Natural 16+",
            text: "Ailor may make a maw of the druid attack against that target as a free action.",
          },
        ],
      },
      {
        name: "Tangling thorns",
        range: "close-quarters",
        targetDefense: "PD",
        attackModifier: 18,
        targets: ["all foes engaged with Ailor"],
        damageEffects:
          "80 damage, or 20 damage and the target becomes hampered while Ailor is nearby (victim’s choice). If the target chooses the hampered effect, it ends once they are far away from Ailor, and it does not restart when he is nearby again.",
      },
      {
        name: "Spellwarp",
        range: "close-quarters",
        targetDefense: "MD",
        attackModifier: 18,
        targets: ["all nearby foes"],
        damageEffects: "50 psychic damage",
        triggeredEffects: [
          {
            name: "Natural 16+",
            text: "The target must choose one available offensive spell they possess, if any (starting with daily spells). The target casts that spell as a quick action, but Ailor chooses the target or targets.",
          },
        ],
      },
      {
        name: "Thunderbolt",
        range: "ranged",
        targetDefense: "PD",
        attackModifier: 18,
        targets: ["1d3 targets"],
        damageEffects: "100 lightning damage",
        triggeredEffects: [
          {
            name: "Natural even hit",
            text: "Make another thunderbolt attack against a second enemy within range.",
          },
        ],
      },
      {
        name: "Bestial blast",
        range: "ranged",
        targetDefense: "PD",
        attackModifier: 14,
        targets: ["one nearby or far away enemy"],
        damageEffects:
          "30 + 3d20 damage, and Ailor can summon a beast-thing. The creature acts on Ailor’s initiative score for the action that just took place. The creature may attack immediately after this turn.",
      },
    ],
  },
};

export default meta;

type Story = StoryObj<typeof AdversaryStatBlock>;

export const Default: Story = {
  render(props) {
    return (
      <div className="max-w-2xl">
        <AdversaryStatBlock {...props} />
      </div>
    );
  },
};
