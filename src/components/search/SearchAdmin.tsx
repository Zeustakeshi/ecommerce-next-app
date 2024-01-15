import React from "react";
import { Button } from "../ui/button";
import { SearchIcon } from "lucide-react";

const SearchAdmin = () => {
    return (
        <form action="/search" className="w-full flex gap-1">
            <input
                className="w-full px-4 py-2 outline-primary border border-slate-400 rounded-md text-sm"
                type="text"
                name="keyword"
                placeholder="Bạn muốn tìm gì?"
            />
            <Button variant="default" className="text-sm hidden xl:block">
                <SearchIcon className="text-sm"></SearchIcon>
            </Button>
        </form>
    );
};

export default SearchAdmin;
