const fetchLocations = async (locationText) => {
  try {
    const apiKey = "aacfa879748e45b291751d430282f092";
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(locationText)}&limit=5&filter=countrycode:pl&apiKey=${apiKey}`;
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

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

const rad2deg = (rad) => {
  return rad * (180 / Math.PI);
};

const getCoordinatesRange = (lat, lon, distance) => {
  const R = 6371; // Radius of the earth in km
  const angularDistance = distance / R; // Angular distance in radians

  // Convert lat and lon to radians
  const latRad = deg2rad(lat);
  const lonRad = deg2rad(lon);

  // Calculate the minimum and maximum latitudes
  const minLat = latRad - angularDistance;
  const maxLat = latRad + angularDistance;

  // Calculate the difference in longitude for the given latitude range
  const deltaLon = Math.asin(Math.sin(angularDistance) / Math.cos(latRad));

  // Calculate the minimum and maximum longitudes
  const minLon = lonRad - deltaLon;
  const maxLon = lonRad + deltaLon;

  // Convert back to degrees
  const minLatDeg = rad2deg(minLat);
  const maxLatDeg = rad2deg(maxLat);
  const minLonDeg = rad2deg(minLon);
  const maxLonDeg = rad2deg(maxLon);

  // Return the range of coordinates
  return {
    latMin: minLatDeg,
    lonMin: minLonDeg,
    latMax: maxLatDeg,
    lonMax: maxLonDeg,
  };
};

const isLocationInRange = (lat, lon, range) => {
  return lat >= range.latMin && lat <= range.latMax && lon >= range.lonMin && lon <= range.lonMax;
};

const isLocationinZone = (latStart, lonStart, latEnd, lonEnd, distanceBetween) => {
  distanceBetween = distanceBetween * 1000;
  return fetch(
    `https://router.project-osrm.org/route/v1/driving/${lonStart},${latStart};${lonEnd},${latEnd}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.routes[0].distance < distanceBetween) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.error('Error occured during fetching distance between locations!:', error);
      throw error; 
    });
};

export { fetchLocations, getCoordinatesRange, isLocationInRange, isLocationinZone };
