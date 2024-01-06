import React from "react";
import { Button } from "../ui/button";
import { Bell } from "lucide-react";

const Notification = () => {
    return (
        <Button variant="ghost">
            <Bell />
        </Button>
    );
};

export default Notification;
