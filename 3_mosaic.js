/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var table = ee.FeatureCollection("users/raissidehkordi/Urmia");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var Lake_Urmia = table;

// Shapefile Lake Urmia
Map.centerObject(Lake_Urmia);
Map.addLayer(Lake_Urmia);

// Mosaic, Median
var landsat = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
.filterBounds(Lake_Urmia)
.filterDate('2020-01-01','2020-04-01')
.median()
.clip(Lake_Urmia);


print(landsat);

// false color
Map.addLayer(landsat,{bands : ['B5','B4','B3']});