import Container from "@/components/container";
import { Navigation } from "@/lib/navigation";
import BasicLayout from "./basic";

export default function CompendiumCategoryIndexLayout({
  children,
  navigation,
}: {
  children: React.ReactNode;
  navigation: Navigation;
}) {
  return (
    <BasicLayout navigation={navigation}>
      <main className="p-4 lg:p-8 dark:text-white">
        <Container>
          <div>{children}</div>
        </Container>
      </main>
    </BasicLayout>
  );
}
