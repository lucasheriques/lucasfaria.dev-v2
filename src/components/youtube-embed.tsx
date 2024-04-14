type YouTubeEmbedProps = {
  videoId: string;
  title: string;
};

export default function YoutubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <iframe
      width="560"
      height="315"
      src={embedUrl}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title={title} // Set the title for accessibility purposes
      className="mx-auto block"
    />
  );
}
