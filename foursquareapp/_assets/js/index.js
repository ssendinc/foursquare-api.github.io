function mapInit() {
  var mapProp = {
    center: {lat: 41.015137, lng: 28.979530},
    zoom: 10,
  };
  map = new google.maps.Map(document.getElementById('map'), mapProp);

} 

$('.search').click(function(){
      mapInit()
      var value = $(".search-val").val();
        $.ajax({
          url: "https://api.foursquare.com/v2/venues/search?v=20181001&ll=41.0082,28.9784&query=" + value + "&limit=50&intent=browse&radius=90000&client_id=YVLW5UI5FRG4WK20UF4WO4HDXSYT4XIFUTD3GZOQHWNVVM2N&client_secret=C3B0MR3V1RJYJHZM1TD4UTXHZC1SJDP2DC4YBFRGLTFCJLVT",
          type: 'POST',
          dataType: 'json',
          success: function(response){
            console.log(response)
            var response = response.response.venues;

          for (i = 0; i < response.length; i++) {
                var _this = response[i];
                var lat = _this.location.lat;
                var lng = _this.location.lng;
                var title = _this.name;
                var image = _this.categories[0].icon.prefix + '64' +_this.categories[0].icon.suffix;
                var hasPerk = _this.hasPerk;
                console.log(image)
                marker = new google.maps.Marker({
                  position: {lat: lat , lng: lng},
                  map : map,
                  title: title,
                  icon: image

               });   
               addInfoWindow(marker, _this);

               function addInfoWindow(marker) {
 
                 var contentString = '<div id="content">'+
                 '<div id="siteNotice">'+
                 '</div>'+
                 '<h1 id="firstHeading" class="firstHeading">' + title +'</h1>'+
                 '<div id="bodyContent">'+
                 '<ul>' +
                 '<li>Park:' + hasPerk +'</li>' +  
                 '</ul>'+
                 '</div>'+
                 '</div>';
 
                 var infoWindow = new google.maps.InfoWindow({
                     content: contentString
                 });
     
                 google.maps.event.addListener(marker, 'click', function () {
                   infoWindow.open(map, marker);
                 });


               }
 
             }  
           },
            error: function () {
              alert("error");
          }
        });
});
