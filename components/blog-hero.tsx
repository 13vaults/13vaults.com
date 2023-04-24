import Image from "next/image";
import socialBanner from "@/public/images/social-banner.webp";
import VaultsLogo from "./vaults-logo";

export default function BlogHero({ title }: { title: string }) {
  return (
    <div
      role="presentation"
      className="flex flex-col gap-4 relative justify-center content-center px-10 py-16 aspect-wide text-white w-full"
    >
      <Image
        className="object-cover relative"
        src={socialBanner}
        fill
        alt={title}
        priority
        unoptimized={process.env.NODE_ENV !== "production"}
        placeholder="blur"
      />
      <VaultsLogo variant="full" className="h-28 filter drop-shadow" />
      <div className="font-display-serif text-center text-3xl sm:text-4xl font-bold relative">
        {title}
      </div>
    </div>
  );
}
