$(document).ready(function() {
    function getSchedule(id, week) {
        if(isNaN(id)) { var type = 'teacher'; }
        else { var type = 'student'; }
        console.log(id);
        $('#content').html($('#template-schedule-page').html());
        $.ajax({
            url: "https://api.ccapp.it/schedule/" + type + "/" + id + "/" + week + "",
         
            // the name of the callback parameter, as specified by the YQL service
            jsonp: "callback",
         
            // tell jQuery we're expecting JSONP
            dataType: "jsonp",
         
            // work with the response
            success: function( response ) {
                if(typeof response.days !== "undefined" && response.days) {
                    $('#maandag').html(Mustache.render($('#template-' + type + '-table').html(), response.days[0]));
                    $('#dinsdag').html(Mustache.render($('#template-' + type + '-table').html(), response.days[1]));
                    $('#woensdag').html(Mustache.render($('#template-' + type + '-table').html(), response.days[2]));
                    $('#donderdag').html(Mustache.render($('#template-' + type + '-table').html(), response.days[3]));
                    $('#vrijdag').html(Mustache.render($('#template-' + type + '-table').html(), response.days[4]));
                } else {
                    $('#content').html('<center><h2>Niet gevonden</h2></center>');
                }
            }
        });
    }
    $.ajax({
        url: "https://api.ccapp.it/schedule/weeks?callback=callback",
     
        // the name of the callback parameter, as specified by the YQL service
        jsonp: "callback",
     
        // tell jQuery we're expecting JSONP
        dataType: "jsonp",
     
        // work with the response
        success: function( response ) {
            $('#weekselect').html(Mustache.render($('#template-weeks').html(), response));
            if(window.location.hash) {
                var id = window.location.hash;
                var cid = id.replace('#', '');
                getSchedule(cid, $('#week').val());
            }
        }
    });
    $('#search').submit(function(){
        getSchedule($('#id').val(), $('#week').val());
    });
});