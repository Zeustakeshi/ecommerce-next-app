"use client";
import { FC } from "react";
import { NavBarSchema } from "./navbarSchema";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

type NavbarMenuListProps = {
    items: NavBarSchema[];
};
const NavbarAccordionList: FC<NavbarMenuListProps> = ({ items }) => {
    return (
        <Accordion type="multiple" className="w-full">
            {items.map((item, index) => {
                return (
                    <AccordionItem value={item.title} key={index} title="hi">
                        <AccordionTrigger>
                            {item.to ? (
                                <Link
                                    className="w-full text-left"
                                    href={item.to}
                                >
                                    {item.title}
                                </Link>
                            ) : (
                                item.title
                            )}
                        </AccordionTrigger>
                        {item.children && (
                            <AccordionContent>
                                {item.children.map((subItem, index) => {
                                    return (
                                        <Link
                                            className="block px-4 py-3 w-full font-bold"
                                            href={subItem.to}
                                        >
                                            {subItem.title}
                                        </Link>
                                    );
                                })}
                            </AccordionContent>
                        )}
                    </AccordionItem>
                );
            })}
        </Accordion>
    );
};

export default NavbarAccordionList;
