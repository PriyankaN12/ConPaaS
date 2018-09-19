README

The following steps need to be followed to set up the project:

1. Create the database and populate by running the database.sql file. The DBMS used is MySQL.

2. Run the DBserv.js program with nodejs.

3. Create and run the containers.
	- For each container that the user requires, create it using the following command:
		sudo docker run -it cont1
	- Then, copy the server.js file (the server program uploaded by the user) into the container as:
		docker cp server.js cont1:/server.js
	- Install Node.js in the container. 
	- Save the container as an image:
		docker commit -m "What did you do to the image" -a "Author Name" container-id repository/new_image_name
		In our case, this will be:
		docker commit -m "uploaded" -a "HITC" d9b100f2f636 cont1
	- Run the container.
		sudo docker run -it --net=host cont1
	- Run the server.js program within the container.

4. Run the load balancer program (lb.js) with nodejs.

5. Invoke the service using a browser and opening cc.html for stage 3, and cc1.html for stage 4.