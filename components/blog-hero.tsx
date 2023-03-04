import Image from "next/image";
import socialBanner from "@/public/images/social-banner.webp";

export default function BlogHero({ title }: { title: string }) {
  return (
    <div className="flex flex-col gap-4 relative justify-center content-center px-10 py-16 aspect-wide text-white w-full">
      <Image
        className="object-cover"
        src={socialBanner}
        fill
        alt={title}
        priority
        unoptimized={process.env.NODE_ENV !== "production"}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="h-28 filter drop-shadow"
        viewBox="0 0 152 34"
      >
        <path
          fillRule="evenodd"
          d="m56 30.7 1.3-4.6-1.5-4.3h3.6l3-8.3-3-2.2h12.3l4.8 12.3h1l1.1 7.1h-6l-1.4-4h-7.6l-1.2 4H56Zm9.5-8.9h4.1l-1.8-5.4h-.6l-1.7 5.4Zm24 9.2c-3.3 0-5.6-.6-7-2-1.5-1.2-2.2-3.3-2.2-6.2v-7.1l-2-4.4h8.3v10.2l.1 2.2c.2.7.5 1.2.9 1.5.4.4 1 .6 2 .6a4 4 0 0 0 2-.5c.3-.3.6-.8.8-1.5l.1-2.3v-5.8l-2-4.4h8.2v11.5c0 2-.3 3.4-1 4.7-.6 1.1-1.6 2-2.9 2.6a13 13 0 0 1-5.3.9Zm12.8-.3-2.8-5.5 2.8 1.1v-9.8l-.8.3.8-5.5h6.1l2.1-.3-2 5.5v5.2l-.4 3.8h.6l5.8 1.5 1.2-2 2.4 4-1.3 1.7h-14.5Zm18.7 0V16.5l-5.7.3-1.3-6.3 1.3.8h17.5l1.2 6.3-1.2-.8-5.7-.3v9.8l1.4-.3-1.4 4.7h-6.2Z"
        />
        <path
          fillRule="evenodd"
          d="M142.4 31a17 17 0 0 1-5.7-1 4 4 0 0 1-1.6-.8v-2.9l-2.9-4 2.9 1.2a16.7 16.7 0 0 0 7.6 2c1.1 0 1.7-.2 1.7-.7a1 1 0 0 0-.3-.7l-1.2-.5-2.5-.8-3.2-1.2c-.8-.4-1.5-1-2-1.6-.4-.7-.6-1.6-.6-2.7 0-1.9.8-3.4 2.3-4.6 1.6-1.1 3.8-1.7 6.8-1.7a23.3 23.3 0 0 1 3.5.2l4.3-.7-2.2 2.5v4.7l-7.2-1.8c-.7 0-1 .3-1 .8 0 .3.1.7.6 1l2.6 1c1.7.5 3 1 4 1.6A5 5 0 0 1 151 25a5.7 5.7 0 0 1-2.2 4.4 10.7 10.7 0 0 1-6.5 1.7ZM3.7 30.7V16.9l1-3-2.8.7H0v-5l9.5-1.3.3 1.9-.3 3.1.5 13.9-.5 3.5H3.7Zm16.7.3a27.2 27.2 0 0 1-3.6-.3L13 29l-.4-6.8 2 1.8 6.2 1.8c1.2 0 2-.2 2.6-.6.5-.5.8-1 .8-1.6 0-.6-.2-1-.6-1.2-.4-.3-1-.4-2-.4h-3.8l-4-5h7.5c.7 0 1.2-.2 1.6-.5.5-.3.7-.7.7-1.3 0-.6-.2-1-.6-1.3a3 3 0 0 0-1.7-.5 13.8 13.8 0 0 0-5.5 1.1l-1.9.7-2.6-5.8 2.6.5a16 16 0 0 1 4.6-1.5c1-.2 2.2-.3 3.5-.3 2.3 0 4 .5 5.3 1.6 1.2 1 1.8 2.5 1.8 4.4a5 5 0 0 1-.7 2.7 6 6 0 0 1-1.4 1.7 5.2 5.2 0 0 1 3 5c.1 5-3.1 7.6-9.5 7.6Zm17.9 3-7.8-22.6.4-3.3-1.7-3.2L26 0l11.4 4.9 6 21.6.4 2.6.5-2.6 6-21.6L47 1.6h9.8L60 5l-3 6.5L49.5 34H38.3Z"
        />
      </svg>
      <div className="font-display-serif text-center text-3xl sm:text-4xl font-bold z-[1]">
        {title}
      </div>
    </div>
  );
}
