import Image from "next/image";
import logo from "@/app/images/logo.webp";

export default function Brand() {
  return (
    <span className="brand-logo">
      <Image src={logo} alt="Richardus" sizes="112px" />
    </span>
  );
}
