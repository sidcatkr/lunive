import Image from "next/image";

interface ImageBlockProps {
  src: string;
  alt: string;
  caption?: string;
  number?: number;
  priority?: boolean;
}

export default function ImageBlock({
  src,
  alt,
  caption,
  number,
  priority = false,
}: ImageBlockProps) {
  return (
    <figure className="my-10 relative">
      <div className="relative overflow-hidden rounded-lg bg-[var(--essay-border)]">
        <Image
          src={src}
          alt={alt}
          width={800}
          height={500}
          className="w-full h-auto"
          priority={priority}
        />
        {number && (
          <span
            className="absolute bottom-3 right-3 w-6 h-6 flex items-center justify-center text-xs font-medium backdrop-blur-sm rounded-full shadow-sm"
            style={{
              backgroundColor: "var(--essay-card)",
              color: "var(--essay-text)",
              border: "1px solid var(--essay-border)",
            }}
          >
            {number}
          </span>
        )}
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-[var(--essay-muted)] text-center italic font-[family-name:var(--font-newsreader)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
