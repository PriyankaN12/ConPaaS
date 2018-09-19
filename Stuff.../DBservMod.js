var http = require('http');
reply = "";
errFlg=0;

http.createServer(function(request,response)
{
	request.on('data',function(message)
	{
		reply = "";
		var mysql      = require('mysql');
		var connection = mysql.createConnection(
		{
			host     : 'localhost',
			user     : 'root',
			password : '',
			database : 'books'
		});

		connection.connect();
		var ss=message.toString().split(":");		//username and request
		var qry='select distinct isbn,name,author,price from inventory i,tenantmeta t where name="'+ss[1]+'" and i.tid=t.tid and tname="'+ss[0]+'"';			//first query selects all common columns
		errFlg=0;
		connection.query(qry, function(err, rows, fields)
		{
			if (!err && rows.length != 0)		//successful query
			{
				reply += ('ISBN:'+rows[0].isbn+'\nName:'+rows[0].name+'\nAuthor:'+rows[0].author+'\nPrice:'+rows[0].price);
			}
			else if(!err)				//0 rows returned
			{
				reply = 'No such book!';
				errFlg+=1;			//no need to execute following query
			}
			else					//query error
			{
				reply = 'Error while performing Query.';
				errFlg+=1;
			}
		});
		qry='select cname,value from inventory i,tenantmeta t,nvmeta n,pivot p where name="'+ss[1]+'" and i.tid=t.tid and tname="'+ss[0]+'" and i.nvid=p.nvid and n.nameid=p.nameid';
		console.log(errFlg);
		if(errFlg==0)					//previous query failed. No need to continue
		{
			connection.query(qry, function(err, rows, fields)
			{					//retrieve custom columns
				if (!err)
				{
					q2ans = rows;
					for(i=0; i<q2ans.length; i++)
					{
						reply += "\n"+q2ans[i].cname+":"+q2ans[i].value;
					}
				}
				else
				{
					reply = 'Error while performing Query.';
				}
				response.writeHead(200);
				response.write(reply);		
				response.end();

			});
		}
		
		connection.end();
	});

	request.on('end',function()
	{
	});

}).listen(8081);
