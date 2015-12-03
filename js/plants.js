/* Code to handle Plant Selection */
var crops,
    $crops;

function soiltip(value) {
    "use strict";
    var $soiltip = $("#soiltip"),
        text = "";
    if (value.value == 1) {
        //Loam
        text = 'Loam, your soil is ideal for growing most plants. Please click on continue to see the list of edible plants you can grow';

    } else {
        //Clay or Sand
        text = 'Clay or Sand, your soil needs to be amended ( <a href="http://www.smilinggardener.com/lessons/how-to-improve-clay-soil-and-sandy-soil">instructions</a> ). After you have amended the soil, please click on continue to see the list of edible plants you can grow.';
    }
    $soiltip.empty();
    $soiltip.append(text);
    
}

function loadcrops() {
    "use strict";
    //Does nothing for now, needs to filter
    $.getJSON('crop.json', function (json) {
        crops = json;
        //use underscore here
        //results()
    });
    $crops = $("#crops");
    
}

function filter() {
    "use strict";
    $("#crops tbody > tr").remove();
    $.each(crops, function (index, value) {
        var open = '<tr>',
            close = '/tr>',
            crop = '<td>' + value.Crop + '</td>',
            health = '<td>' + value["cancer.superfood"] + '</td>',
            tips = '<td>' + '<a href="' + value["Growing.tips"] + '"> Growing Tips' + '</td>';
            //button =  '<td><a class="button small round file" href="' + value.link + '"><span> Download ' + value.type + '</span></a></td>';
        
        $crops.append(open + crop + health + tips + close);
    });
}