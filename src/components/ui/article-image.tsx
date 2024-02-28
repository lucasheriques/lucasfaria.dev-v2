import Image from "next/image";

type ArticleImageProps = {
  src: string;
  alt?: string;
  caption: string;
};

export default function ArticleImage({ src, alt, caption }: ArticleImageProps) {
  return (
    <figure className="not-prose relative mx-auto my-8 flex flex-col items-center justify-center gap-2 text-center md:w-3/4">
      <Image src={src} fill alt={alt ?? caption} className="!relative" />
      <figcaption className="not-prose text-xs md:text-sm">
        {caption}
      </figcaption>
    </figure>
  );
}
