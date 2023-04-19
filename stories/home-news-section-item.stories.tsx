import HomeNewsSectionItem from "@/components/home-news-section-item";
import { Meta, StoryObj } from "@storybook/react";
import GithubSlugger from "github-slugger";

const meta: Meta<typeof HomeNewsSectionItem> = {
  title: "Home/Home News Section Item",
  component: HomeNewsSectionItem,
  args: {
    title: "Announcing 13 Vaults!",
    date: "2023-02-27",
    published: true,
    excerpt:
      "After a few weeks of intense development and work, 13 Vaults is here!",
  },
};

export default meta;

type Story = StoryObj<typeof HomeNewsSectionItem>;

export const Default: Story = {
  render({ date, title, published, excerpt }) {
    const slugger = new GithubSlugger();
    return (
      <HomeNewsSectionItem
        excerpt={excerpt}
        published={published}
        slug={slugger.slug(title)}
        title={title}
        date={date}
      />
    );
  },
};
