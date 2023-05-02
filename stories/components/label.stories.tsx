import Label from "@/components/label";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Label> = {
  title: "Shared/Label",
  component: Label,
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  render() {
    return (
      <div className="text-black dark:text-white">
        <Label as="div" variant="display-large">
          Display Large 1234567890
        </Label>
        <Label as="div" variant="display">
          Display 1234567890
        </Label>
        <Label as="div" variant="display-small">
          Display Small 1234567890
        </Label>
        <Label as="div" variant="headline-large">
          Headline Large 1234567890
        </Label>
        <Label as="div" variant="headline">
          Headline 1234567890
        </Label>
        <Label as="div" variant="headline-small">
          Headline Small 1234567890
        </Label>
        <Label as="div" variant="title-large">
          Title Large 1234567890
        </Label>
        <Label as="div" variant="title">
          Title 1234567890
        </Label>
        <Label as="div" variant="title-small">
          Title Small 1234567890
        </Label>
        <Label as="div" variant="label-large">
          Label Large 1234567890
        </Label>
        <Label as="div" variant="label">
          Label 1234567890
        </Label>
        <Label as="div" variant="label-small">
          Label Small 1234567890
        </Label>
        <Label as="div" variant="body-large">
          Body Large 1234567890
        </Label>
        <Label as="div" variant="body">
          Body 1234567890
        </Label>
        <Label as="div" variant="body-small">
          Body Small 1234567890
        </Label>
      </div>
    );
  },
};
