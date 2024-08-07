"use client";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { NAV_ITEMS, NavItem } from "@/constants";
import { cn } from "@/lib/utils";
import UseScroll from "@/hooks/use-scroll";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import SliderThemeToggle from "./SliderThemeToggle";

export default function Navbar() {
  const scrolled = UseScroll(5);

  return (
    <div
      className={cn(
        "sticky inset-x-0 top-0 z-50 w-full transition-all bg-background border-b-[#1AB266] border-b p-4 shadow-md",
        {
          "bg-background/40 backdrop-blur-md": scrolled,
        }
      )}
    >
      <MaxWidthWrapper className="flex items-center justify-between">
        <Link href={"/"} className="flex items-center gap-1">
          <div className="relative size-7 md:size-12">
            <Image src={"/logo-256.png"} alt="Logo" fill />
          </div>
          <h2 className="font-semibold">HerbPharmsHub</h2>
        </Link>
        <div className="items-center gap-6 hidden md:flex">
          {NAV_ITEMS.map((item, index) => (
            <MenuItem key={item.title} item={item} />
          ))}
          <div>
            <SliderThemeToggle />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
const MenuItem = ({ item }: { item: NavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className="relative">
      {item.submenu ? (
        <>
          {/* <button
            onClick={toggleSubMenu}
            className={"flex flex-row items-center w-full justify-between"}
          >
            <div className="flex flex-row space-x-4 items-center">
              {item.icon && item.icon({ className: "size-3" })}
              <span className="flex">{item.title}</span>
            </div>

            <div className={`${subMenuOpen ? "rotate-180" : ""} flex`}>
              <ChevronDown className="text-[#1AB266]" />
            </div>
          </button>

          {subMenuOpen && (
            <div className="absolute top-12 flex flex-col space-y-4 bg-[#212323] p-3 rounded-md min-w-48">
              {item.submenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`${
                      subItem.path === pathname
                        ? "font-bold bg-secondary text-black"
                        : "text-white"
                    } hover:bg-secondary p-1.5 rounded-md hover:text-black`}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          )} */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2">
              <span> {item.icon && item.icon({ className: "size-3" })}</span>
              <span className="flex">{item.title}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>gfdgf</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <Link
          href={item.path}
          className={cn(
            "flex items-center gap-2 hover:text-[#1AB266] transition-colors",
            {
              "text-[#1AB266]": item.path === pathname,
            }
          )}
        >
          {item.icon && item.icon({ className: "size-4" })}
          <span>{item.title}</span>
        </Link>
      )}
    </div>
  );
};
