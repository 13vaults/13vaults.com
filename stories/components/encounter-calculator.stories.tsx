import EncounterCalculator from "@/components/encounter-calculator";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof EncounterCalculator> = {
  title: "Shared/Encounter Calculator",
  component: EncounterCalculator,
};

export default meta;

type Story = StoryObj<typeof EncounterCalculator>;

export const Default: Story = {
  render() {
    return <EncounterCalculator />;
  },
};
