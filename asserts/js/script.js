var countryIndex = {};
var modalBody = "";

$(function () {
  for (let index = 0; index < countryData.features.length; index++) {
    countryIndex[countryData.features[index].properties.iso_a2] = index;
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      $.ajax({
        url: "asserts/php/opencagedata.php",
        type: "POST",
        dataType: "json",
        data: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        success: function (result) {
          // console.log(JSON.stringify(result));
          if (result.status === "200") {
            // console.log("success");
            const index = countryIndex[result["countryCode"]];
            const curGeoJson = countryData.features[index];
            // const emptyGeoJson = emptyData.features[0];
            // L.geoJSON(emptyGeoJson).addTo(map);
            L.geoJSON(curGeoJson).addTo(map);
            // console.log(countryIndex);
            map.setView(
              [position.coords.latitude, position.coords.longitude],
              8
            );
            var marker = L.marker([
              position.coords.latitude,
              position.coords.longitude,
            ]);
            marker.addTo(map);
            marker.bindPopup("<b>Hello I am Here!</b>").openPopup();
          } else {
            console.log("Not Found");
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("error AJAX");
          console.log(jqXHR, textStatus, errorThrown);
        },
      });
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }

  for (let index = 0; index < countryData.features.length; index++) {
    $("#countryList").append(
      `<option class="countryName" value="${index}">${countryData.features[index].properties.name}</option>`
    );
  }

  // console.log($(".countryName"));
  $("#search").click(function () {
    modalBody = "";
    if ($("#countryList").val() != "Countries") {
      const countryCode =
        countryData.features[$("#countryList").val()].properties.iso_a2;
      var currencyCode = "";
      var latitude = "";
      var longitude = "";
      var capital = "";
      const geoJSON = countryData.features[$("#countryList").val()];
      L.geoJSON(geoJSON).addTo(map);
      $.ajax({
        url: "asserts/php/getCountryCode.php",
        type: "POST",
        dataType: "json",
        async: false,
        data: {
          country: countryCode,
        },
        success: function (result) {
          if (result.status === "200") {
            latitude += result["lat"];
            longitude += result["lng"];
            capital += result["capital"];
            map.setView([latitude, longitude], 2);
            modalBody += `<p>Country Name : ${
              countryData.features[$("#countryList").val()].properties.name
            }</P>
            <p>Capital : ${capital}</p>
            <p>Population : ${result["population"]}</P>`;
            currencyCode += result["currencyCode"];
            // console.log(latitude, longitude);
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("error AJAX");
          console.log(jqXHR, textStatus, errorThrown);
          console.log("country");
        },
      });

      $.ajax({
        url: "asserts/php/exchangerates.php",
        type: "POST",
        dataType: "json",
        async: false,
        data: {
          currencyCode: currencyCode,
        },
        success: function (result) {
          if (result.status === "200") {
            modalBody += `<p>Current Exchange Rate : ${result["rate"]}</p>`;
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("error AJAX");
          console.log(jqXHR, textStatus, errorThrown);
          console.log("currency");
        },
      });

      $.ajax({
        url: "asserts/php/weather.php",
        type: "POST",
        dataType: "json",
        async: false,
        data: {
          lat: latitude,
          lng: longitude,
        },
        success: function (result) {
          if (result.status === "200") {
            modalBody += `<p>Current weather : ${result["weather"]}</P>`;
            // console.log(result["weather"]);
            // console.log(modalBody);
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(latitude, longitude);
          console.log("error AJAX");
          console.log(jqXHR, textStatus, errorThrown);
        },
      });

      $.ajax({
        url: "asserts/php/wiki.php",
        type: "POST",
        dataType: "json",
        async: false,
        data: {
          city: capital.replace(" ", "%20"),
        },
        success: function (result) {
          if (result.status === "200") {
            // var url = new URL(result["data"][0]["wikipediaUrl"])
            var url =
              (modalBody += `<p>Wikipedia links : <a href="https://${result["data"][0]["wikipediaUrl"]}" target="_blank">${result["data"][0]["wikipediaUrl"]}</a></p>`);
            $("#modelBody").html(modalBody);
          }
          // console.log(modalBody);
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(capital);
          console.log("error AJAX");
          console.log(jqXHR, textStatus, errorThrown);
        },
      });
    }
  });
});

// var map = L.map("map").setView([7, 80], 10);
var map = L.map("map").fitWorld();
map.locate({ setView: true, maxZoom: 16 });
var OpenStreetMap_Mapnik = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    maxZoom: 4,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
);

var OpenStreetMap_France = L.tileLayer(
  "https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png",
  {
    maxZoom: 18,
    attribution:
      '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
);

var Stadia_AlidadeSmoothDark = L.tileLayer(
  "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
  {
    maxZoom: 20,
    attribution:
      '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
  }
);

function onLocationFound(e) {
  var radius = e.accuracy;

  L.marker(e.latlng)
    .addTo(map)
    .bindPopup("You are within " + radius + " meters from this point")
    .openPopup();

  L.circle(e.latlng, radius).addTo(map);
}

map.on("locationfound", onLocationFound);

OpenStreetMap_France.addTo(map);
