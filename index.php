<?php
if(isset($_GET['rid'])) Header("Location: ./#".$_GET['rid']);
?>
<html>
    <head>
        <title>CCWeb</title>
        <meta name="mobile-web-app-capable" content="yes">
        <link href="img/app_icon.png" rel="apple-touch-icon" />
        <link href="img/app_icon.png" rel="apple-touch-icon-precomposed" />
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet">
        <link href='https://fonts.googleapis.com/css?family=Lato:300' rel='stylesheet' type='text/css'>
        <script src="//cdn.jsdelivr.net/jquery/2.1.1/jquery.min.js"></script>
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
        <script src="//cdn.jsdelivr.net/mustache.js/0.8.1/mustache.js"></script>
        <script src="js/main.js?v=9"></script>
        <link rel="stylesheet" type="text/css" href="css/main.css?v=13">
        <?php
        foreach(glob('./templates/*.php') as $f) {
            $n = 'template-'.str_replace(array('./templates/', '.php'), '', $f);
            echo '<script type="text/template" id="'.$n.'">';
            include($f);
            echo '</script>';
        }
        ?>
        <div id="fb-root"></div>
        <script>(function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = "//connect.facebook.net/nl_NL/sdk.js#xfbml=1&appId=574200282599595&version=v2.0";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
        </script>
    </head>
    <body>
		<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
		  <div class="container-fluid">
		    <!-- Brand and toggle get grouped for better mobile display -->
		    <div class="navbar-header">
		      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
		        <span class="sr-only">Toggle navigation</span>
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		      </button>
		      <a class="navbar-brand" href="/">CCWeb</a>
		    </div>

		    <!-- Collect the nav links, forms, and other content for toggling -->
		    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
		      <form class="navbar-form navbar-right" id="search" role="search" action="javascript:void(0);">
		        <div class="form-group">
		          <span id="weekselect"></span>
		          <input type="text" id="id" class="form-control" placeholder="Leerling/Docent">
		        </div>
		        <button type="submit" class="btn btn-default">Go</button>
		        <button type="button" id="today" class="btn btn-default">Vandaag</button>
		      </form>
		    </div><!-- /.navbar-collapse -->
		  </div><!-- /.container-fluid -->
		</nav>
		<div class="container-fluid" id="content">
			<center>
				<h2>CCWeb</h2>
				<p>Binnenkort komen er ook apps uit! Benieuwd? Check <a href="http://ccapp.it">ccapp.it</a></p>
        <div class="fb-like" data-href="http://facebook.com/ccappnl" data-layout="standard" data-action="like" style="color:white !important;" data-show-faces="true" data-share="true"></div>
			</center>
		</div>
    <footer>
      <p id="na">CCWeb is niet aansprakelijk voor schade of letsel als gevolg van het gebruik van de service.</p>
    </footer>
    <script type="text/javascript" id="cookiebanner" src="http://cookiebanner.eu/js/cookiebanner.min.js"></script>
    </body>
</html>
