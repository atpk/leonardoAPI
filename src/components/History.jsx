import React, { useEffect, useState } from "react";
import ImageCard from "./ImageCard";

const History = ({ user_id, history, setHistory }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Automatically load history when the component is mounted if history is empty
  useEffect(() => {
    if (history.length === 0) {
      const fetchHistory = async () => {
        setLoading(true);
        setError(null);
        
        try {
          const res = await fetch(`http://localhost:5000/get-images?user_id=${user_id}`);
          const historyData = await res.json();
          setHistory(historyData.generations);
        } catch (err) {
          console.log(err);
          setError("Error fetching history");
        } finally {
          setLoading(false);
        }
      };

      fetchHistory();
    }
  }, [user_id, history, setHistory]);

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
      <h3>Generated History:</h3>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {history.length > 0 && (
        <div>
          {history.map((entry, index) => (
            <div key={index}>
              <h4>{entry.prompt}</h4> {/* Display the prompt */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  marginTop: "10px",
                }}
              >
                {entry.generated_images.map((image, idx) => (
                  <ImageCard key={image.id} image={image} index={idx} handleDownload={handleDownload} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
