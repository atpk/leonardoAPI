import React, { useState } from "react";

const Prompt = ({ user_id, addNewPromptToHistory }) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock image data for the current prompt
      const imageData = [
        { url: "https://cdn.leonardo.ai/users/0fd6ea2a-2358-491d-8ad3-a9da63b50e3a/generations/295e7ef0-ed65-4ae8-9834-d8cf5e71f6d1/Leonardo_Lightning_XL_create_designs_of_woolen_sweater_or_jack_0.jpg", id: "0" },
        { url: "https://cdn.leonardo.ai/users/0fd6ea2a-2358-491d-8ad3-a9da63b50e3a/generations/295e7ef0-ed65-4ae8-9834-d8cf5e71f6d1/Leonardo_Lightning_XL_create_designs_of_woolen_sweater_or_jack_1.jpg", id: "1" },
      ];

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

      // Clear the input field after submission
      setPrompt("");
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
