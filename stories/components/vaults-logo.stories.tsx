import VaultsLogo from "@/components/vaults-logo";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof VaultsLogo> = {
  title: "Shared/Vaults Logo",
  component: VaultsLogo,
  argTypes: {
    variant: {
      options: ["full", "small", "tiny"],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof VaultsLogo>;

export const Default: Story = {
  args: {
    variant: "full",
  },
  render({ variant }) {
    return <VaultsLogo className="h-24" variant={variant} />;
  },
};
