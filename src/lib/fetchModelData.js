/**
 * fetchModel - Fetch a model (JSON) from the web server.
 *
 * @param {string} url   The URL to issue the GET request.
 */
async function fetchModel(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      console.error("HTTP error", response.status, response.statusText);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Fetch failed:", err);
    return null;
  }
}

export default fetchModel;
