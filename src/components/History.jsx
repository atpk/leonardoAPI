import React, { useState } from "react";
import { history } from "./data";

const History = ({user_id}) => {
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
      // Fetch user's prompt history and image data
      const res = await fetch(`http://localhost:5000/get-images?user_id=${user_id}`);
      const history = await res.json();
      
      setResponse(history.generations); // Assuming response contains `generations` with prompt and images
      setShowImages(true);
    } catch (err) {
      console.log(err);
      setError("Error fetching history");
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
