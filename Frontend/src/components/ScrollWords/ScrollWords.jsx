import React from "react";
import "./ScrollWords.css";

export default function ScrollWords({ lines }) {
  return (
    <span className="scroll-letters" aria-label={lines.join(" ")}>
      {lines.map((line, lineIndex) => (
        <React.Fragment key={`${line}-${lineIndex}`}>
          <span className="scroll-letter-line" aria-hidden="true">
            {line.split(" ").map((word, wordIndex) => (
              <React.Fragment key={`${word}-${wordIndex}`}>
                <span className="scroll-letter-word">
                  {Array.from(word).map((character, characterIndex) => (
                    <span className="scroll-letter" key={`${character}-${characterIndex}`}>{character}</span>
                  ))}
                </span>
                {wordIndex < line.split(" ").length - 1 ? " " : null}
              </React.Fragment>
            ))}
          </span>
          {lineIndex < lines.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </span>
  );
}
