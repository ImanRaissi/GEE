/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometry = /* color: #d63000 */ee.Geometry.MultiPolygon(
        [[[[50.89213559324146, 32.4754943201877],
           [50.89278468782307, 32.47491957520001],
           [50.893326494044075, 32.47493315189556],
           [50.893492791003, 32.47502818870722],
           [50.89272031480671, 32.47579300511028]]],
         [[[50.89221015596042, 32.476418074126514],
           [50.89240595721851, 32.475684941729014],
           [50.89327499293933, 32.47607866172176],
           [50.89312747144351, 32.47632530152963],
           [50.892706364628175, 32.476626246434904]]]]),
    geometry2 = /* color: #98ff00 */ee.Geometry.MultiPoint(),
    geometry3 = /* color: #0b4a8b */ee.Geometry.Polygon(
        [[[50.89273024435386, 32.47663899471891],
          [50.893116482452, 32.476360677324514],
          [50.893282779410924, 32.47609367283658],
          [50.89395064945563, 32.47636972831022],
          [50.89407939548835, 32.476213598679145],
          [50.89465070600852, 32.47653717138176],
          [50.89406598444327, 32.47716735986527],
          [50.89415181513175, 32.477235241627604],
          [50.89358855123862, 32.477312174229716],
          [50.89286971922263, 32.47683700122444]]]),
    geometry4 = /* color: #ffc82d */ee.Geometry.MultiPoint(),
    geometry5 = /* color: #00ffff */ee.Geometry.MultiPolygon(
        [[[[50.89320236035067, 32.475703757584384],
           [50.893095071990075, 32.47544580222657],
           [50.89346521683413, 32.47503850278828],
           [50.89366370030123, 32.475133539488716],
           [50.89404993839938, 32.475178795025066],
           [50.89368515797335, 32.475622298077575],
           [50.89369588680941, 32.475690181005035],
           [50.89453273602206, 32.4760929519884],
           [50.894623931128564, 32.476156309057714],
           [50.894355710227074, 32.47635543098524],
           [50.894071396071496, 32.47619703857872],
           [50.89393192120272, 32.47633732901002],
           [50.89297169037539, 32.47589382948028]]],
         [[[50.89159147701839, 32.47538401500884],
           [50.89180605373958, 32.475442847038],
           [50.89182214699367, 32.476384154275415],
           [50.89165404172524, 32.476392205265924]]],
         [[[50.890506056266865, 32.47507527760696],
           [50.89063480229958, 32.475165788715536],
           [50.89086547227486, 32.47522462088729],
           [50.8908010992585, 32.476292644397894],
           [50.890280750709614, 32.47618855791813]]],
         [[[50.89018607260358, 32.473987047647796],
           [50.89030945421827, 32.47385580479226],
           [50.8907117855705, 32.47396894519633],
           [50.89094781996381, 32.47422237918549],
           [50.89045429350507, 32.47491479341133],
           [50.89007341982496, 32.47469304041541]]],
         [[[50.88852846743238, 32.473760766742956],
           [50.88918829085004, 32.47384222793421],
           [50.88968718172681, 32.4745617985891],
           [50.88927948595655, 32.4745255939137],
           [50.88925802828443, 32.47428573757131],
           [50.888673306719184, 32.47423595598621]]],
         [[[50.891263429072936, 32.47520820256912],
           [50.89097375049933, 32.4751493703866],
           [50.89164430275305, 32.47476922304975],
           [50.89271182194098, 32.47495477135518],
           [50.89209491386755, 32.475479735220866],
           [50.89171940460547, 32.47527608580883]]],
         [[[50.89413208932388, 32.479341944841686],
           [50.89348299474228, 32.47864051391256],
           [50.89296264619339, 32.478074839826846],
           [50.892565679259185, 32.47739602623146],
           [50.89293045968521, 32.47749558587912],
           [50.89489920110214, 32.47979956063018],
           [50.89467389554489, 32.47998962387758]]]]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
Map.centerObject(geometry);
var landsat = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
.filterBounds(geometry)
.filterDate('2021-01-01','2021-08-21');

print(landsat);

// NDVI time series

var NDVI = landsat.map(function(img){
  var index = img.normalizedDifference('B5','B4');
  var clip = index.clip(geometry);
  return clip.copyProperties(img, ['system:time_start',
  'system:time_end']);
});

var chart = ui.Chart.image.series(
  NDVI,geometry, ee.Reducer.mean(), 30,'systemtime_start'
);

print(chart);