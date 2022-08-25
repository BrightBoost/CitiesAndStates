let express = require("express");
let bodyParser = require("body-parser");
let fs = require("fs");
let app = express();

// Create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({ extended: false })

// Special message shown at root url (ex: http://localhost:8082) 
app.get("/", function (req, res) {
    console.log("Got a GET request at /");
    res.send("City/State Web Application");
})

// REST API endpoints

app.get("/api/states", function (req, res) {
    console.log("Got a GET request for states");

    // read states file
    let data = fs.readFileSync(__dirname + "/data/" +
        "states.json", "utf8");
    data = JSON.parse(data);

    // log for tracing purposes
    console.log("Returned " + data.length + " states");

    // return response as JSON
    res.end(JSON.stringify(data));
});

app.get("/api/cities/:id", function (req, res) {
    // get the state (id) after the cities/ part of the URL
    let id = req.params.id;
    console.log("Got a GET request for cities " + id);

    // read courses file
    let data = fs.readFileSync(__dirname + "/data/" +
        "cities.json", "utf8");
    data = JSON.parse(data);

    // search to find matching cities
    let matchingCities =
        data.filter(element => element.state == id);

    // log for tracing purposes
    console.log("Returned data is: ");
    console.log(matchingCities);

    // return response
    res.end(JSON.stringify(matchingCities));
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

let server = app.listen(8082, function () {
    //let host = server.address().address
    let port = server.address().port

    console.log("App listening at port %s", port)
})
