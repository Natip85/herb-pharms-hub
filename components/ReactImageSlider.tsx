"use client";
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export default function ReactImageSlider({
  images,
}: {
  images: ReactImageGalleryItem[];
}) {
  return <ImageGallery showPlayButton={false} items={images} />;
}
