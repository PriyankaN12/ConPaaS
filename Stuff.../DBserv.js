var http = require('http');
 
http.createServer(function(request,response)
{
	response.writeHead(200);

	request.on('data',function(message)
	{
		var mysql      = require('mysql');
		var connection = mysql.createConnection(		//settings for database connection
		{
			host     : 'localhost',
			user     : 'root',
			password : '',
			database : 'hitc'
		});

		connection.connect();

		connection.query('SELECT * from books where Name = "'+message+'"', function(err, rows, fields)
		{
			if (!err)
			{
				if(rows.length>0)	//Book exists. Its data has been returned.
					response.write('Name:'+rows[0].Name+'\nAuthor:'+rows[0].Author+'\nPrice:'+rows[0].Price+'\n');
				else
					response.write('No such book');
			}
			else		//query error
			{
				response.write('Error while performing Query.');
			}
			response.end();
		});
		connection.end();
	});

	request.on('end',function()
	{
	});

}).listen(8081);
