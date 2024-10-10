import React, { useState } from "react";
import { generateImage, getImageData } from "./utils/Leonardo";

const Prompt = ({ user_id, addNewPromptToHistory }) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // generate image request to leonardo AI
      const generationId = await generateImage(prompt);
      console.log("generation id: ", generationId);
      // const generationId = "70b21993-fd3b-48da-b342-b1a97ca968ca";
      // Clear the input field
      setPrompt("");
      // fetch images using generationId
      const imageData = await getImageData(generationId);
      console.log("image data: ", imageData);

      // Backend API call to save images with user_id and prompt
      await fetch("http://localhost:5000/save-images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user_id,
          prompt: prompt,
          images: imageData
        })
      });

      // Add the new prompt and images to the top of history
      addNewPromptToHistory({ prompt, generated_images: imageData });
    } catch (error) {
      console.error("Error saving images:", error);
    } finally {
      setLoading(false);
    }
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
    </div>
  );
};

export default Prompt;
