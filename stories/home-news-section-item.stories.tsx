import HomeNewsSectionItem from "@/components/home-news-section-item";
import { Meta, StoryObj } from "@storybook/react";
import GithubSlugger from "github-slugger";

const meta: Meta<typeof HomeNewsSectionItem> = {
  title: "Home/Home News Section Item",
  component: HomeNewsSectionItem,
  args: {
    title: "A Cool Title!",
    date: new Date().toISOString().split("T")[0],
    published: true,
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus elementum, justo in dictum pellentesque, urna leo suscipit tortor, nec pulvinar ligula tortor quis ipsum. Proin id convallis leo. Nullam aliquam diam a justo varius tristique. Cras in auctor felis. Sed venenatis pretium velit, a condimentum nulla.",
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
