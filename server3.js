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
		};
		var req = http.request(options, function(res)
		{
			var responseString="Container 3:\n";
			res.on("data",function(data)
			{
				responseString += data;
			});
			res.on("end", function()
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
}).listen(8092);
