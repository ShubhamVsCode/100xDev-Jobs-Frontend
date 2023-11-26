"use client";
import Link from "next/link";
import React from "react";
import { Button } from "../../ui/button";
import { usePathname } from "next/navigation";

const SidebarLink = ({
  href,
  label,
  Icon,
}: {
  href: string;
  label: string;
  Icon: React.ReactNode;
}) => {
  const pathname = usePathname();
  return (
    <Link href={href}>
      <Button
        variant={pathname.includes(href) ? "secondary" : "ghost"}
        className="w-full gap-2 justify-start"
      >
        {Icon}
        {label}
      </Button>
    </Link>
  );
};

export default SidebarLink;
