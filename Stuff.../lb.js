var http = require('http');
containerNum = 0;
http.createServer(function(request,response)
{
	response.writeHead(200);
	request.on('data',function(message)
	{
		var p = 8090;			//containers are at ports: 8090, 8091, 8092...
		var options =
		{
			host:"localhost",
			port:p+containerNum,
			method:"POST",
			header:
			{
				"Content-Type":"text/plain"
			}
		};
		var req = http.request(options, function(res)
		{
			var responseString="";
			res.on("data",function(data)			//concatenates data received
			{
				responseString += data;
			});
			res.on("end", function()			//data completely recieved. writes response
			{
				response.write(responseString + "\n");
				response.end();
			});
		});
		req.write(message);
		req.end();
	});
 	request.on('end',function()
	{
		containerNum = (containerNum + 1) % 3;			//change to the next container in a cyclic fashion
	});
}).listen(8080);
