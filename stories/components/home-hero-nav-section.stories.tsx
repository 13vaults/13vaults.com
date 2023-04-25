import HomeHeroNavSection from "@/components/home-hero-nav-section";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof HomeHeroNavSection> = {
  title: "Home/Home Hero Nav Section",
  component: HomeHeroNavSection,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof HomeHeroNavSection>;

export const Default: Story = {
  render() {
    return <HomeHeroNavSection />;
  },
};
