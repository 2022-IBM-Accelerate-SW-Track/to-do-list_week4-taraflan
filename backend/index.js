// importing external modules and setting the environment variables
const express = require("express"), //import 
       app = express(), //initialize 
       port = process.env.PORT || 8080, //establish listening port
       cors = require("cors");
const bodyParser = require('body-parser');
const fs = require("fs");

//sets up express application and returns a message back to the console once our app is running 
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.listen(port, () => console.log("Backend server live on " + port)); //set listening port

// This snippet of code returns a message once a GET request to the specified route is made.
app.get("/", (req, res) => { //handle GET request
    res.send({ message: "Connected to Backend server!" });
    });

//makes a call the addItem function once a POST request to the specified route is made.
app.post("/add/item", addItem)

//takes in a request body from the Todo List Application which represents a todo item. 
//The body is then converted into a new json object called newTask to represent the new todo item. 
//The new json object is finally appended to a json list located in a file called database.json to 
//represent our todos list.
function addItem (request, response) {
    let id = request.body.jsonObject.id
    let task = request.body.jsonObject.task
    let curDate = request.body.jsonObject.currentDate
    let dueDate = request.body.jsonObject.dueDate
    var newTask = {
      ID: id,
      Task: task,
      Current_date: curDate,
      Due_date: dueDate
    }
    const jsonString = JSON.stringify(newTask)
    
    var data = fs.readFileSync('database.json');
    var json = JSON.parse(data);
    json.push(newTask);
    fs.writeFile("database.json", JSON.stringify(json), function(err, result) {
      if (err) { console.log('error', err) }
      else { console.log('Successfully wrote to file') }
    });
    response.send(200)
    }