/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometry = 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[44.74830125794486, 38.28833946291397],
          [44.79773973450736, 37.96858054138431],
          [45.03394578919486, 37.27243357133698],
          [45.37452196106986, 37.07985227732133],
          [46.03370164856986, 37.29428673556118],
          [45.82496141419486, 38.31420444106756],
          [44.75379442200736, 38.2538384823515]]]),
    imageVisParam = {"opacity":1,"bands":["B5","B4","B3"],"gamma":1};
/***** End of imports. If edited, may not auto-convert in the playground. *****/
Map.centerObject(geometry);
var landsat = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
.filterBounds(geometry)
.filterDate('2020-10-01','2020-11-01');
 
print(landsat);

var landsat1 = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_169034_20201024');
print(landsat1);

var clip = landsat1.clip(geometry);
Map.addLayer(clip,{bands : ['B5','B4','B3']});

var ms = clip.select('B[2-7]');
var tir = clip.select('B10');
var stack = ee.Image.cat([ms,tir]);

Export.image.toDrive({
  image : stack,
  description : 'landsat8-stack',
  scale : 30,
  region : geometry,
  maxPixels : 1e9
});

//NDVI for landsat8

var NDVI = clip.normalizedDifference(['B5','B4']);
Map.addLayer(NDVI, {min: -1 , max: 1,
palette : ['#0eb1ff','#ffffff','#fff700','#12ff02']});

Export.image.toDrive({
  image : NDVI,
  description : 'Landsat_NDVI',
  scale : 30,
  region : geometry,
  maxPixels : 1e9
});





