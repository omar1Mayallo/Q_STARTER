import { Buffer } from "buffer";
import { ChangeEvent, MutableRefObject, useRef, useState } from "react";
import { toastError } from "../components/Toasts";

export interface useUploadImageResult {
  imagePreviewUrl: string | null;
  fileInputRef: MutableRefObject<HTMLInputElement | null>;
  handleUploadImg: (
    e: ChangeEvent<HTMLInputElement>,
    handleFieldChange: (e: unknown) => void,
  ) => void;
  handleDeleteSelectedImage: (handleFieldChange: (e: unknown) => void) => void;
  isLoading: boolean;
}

const useUploadImage = (defaultImg: Buffer | null): useUploadImageResult => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(
    defaultImg
      ? `data:image/png;base64,${Buffer.from(defaultImg).toString("base64")}`
      : null,
  );

  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadImg = (
    e: ChangeEvent<HTMLInputElement>,
    handleFieldChange: (e: unknown) => void,
  ) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) return;

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      setIsLoading(true);
      reader.onloadstart = () => {
        // Handle the start of the file read operation
      };

      reader.onload = (event) => {
        setImagePreviewUrl(event.target?.result as string);
        setIsLoading(false);
        handleFieldChange(file);
      };

      reader.onerror = (error) => {
        toastError(`Error reading file: ${error}`);
        setIsLoading(false);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleDeleteSelectedImage = (
    handleFieldChange: (e: unknown) => void,
  ) => {
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
      setImagePreviewUrl(null);
    }
    handleFieldChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return {
    isLoading,
    imagePreviewUrl,
    fileInputRef,
    handleUploadImg,
    handleDeleteSelectedImage,
  };
};

export default useUploadImage;
