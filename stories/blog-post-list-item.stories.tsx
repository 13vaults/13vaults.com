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
    children: (
      <>
        <p className="my-2">{faker.lorem.paragraph()}</p>
        <p className="my-2 opacity-90 italic">Read more...</p>
      </>
    ),
    subtitle: <time className="font-display">Posted several days ago</time>,
    published: true,
  },
};

export default meta;

type Story = StoryObj<typeof BlogPostListItem>;

export const Default: Story = {
  render({ title, to, children, subtitle, published, label }) {
    return (
      <BlogPostListItem
        label={label}
        subtitle={subtitle}
        to={to}
        title={title}
        published={published}
      >
        {children}
      </BlogPostListItem>
    );
  },
};
