<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <link rel="stylesheet" href="asserts/css/bootstrap.min.css" />
  <link rel="stylesheet" href="asserts/css/font-awesome-4.7.0/css/font-awesome.css">
  <link rel="stylesheet" href="asserts/leaflet/leaflet.css" />
  <link rel="stylesheet" href="asserts/leaflet/Leaflet.EasyButton/src/easy-button.css" />
  <link rel="stylesheet" href="asserts/leaflet/Leaflet.markercluster/dist/MarkerCluster.css">
  <link rel="stylesheet" href="asserts/leaflet/Leaflet.markercluster/dist/MarkerCluster.Default.css">
  <script src="asserts/js/countryBorders.js"></script>
  <link rel="stylesheet" href="asserts/css/style.css" />
  <title>Country Details</title>
  <link rel="icon" type="image/x-icon" href="asserts/images/favicon.ico">

</head>

<body>

  <div id="loader">
    <!-- <img src="asserts/images/loader.gif" alt="" srcset=""> -->
  </div>


  <nav class="navbar fixed-top  navbar-expand ">

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mx-auto">
        <li class="nav-item dropdown">
          <select class="custom-select custom-select-sm" id="countryList">
          </select>
        </li>
      </ul>
    </div>
  </nav>
  <div id="map"></div>

  <div class="container">
    <div class="modal fade" id="details" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
        <div class="modal-content ">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Country Details</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" id="modelBody"></div>
        </div>
      </div>
    </div>
  </div>


  <div class="container">
    <div class="modal fade" id="weather" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered " role="document">
        <div class="modal-content weather-modal">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Weather</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="weather container" id="weatherModal">

          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="modal fade" id="exRate" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Exchange Rates</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" id="exchange"></div>
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="modal fade" id="wiki" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
        <div class="modal-content ">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Wikipedia</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" id="wiki-container"></div>
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="modal fade" id="news" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
        <div class="modal-content ">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">News</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" id="news-container"></div>
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="modal fade" id="covid" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
        <div class="modal-content ">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Covid Details</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" id="covid-container"></div>
        </div>
      </div>
    </div>
  </div>


  <script type="application/javascript" src="asserts/js/jquery-2.2.3.min.js"></script>
  <script type="application/javascript" src="asserts/leaflet/leaflet.js"></script>
  <script type="application/javascript" src="asserts/leaflet/Leaflet.EasyButton/src/easy-button.js"></script>
  <script type="application/javascript" src="asserts/leaflet/Leaflet.markercluster/dist/leaflet.markercluster.js"></script>
  <script type="application/javascript" src="asserts/js/bootstrap.min.js"></script>
  <script type="application/javascript" src="asserts/js/main.js"></script>
</body>

</html>