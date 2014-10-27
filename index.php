<?php
if(isset($_GET['rid'])) Header("Location: ./#115123");
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
        <script src="js/main.js?v=2"></script>
        <link rel="stylesheet" type="text/css" href="css/main.css">
        <?php
        foreach(glob('./templates/*.php') as $f) {
            $n = 'template-'.str_replace(array('./templates/', '.php'), '', $f);
            echo '<script type="text/template" id="'.$n.'">';
            include($f);
            echo '</script>';
        }
        ?>
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
			</center>
		</div>
    </body>
</html>
