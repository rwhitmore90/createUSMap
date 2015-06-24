var selectedStates = [];
var selectedStatesColors = [];
function colorMap(stateArray){
    d3.select('svg').remove();
    var w = 800, h = 500;
    var dataState, i, x, stateAbr, j, jsonState;
    var projection = d3.geo.albersUsa().translate([w/2, h/2]);
    var path = d3.geo.path().projection(projection);
    var svg = d3.select("#map").append("svg").attr("width", w).attr("height", h);
    d3.json("us-states.json", function(json) {
    for (i = 0; i < stateArray.length; i++) {
        dataState = stateArray[i][0].trim().toUpperCase();
        if(dataState.length<3){
            for (x = 0; x <usStates.length; x++){
                stateAbr = usStates[x].abbreviation;
                if(dataState == stateAbr){
                    dataState = usStates[x].name;
                    break;
                }
            }
        }
        for (j = 0; j < json.features.length; j++) {
            jsonState = json.features[j].properties.name.toUpperCase();
            if (dataState == jsonState) {
                json.features[j].properties.value = stateArray[i][1];
                break;
            }
        } 
    }
    svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path)
        .on("click", function(d){
            appendToWebPage(d.properties.name);
        })
        .style("fill", function(d) {
            var value = d.properties.value;
            if (value) {
                return value;
            } else {
                return "#CCC";
            }
        });
    });
}
function appendToWebPage(stateName){
    var k, outputList;
    if (!isInArray(stateName, selectedStates)){
        selectedStates.push(stateName);
        document.getElementById('stateList').innerHTML= "";
        outputList = '';
        for(k=0; k<selectedStates.length; k++){
            if (k>0){
                outputList += '<p>'+ (k+1) + '. ' + selectedStates[k] + ' '+  createDropDownList(k)+ '</p>';
            } else{
                outputList = '<p>'+ (k+1) + '. ' + selectedStates[k] + ' ' +  createDropDownList(k)+ '</p>';
            }
        
        }
        document.getElementById('stateList').innerHTML=outputList;
    }
    
}
function isInArray(value, array) {
  return array.indexOf(value) > -1;
}
function clearList(){
    selectedStates = [];
    selectedStatesColors = [];
    document.getElementById('stateList').innerHTML= "";
    colorMap('','');
}
function createDropDownList(idNumber){
    var z, colorState;
    var dropDownHTML = '<select class='+idNumber+' onchange="updateMap(this)">';
    for(z=0; z<colorList.length; z++){
        colorState = colorList[z] +'-'+ idNumber;
        dropDownHTML += '<option value='+colorState+'>'+colorList[z]+'</option>';
    }
    dropDownHTML +='</select>';
    return dropDownHTML;
}
function updateMap(stateColor){
    colorToSetState = stateColor.value.slice(0,stateColor.value.indexOf('-'));
    stateToSetID = stateColor.value.slice(stateColor.value.indexOf('-')+1, stateColor.value.length);
    selectedStatesColors.push([selectedStates[stateToSetID], colorToSetState]);
    colorMap(selectedStatesColors);
    //alert(stateToSetID);
}
var colorList = ['#CCC', '#ADF123', '#ED1539', '#3E1596', '#BB6CF0', '#37CC6B', '#F5972C', '#2C7AF5'];
var usStates = [
{ name: 'ALABAMA', abbreviation: 'AL'},
{ name: 'ALASKA', abbreviation: 'AK'},
{ name: 'AMERICAN SAMOA', abbreviation: 'AS'},
{ name: 'ARIZONA', abbreviation: 'AZ'},
{ name: 'ARKANSAS', abbreviation: 'AR'},
{ name: 'CALIFORNIA', abbreviation: 'CA'},
{ name: 'COLORADO', abbreviation: 'CO'},
{ name: 'CONNECTICUT', abbreviation: 'CT'},
{ name: 'DELAWARE', abbreviation: 'DE'},
{ name: 'DISTRICT OF COLUMBIA', abbreviation: 'DC'},
{ name: 'FEDERATED STATES OF MICRONESIA', abbreviation: 'FM'},
{ name: 'FLORIDA', abbreviation: 'FL'},
{ name: 'GEORGIA', abbreviation: 'GA'},
{ name: 'GUAM', abbreviation: 'GU'},
{ name: 'HAWAII', abbreviation: 'HI'},
{ name: 'IDAHO', abbreviation: 'ID'},
{ name: 'ILLINOIS', abbreviation: 'IL'},
{ name: 'INDIANA', abbreviation: 'IN'},
{ name: 'IOWA', abbreviation: 'IA'},
{ name: 'KANSAS', abbreviation: 'KS'},
{ name: 'KENTUCKY', abbreviation: 'KY'},
{ name: 'LOUISIANA', abbreviation: 'LA'},
{ name: 'MAINE', abbreviation: 'ME'},
{ name: 'MARSHALL ISLANDS', abbreviation: 'MH'},
{ name: 'MARYLAND', abbreviation: 'MD'},
{ name: 'MASSACHUSETTS', abbreviation: 'MA'},
{ name: 'MICHIGAN', abbreviation: 'MI'},
{ name: 'MINNESOTA', abbreviation: 'MN'},
{ name: 'MISSISSIPPI', abbreviation: 'MS'},
{ name: 'MISSOURI', abbreviation: 'MO'},
{ name: 'MONTANA', abbreviation: 'MT'},
{ name: 'NEBRASKA', abbreviation: 'NE'},
{ name: 'NEVADA', abbreviation: 'NV'},
{ name: 'NEW HAMPSHIRE', abbreviation: 'NH'},
{ name: 'NEW JERSEY', abbreviation: 'NJ'},
{ name: 'NEW MEXICO', abbreviation: 'NM'},
{ name: 'NEW YORK', abbreviation: 'NY'},
{ name: 'NORTH CAROLINA', abbreviation: 'NC'},
{ name: 'NORTH DAKOTA', abbreviation: 'ND'},
{ name: 'NORTHERN MARIANA ISLANDS', abbreviation: 'MP'},
{ name: 'OHIO', abbreviation: 'OH'},
{ name: 'OKLAHOMA', abbreviation: 'OK'},
{ name: 'OREGON', abbreviation: 'OR'},
{ name: 'PALAU', abbreviation: 'PW'},
{ name: 'PENNSYLVANIA', abbreviation: 'PA'},
{ name: 'PUERTO RICO', abbreviation: 'PR'},
{ name: 'RHODE ISLAND', abbreviation: 'RI'},
{ name: 'SOUTH CAROLINA', abbreviation: 'SC'},
{ name: 'SOUTH DAKOTA', abbreviation: 'SD'},
{ name: 'TENNESSEE', abbreviation: 'TN'},
{ name: 'TEXAS', abbreviation: 'TX'},
{ name: 'UTAH', abbreviation: 'UT'},
{ name: 'VERMONT', abbreviation: 'VT'},
{ name: 'VIRGIN ISLANDS', abbreviation: 'VI'},
{ name: 'VIRGINIA', abbreviation: 'VA'},
{ name: 'WASHINGTON', abbreviation: 'WA'},
{ name: 'WEST VIRGINIA', abbreviation: 'WV'},
{ name: 'WISCONSIN', abbreviation: 'WI'},
{ name: 'WYOMING', abbreviation: 'WY' }
]; 
