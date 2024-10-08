import React, {  useState } from "react";
import { imageData } from "./data";

const Prompt = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [showImages, setShowImages] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [generationId, setGenerationId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);
    setShowImages(false);

    try {
      // API options
      // const url = 'https://cloud.leonardo.ai/api/rest/v1/generations';
      // const options = {
      //   method: 'POST',
      //   headers: {
      //     accept: 'application/json',
      //     'content-type': 'application/json',
      //     authorization: `Bearer ${import.meta.env.VITE_LEONARDO_API_KEY}`
      //   },
      //   body: JSON.stringify({
      //     alchemy: true,
      //     height: 768,
      //     modelId: 'b24e16ff-06e3-43eb-8d33-4416c2d75876',
      //     num_images: 4,
      //     presetStyle: 'DYNAMIC',
      //     prompt: prompt,
      //     width: 1024
      //   })
      // };
      // console.log(options);

      // // call API
      // const response = await fetch(url, options);
      // console.log(response);

      // if (!response.ok) {
      //   throw new Error("Failed to fetch the response.");
      // }

      // const data = await response.json();
      const data = {
        sdGenerationJob: {
          generationId: "295e7ef0-ed65-4ae8-9834-d8cf5e71f6d1",
          apiCreditCost: 30,
        },
      };
      setResponse(data);
      setGenerationId(data.sdGenerationJob.generationId);
      setShowImages(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleShowImages = async () => {
    setLoading(true);
    try {
      // // Fetch the image URLs from another API
      // const url = `https://cloud.leonardo.ai/api/rest/v1/generations/${generationId}`;
      // const options = {
      //   method: "GET",
      //   headers: {
      //     accept: "application/json",
      //     authorization: `Bearer ${import.meta.env.VITE_LEONARDO_API_KEY}`,
      //   },
      // };
      // const imageRes = await fetch(url, options);

      // if (!imageRes.ok) {
      //   throw new Error("Failed to fetch images.");
      // }

      // const imageData = await imageRes.json();
      // console.log(imageData);
      // setImages(imageData.generations_by_pk.generated_images);
      console.log(imageData);
      setImages(imageData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (url, filename) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const link = document.createElement('a');
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
      {error && <p style={{ color: "red" }}>{error}</p>}
      {response && (
        <div>
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}

      {showImages && (
        <div>
          <h3>Generated Images:</h3>
          <button onClick={handleShowImages}>Fetch Images</button>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            {images.map((image) => (
              <div key={image.id}>
                <img
                  src={image.url}
                  alt="Generated"
                  style={{ width: "200px", height: "auto" }}
                />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
            {images.map((image, index) => (
              <div key={image.id}>
                <img src={image.url} alt={`Generated ${index}`} style={{ width: '200px', height: 'auto' }} />
                <button onClick={() => handleDownload(image.url, `user_${index}.jpg`)}>Download Image {index + 1}</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Prompt;
