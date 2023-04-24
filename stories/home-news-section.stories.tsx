import HomeNewsSection from "@/components/home-news-section";
import { Meta, StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";

const meta: Meta<typeof HomeNewsSection> = {
  title: "Home/Home News Section",
  component: HomeNewsSection,
  args: {
    heroPost: {
      title: faker.lorem.sentence(),
      excerpt: faker.lorem.paragraph(),
      date: faker.date.recent(90).toISOString(),
      published: true,
      slug: "test-title",
    },
    extraPosts: [
      {
        title: faker.lorem.sentence(),
        excerpt: faker.lorem.sentence(),
        date: faker.date.recent(90).toISOString(),
        published: true,
        slug: "test-title-2",
      },
      {
        title: faker.lorem.sentence(),
        excerpt: faker.lorem.paragraph(),
        date: faker.date.recent(90).toISOString(),
        published: true,
        slug: "test-title-3",
      },
      {
        title: faker.lorem.sentence(),
        excerpt: faker.lorem.sentence(),
        date: faker.date.recent(90).toISOString(),
        published: true,
        slug: "test-title-4",
      },
      {
        title: faker.lorem.sentence(),
        excerpt: faker.lorem.sentence(),
        date: faker.date.recent(90).toISOString(),
        published: true,
        slug: "test-title-5",
      },
    ],
  },
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof HomeNewsSection>;

export const Default: Story = {
  render({ heroPost, extraPosts }) {
    return <HomeNewsSection heroPost={heroPost} extraPosts={extraPosts} />;
  },
};
