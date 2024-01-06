import { buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC } from "react";

type ShopTodoType = {
    waitingForConfirmation: number;
    waitingForPickup: number;
    processed: number;
    blocked: number;
    cancelled: number;
    outOfStock: number;
};

export const getTodo = async (): Promise<ShopTodoType> => {
    return {
        blocked: 0,
        processed: 0,
        waitingForConfirmation: 10,
        waitingForPickup: 100,
        cancelled: 0,
        outOfStock: 10,
    };
};

const ShopTodo = async () => {
    const todo = await getTodo();
    return (
        <section>
            <Card className="">
                <CardHeader>
                    <CardTitle className="text-muted-foreground">
                        Việc cần làm
                    </CardTitle>
                    <CardDescription>
                        Những việc bạn sẽ phải làm
                    </CardDescription>
                    <CardContent className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2  p-3 sm:p-5 gap-5">
                        <Todo
                            label="Chờ xác nhận"
                            amount={todo.waitingForConfirmation}
                        />
                        <Todo
                            label="Chờ lấy hàng"
                            amount={todo.waitingForConfirmation}
                        />
                        <Todo label="Đã xử lý" amount={todo.processed} />
                        <Todo label="Đã hủy" amount={todo.blocked} />
                        <Todo label="Sản phẩm hết hàng" amount={todo.blocked} />
                        <Todo label="Sản phẩm bị khóa" amount={todo.blocked} />
                    </CardContent>
                    <CardFooter className="flex justify-end pb-0">
                        <Link
                            href="/manager/shop/order"
                            className={cn(buttonVariants({ variant: "link" }))}
                        >
                            xem chi tiết
                        </Link>
                    </CardFooter>
                </CardHeader>
            </Card>
        </section>
    );
};

type TodoProps = {
    label: string;
    amount: number;
};
const Todo: FC<TodoProps> = ({ label, amount }) => {
    return (
        <div className="flex justify-start items-center flex-col gap-2  text-center">
            <span className="font-bold text-primary text-3xl">{amount}</span>
            <span className="text-lg text-muted-foreground font-semibold">
                {label}
            </span>
        </div>
    );
};

export default ShopTodo;
