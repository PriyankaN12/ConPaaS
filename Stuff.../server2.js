var http = require('http');

http.createServer(function(request,response)
{
	response.writeHead(200);
	request.on('data',function(message)
	{
		var options =
		{
			host:"localhost",
			port:8081,
			method:"POST",
			header:
			{
				"Content-Type":"text/plain"
			}
		};						//options required for database server
		var req = http.request(options, function(res)
		{
			var responseString="Container 2:\n";	//to distinguish between containers
			res.on("data",function(data)
			{
				responseString += data;
			});
			res.on("end", function()		//on receiving the complete data, write response
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
	});
}).listen(8091);
