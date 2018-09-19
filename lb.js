var http = require('http');
containerNum = 0;
http.createServer(function(request,response)
{
	response.writeHead(200);
	request.on('data',function(message)
	{
		var p = 8090;
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
		containerNum = (containerNum + 1) % 3;
	});
}).listen(8080);
