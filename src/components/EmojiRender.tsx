import React from "react";
import twemoji from "twemoji";

interface EmojiProps {
  text: string;
  size?: number; // optional size control
}

const EmojiRender: React.FC<EmojiProps> = ({ text, size = 32 }) => {
  if (!text) return null;
  
  // Separa los emojis correctamente respetando Unicode
  const emojis = Array.from(text);
  
  return (
    <span style={{ display: "inline-flex", gap: size * 0.15 }}>
      {emojis.map((emoji, index) => {
        const svgHTML = twemoji.parse(emoji, {
          folder: "svg",
          ext: ".svg",
          base: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/",
        });
        return (
          <span
            key={index}
            style={{ width: size, height: size, display: "inline-block" }}
            dangerouslySetInnerHTML={{ __html: svgHTML }}
          />
        );
      })}
    </span>
  );
};

export default EmojiRender;
