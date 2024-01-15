import React, {
    ChangeEvent,
    FC,
    ReactNode,
    useRef,
    useState,
    useTransition,
} from "react";
import { useForm } from "react-hook-form";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
type Props = {
    children: ReactNode;
    multiple?: boolean;
    maxImage?: number;
    minImage?: number;
    title?: string;
    description?: string;
    submitLabel?: string;
    className?: string;
    uploadHandler?: (formData: FormData) => Promise<{
        error?: string;
        success?: string;
    }>;
    uploadPayload?: any;
};

const UploadImageWrapper: FC<Props> = (props) => {
    const [images, setImages] = useState<File[]>([]);
    const [uploading, startUpload] = useTransition();

    const formRef = useRef<HTMLFormElement>(null);
    const buttonCloseRef = useRef<HTMLButtonElement>(null);

    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        const images = e.target.files;

        if (!images || images.length === 0) return;

        const allowedSize = 1024 * 1024; // 1 MB
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

        const newImages = Array.from(images).filter(
            (image) =>
                allowedTypes.includes(image.type) && image.size < allowedSize
        );

        setImages(newImages as any);
    };

    const handleDeleteImage = (name: string) => {
        setImages((prev) => prev.filter((image) => image.name !== name));
        formRef.current?.reset();
    };

    const handleUploadImage = () => {
        if (!images || images.length <= 0) {
            alert("Hãy chọn ảnh bạn muốn tải lên !");
            return;
        }

        if (props.maxImage && images.length > props.maxImage) {
            alert(`Bạn chỉ có thể tải lên tối đa ${props.maxImage} ảnh`);
            return;
        }

        if (props.minImage && images.length < props.minImage) {
            alert(`Bạn cần tải lên tối thiểu ${props.minImage} ảnh`);
            return;
        }

        startUpload(async () => {
            const formData = new FormData();

            images.forEach((image) => formData.append("images", image));

            formData.append("payload", JSON.stringify(props.uploadPayload));

            const message = await props.uploadHandler?.(formData);
            if (message?.error) alert(message.error);
            if (message?.success) {
                setImages([]);
                formRef.current?.reset();
                alert("tải ảnh lên thành công");
                buttonCloseRef.current?.click();
            }
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild className={cn(props.className)}>
                {props.children}
            </DialogTrigger>
            <DialogContent className="w-full max-w-[90svw] sm:max-w-[80svw] md:max-w-[70svw] lg:max-w-[60svw]">
                <form
                    ref={formRef}
                    action={handleUploadImage}
                    onSubmit={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <DialogHeader>
                        <DialogTitle>
                            {props.title || "Tải ảnh lên"}
                        </DialogTitle>
                        <DialogDescription>
                            {props.description ||
                                "Chọn ảnh bạn muốn tải (đây là tính năng đang được phát triển nên bạn chỉ có thể thay đổi cùng lúc tất cả các ảnh )"}
                        </DialogDescription>
                        <div>
                            <Input
                                name="images"
                                type="file"
                                multiple={props.multiple}
                                onChange={handleChangeImage}
                                accept="image/*"
                            />
                        </div>
                        <div className="min-h-[60svh] max-h-[400px] md:max-h-[600px] overflow-y-scroll overflow-x-hidden custom-scroll w-full sm:p-5 my-5">
                            {images && images?.length > 0 ? (
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 gap-5 p-5">
                                    {Array.from(images).map((image, index) => {
                                        return (
                                            <ReviewImage
                                                image={image}
                                                key={index}
                                                onDelete={handleDeleteImage}
                                            ></ReviewImage>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground text-center">
                                    Chưa có ảnh nào được chọn
                                </p>
                            )}
                        </div>
                    </DialogHeader>
                    <DialogFooter>
                        <Button disabled={uploading}>
                            {uploading
                                ? "Đang xử lý"
                                : props.submitLabel || "Tải lên"}
                        </Button>
                        <DialogClose ref={buttonCloseRef}></DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

type ReviewImageProps = {
    image: File;
    onDelete: (name: string) => void;
};

const ReviewImage: FC<ReviewImageProps> = (props) => {
    return (
        <div className="relative">
            <img
                className="w-full h-full object-cover"
                src={URL.createObjectURL(props.image)}
                alt={`review-image-${props.image.name}`}
            />
            <Button
                onClick={() => props.onDelete(props.image.name)}
                variant="ghost"
                type="button"
                className="absolute -top-2 -right-2 bg-white backdrop-blur-sm bg-opacity-80 text-xs"
            >
                <X />
            </Button>
        </div>
    );
};

export default UploadImageWrapper;
