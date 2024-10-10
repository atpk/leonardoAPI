export const generateImage = async(prompt) => {
    try {
      // API options
      const url = 'https://cloud.leonardo.ai/api/rest/v1/generations';
      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: `Bearer ${import.meta.env.VITE_LEONARDO_API_KEY}`
        },
        body: JSON.stringify({
          alchemy: true,
          height: 768,
          modelId: 'b24e16ff-06e3-43eb-8d33-4416c2d75876',
          num_images: 1,
          presetStyle: 'DYNAMIC',
          prompt: prompt,
          width: 1024
        })
      };
      console.log(options);

      // call Leonardo API to generate images
      const response = await fetch(url, options);
      console.log("leonardo generation request response: ", response);

      if (!response.ok) {
        throw new Error("Failed to generate request.");
      }

      const data = await response.json();
      return data.sdGenerationJob.generationId;
    } catch (error) {
      console.error("Error generating image:", error);
    throw error;
    }
};

export const getImageData = async(generationId) => {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  try {
    let status = "PENDING";
    let imageData;
    
    while (status !== "COMPLETE") {
      const url = `https://cloud.leonardo.ai/api/rest/v1/generations/${generationId}`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          authorization: `Bearer ${import.meta.env.VITE_LEONARDO_API_KEY}`,
        },
      };
      const imageRes = await fetch(url, options);
      console.log("img response: ", imageRes);

      if (!imageRes.ok) {
        throw new Error("Failed to fetch images.");
      }

      imageData = await imageRes.json();
      console.log(imageData);

      status = imageData.generations_by_pk.status;

      if (status !== "COMPLETE") {
        console.log(`Status is ${status}, waiting 10 seconds before retrying...`);
        await delay(10000); // Wait for 10 seconds before checking again
      }
    }

    // return after status is "COMPLETE"
    return imageData.generations_by_pk.generated_images;
  } catch (error) {
    console.error("Error fetching image data:", error);
    throw error;
  }
};