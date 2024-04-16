export default fetchLocations = async (locationText) => {
  try {
    const apiKey = "aacfa879748e45b291751d430282f092";
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(locationText)}&limit=3&apiKey=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    currentItems = data.features;
    return currentItems.map((feature) => {
      return {
        address_line1: feature.properties.address_line1,
        address_line2: feature.properties.address_line2,
        street: feature.properties.city,
        housenumber: feature.properties.housenumber,
        postcode: feature.properties.postcode,
        city: feature.properties.city,
        resultType: feature.properties.result_type,
        lat: feature.properties.lat,
        lon: feature.properties.lon,
      };
    });
  } catch (error) {
    console.error("Fetch data error: ", error.message);
  }
};
