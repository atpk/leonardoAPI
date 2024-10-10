import React, { useState } from "react";

const Prompt = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulating a call to your backend to upload and get image URLs
      const imageData = [
        { url: "https://cdn.leonardo.ai/users/0fd6ea2a-2358-491d-8ad3-a9da63b50e3a/generations/295e7ef0-ed65-4ae8-9834-d8cf5e71f6d1/Leonardo_Lightning_XL_create_designs_of_woolen_sweater_or_jack_0.jpg", id: "0" }, // Custom filename served from your backend
        { url: "https://cdn.leonardo.ai/users/0fd6ea2a-2358-491d-8ad3-a9da63b50e3a/generations/295e7ef0-ed65-4ae8-9834-d8cf5e71f6d1/Leonardo_Lightning_XL_create_designs_of_woolen_sweater_or_jack_1.jpg", id: "1" },
      ];
      setImages(imageData);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (url, filename) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  return (
    <div>
      <h1>Prompt Submission</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt"
          required
        />
        <button type="submit">Submit</button>
      </form>

      {loading && <p>Loading...</p>}
      {images.length > 0 && (
        <div>
          <h3>Generated Images:</h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            {images.map((image, index) => (
              <div key={image.id}>
                <img
                  src={image.url}
                  alt={`Generated ${index}`}
                  style={{ width: "200px", height: "auto" }}
                />
                <button
                  onClick={() => handleDownload(image.url, `user_${index}.jpg`)}
                >
                  Download Image {index + 1}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Prompt;
