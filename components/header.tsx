"use client"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { useEffect, useState } from "react";
import axios from "axios";

export function NavigationMenuHome() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Item with dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Features</NavigationMenuTrigger>
          <NavigationMenuContent className="p-4 bg-white shadow-md rounded-lg">
            <NavigationMenuLink asChild>
              <a href="/products/1">Blog Writer</a>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <a href="/products/2">Image Generator</a>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Item without dropdown */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <a href="/about">About</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
