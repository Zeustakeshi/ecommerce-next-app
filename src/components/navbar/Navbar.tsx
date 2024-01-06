"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import navBarSchema from "./navbarSchema";

export const Navbar = () => {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                {navBarSchema.map((item, index) => {
                    return (
                        <NavigationMenuItem key={index}>
                            {item.to ? (
                                <Link href={item.to} legacyBehavior passHref>
                                    <NavigationMenuLink
                                        className={navigationMenuTriggerStyle()}
                                    >
                                        {item.title}
                                    </NavigationMenuLink>
                                </Link>
                            ) : (
                                <>
                                    <NavigationMenuTrigger>
                                        {item.title}
                                    </NavigationMenuTrigger>

                                    <NavigationMenuContent>
                                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                            {item.children?.map(
                                                (children, index) => {
                                                    return (
                                                        <ListItem
                                                            key={index}
                                                            href={children.to}
                                                            title={
                                                                children.title
                                                            }
                                                        >
                                                            {
                                                                children.description
                                                            }
                                                        </ListItem>
                                                    );
                                                }
                                            )}
                                        </ul>
                                    </NavigationMenuContent>
                                </>
                            )}
                        </NavigationMenuItem>
                    );
                })}
            </NavigationMenuList>
        </NavigationMenu>
    );
};

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">
                        {title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";
