import React, { useState } from "react";
import { history } from "./data";

const History = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [showImages, setShowImages] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);
    setShowImages(false);

    try {
    //   // API options
    //   const url = 'https://cloud.leonardo.ai/api/rest/v1/generations/user/0fd6ea2a-2358-491d-8ad3-a9da63b50e3a?offset=0&limit=10';
    //   const options = {method: 'GET', headers: {accept: 'application/json', authorization: `Bearer ${import.meta.env.VITE_LEONARDO_API_KEY}`}};
    //   console.log(options);

    //   // call API
    //   const response = await fetch(url, options);
    //   console.log("genneration history response", response);

    //   if (!response.ok) {
    //     throw new Error("Failed to fetch the response.");
    //   }

    //   const data = await response.json();
    //   console.log("json data: ", data);
    //   setResponse(data.generations);
      console.log(history);
      setResponse(history.generations); // assuming history contains an array of generation entries
      setShowImages(true);
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Prompt Submission</h1>
      <form onSubmit={handleSubmit}>
        <button type="submit">Load history</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {showImages && (
        <div>
          <h3>Generated Images:</h3>
          <div>
            {response.map((entry, index) => (
              <div key={index}>
                <h4>{entry.prompt}</h4> {/* Display the prompt label */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    marginTop: "10px",
                  }}
                >
                  {entry.generated_images.map((image) => (
                    <div key={image.id}>
                      <img
                        src={image.url}
                        alt={`Generated from prompt ${entry.prompt}`}
                        style={{ width: "200px", height: "auto" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
