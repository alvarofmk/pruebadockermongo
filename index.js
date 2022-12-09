const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json())
const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'janesmith@example.com'
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bobjohnson@example.com'
    }
];

app.get('/user/', function (req, res) {
    res.send(users);
});

app.get('/user/:id', function (req, res) {
    let userFound = users.find(u => u.id == parseInt(req.params.id))

    if(userFound == undefined){
        res.status(404).send('Usuario no encontrado');
    }else{
        res.send(userFound)
    }

});

app.post('/user/', function (req, res) {
    let newUser;
    if(!req.body.name || !req.body.email || req.body.name == "" || req.body.email == ""){
        res.status(400).send('Aguno de los datos son incorrectos');
    }else{
        let id = 0;
        users.map(u => u.id).forEach(currentid => id = currentid > id ? currentid : id);
        id += 1;
        newUser = {
            id: id,
            name: req.body.name,
            email: req.body.email
        }
        users.push(newUser);
        res.send(newUser);
    }
});

app.listen(3000, () => {
 console.log("El servidor está inicializado en el puerto 3000");
});