import FancySurface from "@/components/fancy-surface";
import Label from "@/components/label";
import { faker } from "@faker-js/faker";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof FancySurface> = {
  title: "Shared/Fancy Surface",
  component: FancySurface,
  args: {
    children: (
      <>
        <Label as="h1" variant="display-large" className="text-center my-6">
          Fancy Surface
        </Label>
        <Label as="h2" variant="headline" className="text-center my-6">
          It&apos;s a really cool surface!
        </Label>
        <Label as="p" className="my-2">
          {faker.lorem.paragraph()}
        </Label>
        <Label as="h2" variant="title" className="my-4">
          Neat!
        </Label>
        <Label as="p" className="my-2">
          {faker.lorem.paragraph()}
        </Label>
        <Label as="p" className="my-2">
          {faker.lorem.paragraph()}
        </Label>
        <Label as="h2" variant="title" className="my-4">
          Neat!
        </Label>
        <Label as="p" className="my-2">
          {faker.lorem.paragraph()}
        </Label>
      </>
    ),
  },
};

export default meta;

type Story = StoryObj<typeof FancySurface>;

export const Default: Story = {
  render(props) {
    return <FancySurface {...props} />;
  },
};
