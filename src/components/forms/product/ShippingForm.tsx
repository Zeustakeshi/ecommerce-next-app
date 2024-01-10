"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProductShipInfoSchema } from "@/schemas/product.schema";
import { useForm } from "react-hook-form";
import * as z from "zod";
import InputDeliveryPrice from "../InputDeliveryPrice";

const ShippingForm = () => {
    const form = useForm<z.infer<typeof ProductShipInfoSchema>>();

    return (
        <Form {...form}>
            <div className="space-y-6">
                <FormField
                    control={form.control}
                    name="weightAfterPackaging"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cân nặng gói hàng (gram)</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Cân năng sau đóng gói"
                                    type="number"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    <FormField
                        control={form.control}
                        name="width"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Rộng (cm)</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Rộng"
                                        type="number"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="long"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Dài (cm)</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Dài"
                                        type="number"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="height"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cao (cm)</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Cao"
                                        type="number"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <InputDeliveryPrice
                    height={form.watch("height")}
                    weight={form.watch("weightAfterPackaging")}
                    width={form.watch("width")}
                    long={form.watch("long")}
                />
            </div>
        </Form>
    );
};

export default ShippingForm;
