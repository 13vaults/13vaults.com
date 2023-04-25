import HomeHeroSection from "@/components/home-hero-section";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof HomeHeroSection> = {
  title: "Home/Home Hero Section",
  component: HomeHeroSection,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof HomeHeroSection>;

export const Default: Story = {
  render() {
    return <HomeHeroSection />;
  },
};
