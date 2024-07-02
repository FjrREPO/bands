"use client";

import { cn } from "@/lib/utils";
import { FolderDot, Menu, Info } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";
import { Button, buttonVariants } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import UserButton from "./auth/user-button";
import { useSession } from "next-auth/react";

const items = [
  { label: "About", link: "/about", icon: <Info />, roles: ['USER'] },
  { label: "Dashboard", link: "/dashboard/band", icon: <FolderDot />, roles: ['ADMIN'] },
];

export default function Navbar() {
  const user = useSession().data?.user;
  return (
    <>
      <DesktopNavbar user={user} />
      <MobileNavbar user={user} />
    </>
  );
}

function MobileNavbar({ user }: { user: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const userRole = user?.role;
  const filteredItems = items.filter(item => item.roles.includes(userRole) || item.roles.includes('USER'));

  return (
    <div
      className="absolute z-40 h-fit w-full py-5 md:py-0"
      style={{
        backgroundColor: 'rgba(128, 128, 128, 0.2)',
      }}
    >
      <div className="block md:hidden" >
        <nav className="container flex items-center justify-between px-8">
          <Sheet
            open={isOpen}
            onOpenChange={setIsOpen}
          >
            <SheetTrigger asChild>
              <Button
                variant={"ghost"}
                size={"icon"}
              >
                <Menu className="w-8 h-8 shrink-0" />
              </Button>
            </SheetTrigger>
            <SheetContent
              className="w-[250px] sm:w-[540px]"
              side={"left"}
            >
              <Logo />
              <div className="flex flex-col gap-1 pt-4">
                {filteredItems.map((item) => (
                  <NavbarItem
                    key={item.label}
                    link={item.link}
                    label={item.label}
                    icon={item.icon}
                  />
                ))}
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-2">
            <UserButton />
          </div>
        </nav>
      </div>
    </div>
  );
}

function DesktopNavbar({ user }: { user: any }) {
  const userRole = user?.role;
  const filteredItems = items.filter(item => item.roles.includes(userRole) || item.roles.includes('USER'));

  return (
    <div
      className="absolute z-40 h-fit w-full"
      style={{
        backgroundColor: 'rgba(128, 128, 128, 0.2)',
      }}
    >
      <div className="hidden md:block" >
        <nav className="container flex items-center justify-between gap-x-4">
          <Logo />
          <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
            <div className="flex items-center h-full gap-x-2 item">
              {filteredItems.map((item) => (
                <NavbarItem
                  key={item.label}
                  link={item.link}
                  label={''}
                  icon={item.icon}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <UserButton />
          </div>
        </nav>
      </div>
    </div>
  );
}

function NavbarItem({
  link,
  label,
  icon
}: {
  link: string;
  label: string;
  icon: any
}) {
  const pathname = usePathname();
  const isActive = pathname === link;
  return (
    <div className="relative flex items-center">
      <Link
        href={link}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "w-full gap-2 justify-start text-lg text-muted-foreground hover:text-foreground",
          isActive && "text-foreground"
        )}
      >
        {icon}
        {label}
      </Link>
      {isActive && (
        <div className="absolute -bottom-[2px] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 rounded-xl dark:bg-primary bg-emerald-500 md:block" />
      )}
    </div>
  );
}