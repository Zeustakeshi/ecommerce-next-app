"use client";
import { cn } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import React, { useEffect, useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import useDebounce from "@/hooks/useDebounce";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";

type Props = {
    className?: string;
    onChange: (category: string) => void;
    category: string;
};

const InputCategory = (props: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    const [searchValue, setSearchValue] = React.useState<string>("");
    const [categories, setCategories] = useState<{ name: string }[]>([]);
    const [answer, setAnswer] = useState<string | undefined>(props.category);
    const [searching, setSearching] = useState<boolean>(false);

    const searchValueDebounce = useDebounce(searchValue, 600);

    useEffect(() => {
        if (!searchValueDebounce.trim()) setCategories([]);

        (async () => {
            setSearching(true);
            await handleSearch(searchValue);
            setSearching(false);
        })();
    }, [searchValueDebounce]);

    const handleSearch = async (keyword: string) => {
        if (!keyword.trim()) return;
        try {
            const response = await fetch(
                `/api/product/categories/search/?k=${keyword.trim()}&d=0`
            );
            const categories = await response.json();
            setCategories(categories);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild className={cn(props.className)}>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] md:w-[400px] justify-between text-muted-foreground"
                >
                    {answer ? answer : "Chọn ngành hàng..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] md:w-[400px] p-3 space-y-4">
                <Input
                    placeholder="Tìm kiếm ...."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <ScrollArea className="h-[250px] custom-scroll ">
                    {searching ? (
                        <div className="h-[250px] w-full flex justify-center items-center">
                            <span className="animate-spin w-4 h-4 rounded-full border-[2px] border-primary border-r-transparent "></span>
                        </div>
                    ) : categories.length <= 0 ? (
                        <div className="h-[250px] w-full flex justify-center items-center">
                            <p className="text-sm text-muted-foreground font-semibold text-center">
                                Không tìm thấy ngành hàng này
                            </p>
                        </div>
                    ) : (
                        <div>
                            {categories?.map((category, index) => {
                                return (
                                    <Button
                                        key={index}
                                        onClick={() => {
                                            props.onChange(category.name);
                                            setAnswer(category.name);
                                            setOpen(false);
                                            setSearchValue("");
                                        }}
                                        className="w-full text-left  justify-start"
                                        variant="ghost"
                                    >
                                        {category.name}
                                    </Button>
                                );
                            })}
                        </div>
                    )}
                </ScrollArea>
            </PopoverContent>
        </Popover>
    );
};

export default InputCategory;
