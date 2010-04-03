<html>
<head>
<!--*******************************************************-->
	<!-- This is the YUI base that this plugin is dependent on --> 
	<script type="text/javascript" src="http://yui.yahooapis.com/combo?2.7.0/build/yahoo-dom-event/yahoo-dom-event.js&2.7.0/build/animation/animation-min.js&2.7.0/build/connection/connection-min.js&2.7.0/build/cookie/cookie-min.js&2.7.0/build/element/element-min.js"></script>
<!--*******************************************************-->

<!--*******************************************************-->
	<!-- Pull in the needed resources -->
	<link rel="stylesheet" href="modal.css" media="screen" />
	<script type="text/javascript" src="modal.js"></script>
<!--*******************************************************-->


<script type="text/javascript">
    
// *******************************************************
// This is where we instantiate the class the first param is our extenral URL the second is an Object with our other params

	var instance= new Modal('external.html',{
		'width':600,
		'height':450,
		'show_until':new Date("July 31, 2009"),
		'close_label':'close!' //this can totally be HTML (img src, or anything)
		}
	);

// *******************************************************
</script>
	
</head>
<body>
	
	<!--*******************************************************-->
	<!-- This button fires off the Modal, due to it's ID of show_modal -->
	<a href="javascript:void(0)" id="show_modal">Show me the modal!</a>
	<!--*******************************************************-->
</body>
</html>