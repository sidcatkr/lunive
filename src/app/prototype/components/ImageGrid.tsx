import Image from "next/image";

interface GridImage {
  src: string;
  alt: string;
  number?: number;
}

interface ImageGridProps {
  images: GridImage[];
}

export default function ImageGrid({ images }: ImageGridProps) {
  return (
    <div className="my-10 grid grid-cols-1 md:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded-lg bg-[var(--essay-border)]"
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={400}
            height={300}
            className="w-full h-auto aspect-[4/3] object-cover"
          />
          {image.number && (
            <span
              className="absolute bottom-2 right-2 w-5 h-5 flex items-center justify-center text-[10px] font-medium backdrop-blur-sm rounded-full shadow-sm"
              style={{
                backgroundColor: "var(--essay-card)",
                color: "var(--essay-text)",
                border: "1px solid var(--essay-border)",
              }}
            >
              {image.number}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
