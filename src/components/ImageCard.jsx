import React from "react";

const ImageCard = ({ image, index, handleDownload }) => {
  return (
    <figure key={image.id}>
      <img
        src={image.url}
        alt={`Generated ${index}`}
        style={{ width: "200px", height: "auto" }}
        
      />
      <figcaption>
        <button onClick={() => handleDownload(image.url, `${image.id}.jpg`)}>
          Download Image {index + 1}
        </button>
      </figcaption>
    </figure>
  );
};

export default ImageCard;
