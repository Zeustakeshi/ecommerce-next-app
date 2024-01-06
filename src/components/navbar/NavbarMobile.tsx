import Link from "next/link";
import React, { FC } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import navBarSchema, { NavBarSchema } from "./navbarSchema";
import NavbarAccordionList from "./NavbarAccordionList";

const NavbarMobile = () => {
    return (
        <div className="py-5">
            <Accordion type="multiple" className="w-full">
                <NavbarAccordionList items={navBarSchema}></NavbarAccordionList>
            </Accordion>
        </div>
    );
};

export default NavbarMobile;
