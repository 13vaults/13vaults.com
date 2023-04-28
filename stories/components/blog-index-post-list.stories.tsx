import { Meta, StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";
import BlogIndexPostList from "@/components/blog-index-post-list";
import Container from "@/components/container";

const meta: Meta<typeof BlogIndexPostList> = {
  title: "Blog/Blog Index Post List",
  component: BlogIndexPostList,
  args: {
    blogPosts: [
      {
        title: faker.lorem.sentence() + " J K R Q LA 0",
        excerpt: faker.lorem.paragraph(),
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
        excerpt: faker.lorem.paragraph(),
        date: faker.date.recent(90).toISOString(),
        published: true,
        slug: "test-title-4",
      },
      {
        title: faker.lorem.sentence(),
        excerpt: faker.lorem.paragraph(),
        date: faker.date.recent(90).toISOString(),
        published: true,
        slug: "test-title-5",
      },
    ],
  },
};

export default meta;

type Story = StoryObj<typeof BlogIndexPostList>;

export const Default: Story = {
  render({ blogPosts }) {
    return (
      <div className="p-4 lg:p-8 flex-1">
        <Container className="flex flex-col gap-8">
          <BlogIndexPostList blogPosts={blogPosts} />
        </Container>
      </div>
    );
  },
};
