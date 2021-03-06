$(document).ready(function() {
    var currentweek;
    var current;
    function getSchedule(id, week, goToToday) {
        var days = ['maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag'];
        var dow = new Date().getDay();
        if(isNaN(id)) { var type = 'teacher'; }
        else { var type = 'student'; }
        console.log(id);
        $('#content').html($('#template-schedule-page').html());
        $.ajax({
            url: "https://api.ccapp.it/v1/" + type + "/" + id + "/schedule/" + week + "?callback=callback",

            // the name of the callback parameter, as specified by the YQL service
            jsonp: "callback",

            // tell jQuery we're expecting JSONP
            dataType: "jsonp",

            // work with the response
            success: function( response ) {
                if(typeof response.lessons[0] !== "undefined" && response.lessons[0]) {
                    $('#maandag').html('<center><h3>Maandag</h3></center>' + Mustache.render($('#template-' + type + '-table').html(), response.lessons[0]));
                    $('#dinsdag').html('<center><h3>Dinsdag</h3></center>' + Mustache.render($('#template-' + type + '-table').html(), response.lessons[1]));
                    $('#woensdag').html('<center><h3>Woensdag</h3></center>' + Mustache.render($('#template-' + type + '-table').html(), response.lessons[2]));
                    $('#donderdag').html('<center><h3>Donderdag</h3></center>' + Mustache.render($('#template-' + type + '-table').html(), response.lessons[3]));
                    $('#vrijdag').html('<center><h3>Vrijdag</h3></center>' + Mustache.render($('#template-' + type + '-table').html(), response.lessons[4]));
                    if(goToToday == true && dow > 0 && dow < 6) {
                        $('html, body').animate({
                            scrollTop: $('#' + days[dow -1]).offset().top
                        }, 2000);
                    }
                } else {
                    $('#content').html('<center><h2>Niet gevonden</h2></center>');
                }
            }
        });
    }
    $.ajax({
        url: "https://api.ccapp.it/v1/list/weeks",

        // the name of the callback parameter, as specified by the YQL service
        jsonp: "callback",

        // tell jQuery we're expecting JSONP
        dataType: "jsonp",

        // work with the response
        success: function( response ) {
            $('#weekselect').html(Mustache.render($('#template-weeks').html(), response));
            for (index = 0; index < response.length; ++index) {
              current = response[index];
              if(current["current"] == true) {
                currentweek = current["week"];
              }
            }
            if(window.location.hash) {
                var id = window.location.hash;
                if(id.indexOf('/vandaag') >= 0) var goToToday = true;
                else var goToToday = false;
                var cid = id.replace('#', '');
                cid = cid.replace('/vandaag', '');
                $('#id').val(cid);
                getSchedule(cid, $('#week').val(), goToToday);
            }
        }
    });
    $('.navbar-toggle').click(function(){
        $('.navbar-collapse').css('background-color', 'white');
    });
    $('#search').submit(function(){
        if($('.navbar-toggle').css('display') !='none'){
            $('.navbar-collapse').collapse('hide');
        }
        var id = $('#id').val();
        window.location.hash = id.replace('#', '');
        getSchedule(id, $('#week').val(), false);
    });
    $('#today').click(function() {
        if($('.navbar-toggle').css('display') !='none'){
            $('.navbar-collapse').collapse('hide');
        }
        var id = $('#id').val();
        window.location.hash = id.replace('#', '') + '/vandaag';
        console.log(currentweek);
        getSchedule(id, currentweek, true);
    })
});