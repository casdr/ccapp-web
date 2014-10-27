$(document).ready(function() {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-56117827-1', 'auto');
    ga('send', 'pageview');
    function getSchedule(id, week, goToToday) {
        ga('send', 'pageview', {
          'page': '/' + id,
          'title': id
        });
        var days = ['maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag'];
        var dow = new Date().getDay();
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
                    console.log(dow);
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
                if(id.indexOf('/vandaag') >= 0) var goToToday = true;
                else var goToToday = false;
                var cid = id.replace('#', '');
                cid = cid.replace('/vandaag', '');
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
        getSchedule(id, $('#week').val(), true);
    })
});
