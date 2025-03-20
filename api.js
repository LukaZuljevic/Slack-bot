const GIPHY_API_URL = "https://api.giphy.com/v1";

const fetchDataWithGiphy = async (itemNumber, itemContent, itemType) => {
  try {
    const url = `${GIPHY_API_URL}/${itemType}/search?q=${itemContent}&limit=${itemNumber}&api_key=${process.env.API_KEY}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

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
