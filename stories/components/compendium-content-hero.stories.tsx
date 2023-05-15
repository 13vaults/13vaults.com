import CompendiumContentHero from "@/components/compendium-content-hero";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof CompendiumContentHero> = {
  title: "Shared/Compendium Content Hero",
  component: CompendiumContentHero,
  argTypes: {
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
    detailsHref: {
      type: "string",
    },
    detailsLabel: {
      type: "string",
    },
    children: {
      type: "string",
    },
  },
  args: {
    title: "Compendium Item!",
    description: "Test description",
    detailsHref: "/",
    detailsLabel: "Details",
    children: "Test children",
  },
};

export default meta;

type Story = StoryObj<typeof CompendiumContentHero>;

export const Default: Story = {
  render(props) {
    return <CompendiumContentHero {...props} />;
  },
};
