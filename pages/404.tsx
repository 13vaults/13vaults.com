import BasicLayout from "@/layouts/basic";
import Link from "next/link";

export default function NotFound() {
  return (
    <BasicLayout>
      <div className="flex-1 grid place-content-center bg-black/90 text-center">
        <h1 className="text-red-600 text-4xl sm:text-6xl font-serif uppercase">
          You Got Lost
        </h1>
        <Link href="/" className="text-red-500 font-display font-medium">
          Return back to 13vaults
        </Link>
      </div>
    </BasicLayout>
  );
}
