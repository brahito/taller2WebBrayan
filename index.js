var express = require('express');
var exphbs = require('express-handlebars');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:40000';

// Database Name
const dbName = 'tienda';

// Create a new MongoClient
const client = new MongoClient(url);

var db = null;

// Use connect method to connect to the Server
    client.connect(function(err) {
      assert.equal(null, err);

      console.log("Connected successfully to server");
    
      const db = client.db(dbName);
    
      client.close();
    });

    var app = express();

    app.use(express.static('public'));
    app.use(express.urlencoded({ extended: true }));
    
    app.engine('handlebars', exphbs());
    app.set('view engine', 'handlebars');
    
    app.get('/', function(request, response){
        var contexto = {
            titulo: 'Página principal',
        };
        response.render('tienda', contexto);
    });
    
app.get('/tienda/:categoria?',function(request,response){
    
    console.log(request.params.categoria);

    var query ={};
    if(request.params.categoria){
        query.categoria = request.params.categoria;
    }
    if(request.query.precio){
        query.precio = { $lte: request.query.precio}
    }

    var collection = db.collection('productos');

    collection.find(query).toArray(function(err,docs){
        assert.equal(err,null);

        var contexto ={
            productos: docs,
            categoria: request.params.categoria,
            precio:request.query.precio,
            esHardware: request.params.categoria == "Hardware",
            esSoftware: request.params.categoria == "Software",
        };
        response.render('tienda', contexto);
    });
});

app.post('/login', function(request,response){
    console.log(request.body);

    response.redirect('/bienvenida');
});
app.listen(3000);