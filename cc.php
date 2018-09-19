<?php
	extract($_GET);
	$header = array("Content-type:application/x-www-form-urlencoded");
	$request = array('http'=>array('method'=>"POST", 'header'=>$header, 'content'=>$bookname));
	$context = stream_context_create($request);
	$retval = file_get_contents("http://localhost:8080",FALSE, $context);
	echo $retval;
?>
