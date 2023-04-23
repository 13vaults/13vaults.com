import { Meta, StoryObj } from "@storybook/react";
import MegaNav from "@/components/mega-nav";

const meta: Meta<typeof MegaNav> = {
  title: "Shared/MegaNav",
  component: MegaNav,
  args: {
    navigation: {
      main: [
        {
          labelKey: "Compendium",
          subnavs: [
            {
              labelKey: "Classes",
              href: "/",
              items: [
                {
                  name: "View All Classes",
                  href: "/classes",
                },
                {
                  name: "Fighter",
                  href: "/classes/fighter",
                },
                {
                  name: "Wizard",
                  href: "/classes/wizard",
                },
                {
                  name: "Rogue",
                  href: "/classes/rogue",
                },
                {
                  name: "Cleric",
                  href: "/classes/cleric",
                },
              ],
            },
          ],
        },
      ],
      pages: [],
    },
  },
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof MegaNav>;

export const Default: Story = {
  render({ navigation }) {
    return <MegaNav navigation={navigation} />;
  },
};

export const LotsOfNesting: Story = {
  render() {
    const navigation = {
      main: [
        {
          labelKey: "Compendium",
          subnavs: [
            {
              labelKey: "Nested",
              href: "/",
              items: [
                {
                  name: "> Nested",
                  href: "/classes",
                  items: [
                    {
                      name: ">> Nested",
                      href: "/",
                      items: [{ name: ">>> Nested", href: "/" }],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      pages: [],
    };
    return <MegaNav navigation={navigation} />;
  },
};
