import React from "react";
import twemoji from "twemoji";

interface EmojiProps {
  text: string;
  size?: number; // optional size control
}

const EmojiRender: React.FC<EmojiProps> = ({ text, size = 32 }) => {
  // Convert text to Twemoji SVG
  const svgHTML = twemoji.parse(text, {
    folder: "svg",
    ext: ".svg",
    base: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/",
  });

  if (!text) return null;
  
  return (
    <span
      style={{ width: size, height: size, display: "inline-block" }}
      dangerouslySetInnerHTML={{ __html: svgHTML }}
    />
  );
};

export default EmojiRender;
