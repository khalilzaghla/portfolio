import React from "react";

interface VideoDemoProps {
  src: string;
  label?: string;
}

export function VideoDemo({ src, label }: VideoDemoProps) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-full overflow-hidden">
      <video
        src={src}
        controls
        playsInline
        preload="metadata"
        className="w-full h-auto aspect-video rounded-xl bg-slate-900 border border-slate-800"
        aria-label={label || "Video demonstration"}
      />
      {label && (
        <span className="text-sm text-slate-400 text-center font-medium">
          {label}
        </span>
      )}
    </div>
  );
}

interface VideoGalleryProps {
  videos: { src: string; label: string }[];
}

export function VideoGallery({ videos }: VideoGalleryProps) {
  if (!videos || videos.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {videos.map((video, index) => (
        <VideoDemo key={index} src={video.src} label={video.label} />
      ))}
    </div>
  );
}
