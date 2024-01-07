"use client";
import { uploadShopBannerAction } from "@/actions/update.action";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import { Divide, Edit } from "lucide-react";
import { FC } from "react";
import { buttonVariants } from "../ui/button";
import UploadImageWrapper from "../wrappers/UploadImageWrapper";

type Props = {
    className?: string;
    canEdit: boolean;
    images: string[];
};

const ShopBanner: FC<Props> = ({ className, canEdit, images }) => {
    return (
        <section>
            <Carousel
                plugins={[
                    Autoplay({
                        delay: 2000,
                    }),
                ]}
                opts={{
                    align: "start",
                    loop: true,
                }}
                className={cn("w-full relative", className)}
            >
                <CarouselContent className="min-h-[500px]">
                    {images.length > 0 ? (
                        images.map((url, index) => (
                            <CarouselItem key={index}>
                                <div className=" max-h-[500px]">
                                    <img
                                        src={url}
                                        alt={`shop-banner-${index + 1}`}
                                        className="w-full h-full object-contain object-center"
                                    />
                                </div>
                            </CarouselItem>
                        ))
                    ) : (
                        <div className="w-full h-full flex justify-center items-center">
                            <h4 className="my-8 text-lg ">
                                Thêm banner của bạn
                            </h4>
                        </div>
                    )}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
                {canEdit && (
                    <UploadImageWrapper
                        uploadHandler={uploadShopBannerAction}
                        className="absolute right-2 bottom-1"
                        multiple
                        maxImage={4}
                    >
                        <span
                            className={cn(
                                buttonVariants({
                                    variant: "ghost",
                                }),
                                "bg-white bg-opacity-80 backdrop-blur-sm "
                            )}
                        >
                            <Edit></Edit>
                        </span>
                    </UploadImageWrapper>
                )}
            </Carousel>
        </section>
    );
};

export default ShopBanner;
