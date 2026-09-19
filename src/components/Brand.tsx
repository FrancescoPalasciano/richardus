import Image from "next/image";
import logo from "@/app/images/logo.webp";
import fullLogo from "@/app/images/logointero.webp";

export default function Brand({ full = false }: { full?: boolean }) {
  return (
    <span className={full ? "brand-logo brand-logo-full" : "brand-logo"}>
      <Image
        src={full ? fullLogo : logo}
        alt="Richardus"
        sizes={full ? "120px" : "112px"}
      />
    </span>
  );
}
