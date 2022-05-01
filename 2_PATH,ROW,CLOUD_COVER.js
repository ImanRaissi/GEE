/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometry = /* color: #d63000 */ee.Geometry.Polygon(
        [[[44.95073760124827, 37.463208608151646],
          [45.04412139031077, 37.23613643218353],
          [45.30230010124827, 37.06099861658021],
          [45.58794463249827, 36.95133164884643],
          [45.96147978874827, 36.96011082759109],
          [45.98345244499827, 37.13110241153091],
          [45.98345244499827, 37.33228924219874],
          [45.80767119499827, 37.759111526629646],
          [45.59343779656077, 38.14461449607579],
          [45.35173857781077, 38.37752788297355],
          [44.68706572624827, 38.24390963171846]]]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
Map.centerObject(geometry);

// PATH , ROW , CLOUD_COVER

var landsat = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
.filterBounds(geometry)
.filterDate('2020-01-01','2021-01-01')
.filter(ee.Filter.equals('WRS_PATH',168))
.filter(ee.Filter.equals('WRS_ROW',34))
.filter(ee.Filter.lessThan('CLOUD_COVER',10));

// NDVI

var NDVI = landsat.map(function(img){
  var index = img.normalizedDifference(['B5','B4']);
  var id = img.id();
  var clip = index.clip(geometry);
  return index.rename(id);
});

var stack = NDVI.toBands();

print(stack);

//Export data to google drive

Export.image.toDrive({
  image : stack,
  description : 'NDVI_landsat_stack',
  scale : 30,
  maxPixels : 1e9,
});