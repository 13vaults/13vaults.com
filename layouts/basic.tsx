import Footer from "@/components/footer";
import MegaNav from "@/components/mega-nav";
import { Navigation } from "@/lib/navigation";
import clsx from "clsx";

export default function BasicLayout({
  children,
  navigation,
  className,
}: {
  children: React.ReactNode;
  navigation: Navigation;
  className?: string;
}) {
  return (
    <div className="min-h-screen-safe flex flex-col">
      <header className="z-10 sticky top-0 shadow">
        <MegaNav navigation={navigation} />
      </header>
      <div className={clsx("flex flex-col flex-1 relative", className)}>
        {children}
      </div>
      <Footer />
    </div>
  );
}
