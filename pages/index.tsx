import BasicLayout from "@/layouts/basic";
import Image from "next/image";
import camelotImage from "@/assets/images/camelot-spire-butteredbap.webp";

export default function VaultsAppHome() {
  return (
    <BasicLayout>
      <Image
        className="h-24 w-24 object-top object-cover"
        src={camelotImage}
        width={24 * 16}
        alt="Camelot Spire"
      />
    </BasicLayout>
  );
}
