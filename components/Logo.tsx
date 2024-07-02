import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href={"/"}
      className="flex items-center gap-2"
    >
      <Image src="https://res.cloudinary.com/dutlw7bko/image/upload/v1719385617/project-orang/amikom_page-0001-removebg-preview_swkajz.png" alt="Logo" width={120} height={80} className="rounded-lg"/>
    </Link>
  );
}
