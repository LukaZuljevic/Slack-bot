const GIPHY_API_URL = "https://api.giphy.com/v1/gifs/search";

const fetchDataWithGiphy = async ({ itemNumber, itemContent }) => {
  try {
    const response = await fetch(
      `${GIPHY_API_URL}?q=${encodeURIComponent(
        itemContent
      )}&limit=${itemNumber}&api_key=${process.env.API_KEY}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) throw new Error("Could not fetch data from giphy");

    const data = await response.json();

    const attachments = data.data.map((item) => ({
      fallback: "GIF",
      image_url: item.images.original.url,
    }));

    return attachments;
  } catch (error) {
    console.log("Error", error);
    return [];
  }
};

module.exports = { fetchDataWithGiphy };
