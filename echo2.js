var http = require('http');
 
http.createServer(function(request,response)
{
	response.writeHead(200);

	request.on('data',function(message)
	{
		response.write("container2:"+message);
	});

	request.on('end',function()
	{
		response.end();
	});

}).listen(8080);
