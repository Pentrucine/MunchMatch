document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname !== "/munch") return;
  fetch(`/api/friends`)
    .then((res) => res.json())
    .then((results) => {
      let friendsList = "";

      results.forEach((friend) => {
        friendsList += `<li class="list-group-item"><span class="avatar avatar-lg mx-1"><img src="../assets/images/users/${friend.username}.jpg" class="rounded-circle"></span>${friend.firstname} ${friend.lastname}</li>`;
      });

      document.querySelector(".friends-list").insertAdjacentHTML("beforeend", `<ul class="list-group list-group-separated">${friendsList}</ul>`);
    });

  fetch(`/api/getLocalRestaurants`)
    .then((res) => res.json())
    .then((results) => {
      let restaurantList = "";

      results.forEach((restaurant) => {
        restaurantList += `<li class="list-group-item"><span class="avatar avatar-lg mx-1"><img src="${restaurant[1].data[0].images.small.url}" class="rounded-circle"></span>${restaurant[0].name.length < 20 ? restaurant[0].name : restaurant[0].name.substring("0", "20")}</li>`;
      });

      document.querySelector(".restaurants-list").insertAdjacentHTML("beforeend", `<ul class="list-group list-group-separated">${restaurantList}</ul>`);
    });
});
