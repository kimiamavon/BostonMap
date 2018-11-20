var margin = {
    top: 40,
    right: 40,
    bottom: 40,
    left: 60
};
var colorscale = d3.scale.quantize();
var width = 700;
var height = 580;
var inputValue = null;

var svg = d3.select( "body" )
    .append( "svg" )
    .attr( "width", width )
    .attr( "height", height );

var g = svg.append( "g" );

var albersProjection = d3.geoAlbers()
    .scale( 190000 )
    .rotate( [71.057,0] )
    .center( [0, 42.313] )
    .translate( [width/2,height/2] );

var geoPath = d3.geoPath()
    .projection( albersProjection );

g.selectAll( "path" )
    .data( neighborhoods_json.features )
    .enter()
    .append( "path" )
    .attr( "fill", "#ccc" )
    .attr( "stroke", "#333")
    .attr( "d", geoPath );


var country_data, ID_data = {};

var rawcountry_data, ID_data = {};


// Use the Queue.js library to read two files
queue()
    .defer(d3.csv, "data/hoods.csv")
    .await(function(error, rawcountry_data) {


        rawcountry_data.forEach(function(d) {
            d.Heroin= d.Heroin;
            d.Marijuana=d.Marijuana;
            d.Heroin = parseFloat(d.Heroin);
            d.Marijuana = parseFloat(d.Marijuana);
            //console.log(Heroin)
        });

        country_data = rawcountry_data.filter(function (d) {
            return d.index < 100;});

        rawcountry_data.forEach(function(d) {
            ID_data[d.neighborhood] = d;

        });

        g.selectAll( "path" )
            .data( neighborhoods_json.features )
            .enter()
            .append( "path" )
            .attr("class", "map")
            .attr( "d", geoPath );
        //console.log(ID_data)
        //console.log(neighborhoods_json.features)

        updateChoropleth();



    });
//console.log(ID_data)


function updateChoropleth() {


    var data_ = d3.select("#selector")
        .node()
        .value;

    var data_Values = country_data.map(function(d) {
        return d[data_];
    });



    console.log('<3');
    console.log(data_Values);
    console.log('<3');

    colorscale
        .domain(d3.extent(data_Values))
        .range([


            '#c6dbef',
            '#6baed6',
            '#2171b5',
            '#08306b',

        ]);
    console.log('B4 the map');

    g.selectAll(".map")
        .attr("fill", function(d) {
        return '#08306b';
            //return retrievevalue(d, data_);
        });

    console.log('after the map');

}


function grouptext(data_) {
    if (data_ === "Heroin" || data_ === "Marijuana") {
        return "????????????????"
    } else {
        return "";
    };
}

function retrievevalue(d, data_) {
    console.log('retrieve');
    var country_data2 = getit(d);
    var data_Value = country_data2[data_];
    console.log(colorscale(data_Value));
    return colorscale(data_Value);
}

function getit(d) {
    console.log('HEREEEEEE');
    console.log(ID_data[d.properties.adm0_a3_is]);
    return ID_data[d.properties.adm0_a3_is] ;
}



