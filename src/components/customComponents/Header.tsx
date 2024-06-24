"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import Logo from "../../../public/logo.svg";
import Link from "next/link";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";

const Header = () => {
  const path = usePathname();
  const { user, isSignedIn } = useUser();
  console.log(user);

  return (
    <div className="flex justify-between items-center w-full shadow-sm px-12 py-5 fixed top-0  z-50 bg-white">
      <div className="flex items-center gap-10">
        <Link href="/" className="flex gap-2 items-center">
          <Image src={Logo} alt="logo" width={30} height={30} />
          <h2 className="font-medium text-base">Homies Stay</h2>
        </Link>
        <ul className="flex gap-10 text-gray-500 font-medium text-sm items-center">
          <Link className="hover:text-primary" href={"/"}>
            {" "}
            <li className={path === "/" ? "text-primary" : ""}>
              For Sale
            </li>{" "}
          </Link>
          <Link className="hover:text-primary" href={"/for-rent"}>
            {" "}
            <li className={path === "/for-rent" ? "text-primary" : ""}>
              For Rent
            </li>{" "}
          </Link>
          <Link className="hover:text-primary" href={"/agent-finder"}>
            {" "}
            <li className={path === "/agent-finder" ? "text-primary" : ""}>
              Agent Finder
            </li>{" "}
          </Link>
        </ul>
      </div>
      <div className="flex gap-4 items-center">
        <Link href={isSignedIn ? "/add-new-listing" : "/sign-in"}>
          <Button className="flex items-center text-sm  gap-1 bg-primary">
            {" "}
            <Plus height={20} width={20} /> Post Your Ad
          </Button>
        </Link>
        {isSignedIn ? (
          <UserButton />
        ) : (
          <Link href={"/sign-in"}>
            <Button className="flex items-center gap-2" variant={"outline"}>
              Login
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
