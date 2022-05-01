/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var table = ee.FeatureCollection("users/raissidehkordi/Urmia");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var Lake_Urmia = table;

// Shapefile Lake Urmia
Map.centerObject(Lake_Urmia);
Map.addLayer(Lake_Urmia);

// Mosaic, Median, maxNDVI
var landsat = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
.filterBounds(Lake_Urmia)
.filterDate('2020-07-01','2020-10-01');

print(landsat);

var NDVI = landsat.map(function(img){
  var clip = img.clip(Lake_Urmia);
  var index = clip.normalizedDifference(['B5','B4']);
  return index;
});

print(NDVI);

// max NDVI
var MVC = NDVI.max();

Map.addLayer(MVC);