const fetch = require("node-fetch");

async function getLocalRestaurants() {
  let restaurants = [];

  const restaurantList = await (await fetch(`https://api.content.tripadvisor.com/api/v1/location/nearby_search?latLong=36.1131825,-115.1779385&category=restaurants&radius=10&radiusUnit=mi&key=B39061396158434EA38C61864CFE3424`, { method: "GET", headers: { accept: "application/json" } })).json();

  for (var restaurant in restaurantList.data) {
    const details = await (await fetch(`https://api.content.tripadvisor.com/api/v1/location/${restaurantList.data[restaurant].location_id}/details?key=B39061396158434EA38C61864CFE3424&language=en&currency=USD`, { method: "GET", headers: { accept: "application/json" } })).json();

    if (details.photo_count >= 5) {
      const photos = await (await fetch(`https://api.content.tripadvisor.com/api/v1/location/${restaurantList.data[restaurant].location_id}/photos?key=B39061396158434EA38C61864CFE3424&language=en`, { method: "GET", headers: { accept: "application/json" } })).json();
      restaurants.push([details, photos]);
    }

    if (restaurant == restaurantList.data.length - 1) return restaurants;
  }
}

async function searchLocalRestaurants(query) {
  return await (await fetch(`https://api.content.tripadvisor.com/api/v1/location/search?latLong=33.8802978%2C-117.8876539&key=B39061396158434EA38C61864CFE3424&searchQuery=${query}&language=en`, { method: "GET", headers: { accept: "application/json" } })).json();
}

module.exports = { getLocalRestaurants, searchLocalRestaurants };
