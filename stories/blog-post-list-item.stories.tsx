import BlogPostListItem from "@/components/blog-post-list-item";
import { Meta, StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";

const meta: Meta<typeof BlogPostListItem> = {
  title: "Blog/Blog Post List Item",
  component: BlogPostListItem,
  args: {
    label: "Test label!",
    title: faker.lorem.sentence(),
    to: "/",
    excerpt: faker.lorem.paragraph(),
    readMore: "Read more...",
    date: "Posted several days ago",
    published: true,
  },
};

export default meta;

type Story = StoryObj<typeof BlogPostListItem>;

export const Default: Story = {
  render({ title, to, excerpt, readMore, date, published, label }) {
    return (
      <BlogPostListItem
        label={label}
        excerpt={excerpt}
        to={to}
        title={title}
        published={published}
        date={date}
        readMore={readMore}
      />
    );
  },
};

export const Hero: Story = {
  render({ title, to, excerpt, readMore, date, published, label }) {
    return (
      <BlogPostListItem.Hero
        label={label}
        excerpt={excerpt}
        to={to}
        title={title}
        published={published}
        date={date}
        readMore={readMore}
      />
    );
  },
};
