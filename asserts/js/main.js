var countryNames;
var currentCountry;
var currencyModal = `<table class="table table-striped "><tbody>`;
var exchangeRate = "";
var east = "";
var south = "";
var border;
var markerClusters;
var position;
var modalBody = `<table class="table table-striped "><tbody>`;
var newsModal = `<table class="table"><tbody>`;
var wikiModal = "";
var currencyCode = "";
var covidModal = "";
var latitude = "";
var longitude = "";
var capital = "";
var wikiUrl = "";
var newsurl = "";
var weather = `<div class="card text-center" style="width: 18rem;">`;
var thumbnail = "";
var summary = "";
var title = "";
var weather = "";
const getCurrentPosition = (position) => {
  $.ajax({
    url: "asserts/php/opencagedata.php",
    type: "POST",
    dataType: "json",
    async: false,
    data: {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    },
    success: function (result) {
      if (result.status === "200") {
        const country = countryNames[result["countryCode"]];
        currentCountry = country;
        $("#countryList").val(result["countryCode"]);
        loadDetails(result["countryCode"]);
      } else {
        console.log("Not Found");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("error Location AJAX");
      console.log(jqXHR, textStatus, errorThrown);
    },
  });
};

$(function () {
  // $("#loader").show();
  $.ajax({
    url: "asserts/php/countryNames.php",
    type: "POST",
    async: false,
    dataType: "json",
    success: function (result) {
      countryNames = result;

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          getCurrentPosition(position);
        });
      } else {
        alert("Plaese Turn on location");
        location.reload();
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("error AJAX");
    },
  });

  for (let country in countryNames) {
    $("#countryList").append(
      `<option class="countryName" value="${country}" data-toggle="modal" data-target="#exampleModalCenter">
        ${countryNames[country]}
        </option>`
    );
  }
});

function loadDetails(val) {
  $("#details").modal("show");
  modalBody = `<table class="table table-striped"><tbody>`;
  currencyCode = "";
  latitude = "";
  longitude = "";
  south = "";
  east = "";
  capital = "";
  wikiUrl = "";
  currencyModal = `<table class="table table-striped "><tbody>`;
  covidModal = `<table class="table table-striped "><tbody>`;
  newsModal = `<table class="table"><tbody>`;
  wikiModal = `<div class="container"><div class="row">`;
  currentCountry = val;
  newsurl = "";
  thumbnail = "";
  summary = "";
  title = "";
  weather = "";
  if (markerClusters !== undefined) markers.removeLayer(markerClusters);
  if (position !== undefined) featureGroup.removeLayer(position);
  if (border !== undefined) featureGroup.removeLayer(border);
  $.ajax({
    url: "asserts/php/countryGeo.php",
    type: "POST",
    dataType: "json",
    async: false,
    data: {
      country: currentCountry,
    },
    success: function (result) {
      border = L.geoJSON(result["geoJson"], {
        style: {
          color: "#C70039",
          weight: 2,
          fillColor: "#900C3F",
          fillOpacity: 0.3,
        },
      });
      featureGroup.addLayer(border);
      $("#loader").fadeOut(1000);

      $.ajax({
        url: "asserts/php/getCountryCode.php",
        type: "POST",
        dataType: "json",
        async: false,
        data: {
          country: currentCountry,
        },
        success: function (result) {
          if (result.status === "200") {
            latitude += result["north"];
            longitude += result["west"];
            south += result["south"];
            east += result["east"];
            capital += result["capital"];
            currencyCode += result["currencyCode"];
            let population = result["population"];
            if (currentCountry == "IL" || currentCountry == "PS") {
              capital = "Jerusalem";
            }
            if (currentCountry == "TK") {
              capital = "Nukunonu";
            }

            population = population
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            modalBody += `<tr><td>Country Name </td> <td>${countryNames[currentCountry]}</td></tr>`;
            modalBody += ` <tr><td>Capital </td> <td> ${capital}</td></tr>
            <tr><td>Population </td> <td> ${population}</td></tr>`;
            map.fitBounds(border.getBounds());
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("error AJAX");
          console.log(jqXHR, textStatus, errorThrown);
          console.log(latitude, longitude, east, south);
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
            let formatter = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: currencyCode,
            });
            exchangeRate = formatter.format(result["rate"]);
            modalBody += `<tr><td>Current Exchange Rate </td> <td>$1.00 = ${exchangeRate}</td></tr>`;
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("error AJAX");
          console.log(jqXHR, textStatus, errorThrown);
          console.log(currencyCode);
        },
      });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("error Boder AJAX");
      console.log(jqXHR, textStatus, errorThrown);
    },
  });

  $.ajax({
    url: "asserts/php/wikiBounds.php",
    type: "POST",
    dataType: "json",
    data: {
      countryCode: currentCountry,
      north: latitude,
      east: east,
      south: south,
      west: longitude,
    },
    success: function (res) {
      if (res.status == "200") {
        for (let i = 0; i < res["data"].length; i++) {
          markerClusters = markers.addLayer(
            L.marker([res["data"][i]["lat"], res["data"][i]["lng"]], {
              icon: wikicon,
            })
              .bindPopup(
                `<a href="http://${res["data"][i]["url"]}" target="_blank">${res["data"][i]["title"]}</a>
                <hr>
                <p>${res["data"][i]["summary"]}</p>`
              )
              .openPopup()
          );
        }
        markers.addLayer(markers);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(latitude, longitude, south, east, currentCountry);
      console.log("error Wiki Marker Cluster AJAX");
      console.log(jqXHR, textStatus, errorThrown);
    },
  });

  $.ajax({
    url: "asserts/php/opencageForward.php",
    type: "POST",
    dataType: "json",
    async: false,
    data: {
      capital: capital.replace(" ", "%20"),
    },
    success: function (result) {
      latitude = result["lat"];
      longitude = result["lng"];
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(capital);
      console.log("error weather AJAX");
      console.log(jqXHR, textStatus, errorThrown);
    },
  });

  // $.ajax({
  //   url: "asserts/php/weather.php",
  //   type: "POST",
  //   dataType: "json",
  //   async: false,
  //   data: {
  //     lat: latitude,
  //     lng: longitude,
  //   },
  //   success: function (result) {
  //     if (result["status"] == "200") {
  //       modalBody += `<tr><td>Current weather</td> <td> ${result["weather"]}</td></tr>`;
  //     }
  //   },
  //   error: function (jqXHR, textStatus, errorThrown) {
  //     console.log(latitude, longitude);
  //     console.log("error weather AJAX");
  //     console.log(jqXHR, textStatus, errorThrown);
  //   },
  // });

  $.ajax({
    url: "asserts/php/covid.php",
    type: "GET",
    dataType: "json",
    data: {
      countryCode: currentCountry,
    },
    success: function (result) {
      const d = new Date(result["Date"]);
      let month;
      d.getMonth() < 10
        ? (month = "0" + (d.getMonth() + 1))
        : (month = d.getMonth());
      lastupdate = d.getFullYear() + "/" + month + "/" + d.getDate();
      totalCases = result["Confirmed"];
      totalDeaths = result["Deaths"];
      // activeCases = result["active"];
      // todayCases = result["todayCases"];
      // todayDeaths = result["todayDeaths"];
      covidModal += `
      <tr><td>Total Cases</td><td>${totalCases}</td></tr>
      <tr><td>Total Death</td><td>${totalDeaths}</td></tr>
      <tr><td>Last Update</td><td>${lastupdate}</td></tr>
      <tr class="bg-success"><td colspan="2" class="text-center text-white"><b><a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public" target="_blank" style="text-decoration: none;color: inherit;">Keep yourself and others safe!</b><img class="mask-img" src="asserts/images/who.png" alt="mask"></a></td></tr>
      </tbody></table>`;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(currentCountry);
      console.log("error COVID AJAX");
    },
  });

  $.ajax({
    url: "asserts/php/wiki.php",
    type: "POST",
    dataType: "json",
    async: false,
    data: {
      country: countryNames[currentCountry].replace(" ", "%20"),
    },
    success: function (result) {
      if (result.status === "200") {
        thumbnail = result["data"][0]["thumbnailImg"];
        title = result["data"][0]["title"];
        summary = result["data"][0]["summary"];
        wikiUrl = result["data"][0]["wikipediaUrl"];
        if (result["data"][0]["wikipediaUrl"]) {
          var url = `https://${result["data"][0]["wikipediaUrl"]}`;
          modalBody += `<tr><td>Wikipedia links </td> <td> <a href="${url}" target="_blank">${result["data"][0]["wikipediaUrl"]}</a></td></tr>`;
          modalBody += `</tbody></table>`;
          wikiModal += `<div class="col">
            <h5><b>${title}</b></h5>
            <p class="mb-0 wiki-text">${summary.replace(
              "(...)",
              `<p class="mt-0"><a href="http://${wikiUrl}" target="_blank">...read more</a></p>`
            )}</p>
          </div>
          </div>
          </div>
          `;

          $("#modelBody").html(modalBody);
          wikiUrl = url;
          newsurl = url;
          $.ajax({
            url: "asserts/php/news.php",
            type: "POST",
            dataType: "json",
            async: false,
            data: {
              countryCode: currentCountry,
            },
            success: function (res) {
              if (res["status"] == "200") {
                // console.log(res);
                if (res["totalResults"] > 0) {
                  for (let i = 0; i < res["totalResults"]; i++) {
                    let title;
                    let thumb;
                    let description = " ";
                    let newsURL;
                    try {
                      title = res["articals"][i]["title"];
                      description = res["articals"][i]["description"];
                      newsURL = res["articals"][i]["url"];
                    } catch {
                      continue;
                    }
                    try {
                      thumb = res["articals"][i]["urlToImage"];
                      if (res["articals"][i]["description"] !== null) {
                        description = res["articals"][i]["description"];
                      } else {
                        description = " ";
                      }
                    } catch {}
                    newsModal += `<tr>`;
                    if (thumb) {
                      newsModal += `<td><img class= "news-img"src="${thumb}" alt="news-image"></td>`;
                      newsModal +=
                        `<td><a href=${newsURL} target="_blank"><b>${title}</b></a>` +
                        `<br>` +
                        `${description}</td>`;
                    } else {
                      newsModal +=
                        `<td colspan="2"><a href=${newsURL} target="_blank"><b>${title}</b></a>` +
                        `<br>` +
                        `${description}</td>`;
                    }
                    newsModal += `</tr>`;
                  }
                  newsModal += `</tbody></table>`;
                } else {
                  newsModal += `<tr>`;
                  newsModal = `<td>No news available</td></tr></body></table>`;
                }
              } else {
                console.log(res,currentCountry);
                newsModal += `<tr>`;
                newsModal = `<td>No news available</td></tr></body></table>`;
              }
            },
            error: function (jqXHR, textStatus, errorThrown) {
              console.log("ajax error");
            },
          });
        }
      } else {
        console.log("Not found Wiki");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(countryNames[currentCountry], latitude);
      console.log(jqXHR, textStatus, errorThrown);
    },
  });

  $.ajax({
    url: "asserts/php/weatherforecast.php",
    type: "POST",
    dataType: "json",
    async: false,
    data: {
      lat: latitude,
      lng: longitude,
    },
    // complete: function (result) {
    //   $("#loader").css("display", "none");
    // },
    success: function (result) {
      if (result.status === "200") {
        weather += `
        <div class="card-body text-center">
        <img  class="weatherImg text-end" src ="https://openweathermap.org/img/wn/${
          result["weather"]["weather"][0]["icon"]
        }@4x.png" alt="Card image cap" alt="weather-icon">
        <h3 class="card-title">${Math.round(
          result["weather"]["main"]["temp"] - 273
        )} &#8451;</h3>
        <h5 class="card-text"><i class="fa fa-map-marker mr-1" aria-hidden="true"></i>&nbsp;${capital}</h5>
        <h5 class="card-text"><i class="fa fa-sun-o mr-1" aria-hidden="true"></i>&nbsp;${
          result["weather"]["weather"][0]["main"]
        }</h5>
        <p class="card-text">&nbsp;${
          result["weather"]["weather"][0]["description"]
        }</p>
        </div>
        `;
        weatherForecastNext();
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("weather forecast error");
      console.log("error AJAX");
      console.log(jqXHR, textStatus, errorThrown);
    },
  });
}

$("#countryList").on("change", function () {
  $("#loader").css("opacity", 0.8);
  $("#loader").css("display", "block");
  var val_ = $(this).val();
  setTimeout(loaddetails, 10);
  function loaddetails() {
    loadDetails(val_);
  }
});

function weatherForecastNext() {
  weather += `<div class="container">`;
  $.ajax({
    url: "asserts/php/weatherForcastenew.php",
    type: "POST",
    dataType: "json",
    async: false,
    data: {
      lat: latitude,
      lng: longitude,
    },
    success: function (result) {
      if (result.status === "200") {
        weather += `<div class="row">`;
        for (let i = 8; i < 25; i += 8) {
          var weatherDate = new Date(result["list"]["list"][i]["dt_txt"]);
          weather += `<div class="col-4 card-weather mb-5 text-center">`;
          weather += ` <div class="">
          <img src="https://openweathermap.org/img/wn/${
            result["list"]["list"][i]["weather"][0]["icon"]
          }@4x.png" width="50px" height="50px" alt="weather-icon">
          <p class="card-text small text-muted cardText">
          ${weatherDate.toDateString().substring(0, 3)}</P>
          <p class="small cardText"><i class="fa fa-thermometer-three-quarters mr-2" aria-hidden="true"></i>${Math.round(
            result["list"]["list"][i]["main"]["temp"] - 273
          )}&#8451;</p>
          <p class="small cardText">${
            result["list"]["list"][i]["weather"][0]["main"]
          }</p>
          `;
          weather += `</div></div>`;
        }
        weather += `</div></div>`;
      }
      $(".weather").html(weather);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(latitude, longitude);
      console.log("error AJAX");
      console.log(jqXHR, textStatus, errorThrown);
    },
  });
}

function currencyExchange() {
  currencyModal = `<table class="table table-striped "><tbody>
  <tr><td colspan="2"><img class="country" src="https://countryflagsapi.com/png/${currentCountry}" alt="${currentCountry}"></td></tr>
  <tr><td>Currency Code</td> <td>${currencyCode}</td></tr>
  <tr><td>Exchange Rate</td> <td>USD 1.00 = ${exchangeRate}</td></tr></tbody></table>
  `;
}

var map = L.map("map");

var Street = L.tileLayer(
  "https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png",
  {
    maxZoom: 20,
    attribution:
      '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }
).addTo(map);

var Dark = L.tileLayer(
  "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
  {
    maxZoom: 20,
    attribution:
      '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
  }
);

var Satellite = L.tileLayer(
  "https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer/tile/{z}/{y}/{x}",
  {
    maxZoom: 20,
    attribution:
      'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>',
  }
);

var wikicon = L.icon({
  iconUrl: "asserts/images/wiki.png",

  iconSize: [32, 32],
  iconAnchor: [22, 94],
  shadowAnchor: [4, 62],
  popupAnchor: [-3, -76],
});

var featureGroup = L.featureGroup();
var markers = L.markerClusterGroup();
featureGroup.addTo(map);
markers.addTo(map);

var baseMaps = {
  Street: Street,
  Satellite: Satellite,
  Dark: Dark,
};
L.control.layers(baseMaps).addTo(map);

// ======================BUTTONS==============================

L.easyButton("fa fa-info-circle", function (btn, map) {
  $("#details").modal("show");
}).addTo(map);

L.easyButton("fa fa-sun-o", function (btn, map) {
  $("#weather").modal("show");
}).addTo(map);

L.easyButton("fa fa-usd", function (btn, map) {
  currencyExchange();
  $("#exchange").html(currencyModal);
  $("#exRate").modal("show");
}).addTo(map);

L.easyButton("fa fa-medkit", function (btn, map) {
  $("#covid-container").html(covidModal);
  $("#covid").modal("show");
}).addTo(map);

L.easyButton("fa fa-newspaper-o", function (btn, map) {
  $("#news-container").html(newsModal);
  $("#news").modal("show");
}).addTo(map);

L.easyButton("fa fa-wikipedia-w", function (btn, map) {
  $("#wiki-container").html(wikiModal);
  $("#wiki").modal("show");
}).addTo(map);
