import Footer from "@/components/footer";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Footer> = {
  title: "Shared/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  render() {
    return <Footer />;
  },
};
