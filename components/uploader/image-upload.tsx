import { useCallback } from "react";
import { ImageUp } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
    const handleFileChange = useCallback(
        async (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (!file) return;

            try {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", "z6euuqyl");

                const response = await fetch(
                    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to upload image");
                }

                const result = await response.json();
                onChange(result.secure_url);
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        },
        [onChange]
    );

    const handleClick = () => {
        const input = document.getElementById("file-upload") as HTMLInputElement;
        if (input) {
            input.click();
        }
    };

    return (
        <div
            onClick={handleClick}
            className={`relative cursor-pointer hover:opacity-70 transition border-dashed border-2 ${value && value.length > 0 ? 'p-5' : 'p-10'} border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600`}
        >
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="file-upload"
            />
            <label htmlFor="file-upload">
                {value && value.length <= 0 && (
                    <div>
                        <ImageUp size={50} />
                        <div className="font-semibold text-lg">
                            Click to upload
                        </div>
                    </div>
                )}
                {value && value.length > 0 && (
                    <div className="flex flex-row flex-wrap gap-5 w-fit h-full">
                        <Image
                            alt={`Uploaded image`}
                            width={100}
                            height={100}
                            style={{ objectFit: 'contain' }}
                            src={value}
                        />
                    </div>
                )}
            </label>
        </div>
    );
};

export default ImageUpload;
