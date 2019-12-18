

var mongoInterface = require('./lib/mongo-interface')

var bodyParser = require('body-parser')

var path = require("path"),
    express = require("express");

var DIST_DIR = path.join(__dirname, "public"),
    PORT = 8000,
    app = express();

//Serving the files on the dist folder
app.use(express.static(DIST_DIR));

//Send index.html when the user access the web
app.get("*", function (req, res) {
  res.sendFile(path.join(DIST_DIR, "index.html"));
});

app.listen(PORT);
console.log('Express dev server listening on port ', PORT, "!")

app.use(express.urlencoded());
app.use(express.json());      // if needed


async function initMailingListServer()
{


    await mongoInterface.init();

  app.post('/subscribe', async function (req, res)  {
    
    var nameinput =  req.body.nameinput;
    var emailinput = req.body.emailinput;
    console.log(nameinput,emailinput)
    var timestamp = new Date().valueOf() ;

     var reply = await mongoInterface.insertOne("mailinglist",{nameinput, emailinput,  timestamp  })

   
    res.contentType('json');
   // res.send("Thank you for subscribing, " + nameinput +"!");

    res.redirect('/subscriptioncomplete.html');


    res.end();
   
  })
  

}


(async() => {
await initMailingListServer();
})();