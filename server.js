var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let primaryId = 1;

var todoList = [
    {
        id: primaryId,
        todo: "Implement a REST API"
    }
];

// GET /api/todos
app.get('/api/todos', (req, res) => {
    res.send(todoList);
});
// GET /api/todos/:id
app.get('/api/todos/:id', (req, res) => {

    res.send(`${req.params.id}`);
});
// POST /api/todos

app.post('/api/todos', (req, res) => {

    // req.body now represents the actual request body
    // as a javascript object
    // allow for food_name, customer_name, quantity
    primaryId++;
    todoList.push({
        id: primaryId,
        todo: "second task"
    }); 

    res.status(200).json({
        message: "todolist added"
    });
});

// PUT /api/todos/:id

// app.put('/api/todos/:id', function (req, res) {   
//     let obj = todoList.find(obj => obj.id == req.params.id);
//     res.status(200).send(obj);
//   });

  app.put('/api/todos/:id', function (req, res) {   
    let objIndex = todoList.findIndex(obj => obj.id === Number(req.params.id));
    todoList[objIndex] = req.body;
    res.status(200).send(todoList[objIndex]);
  });

// DELETE /api/todos/:id

app.delete('/api/todos/:id', function (req, res){
    const id = req.params.id;
    

    let item = todoList.find((item) => {
        return item.id === Number(id);
    });

    let itemIndex = todoList.findIndex((o) => {
        return o === item;
    });

    if (itemIndex > -1) {
        todoList.splice(itemIndex, 1);
    }
    console.log(todoList);
    res.status(200).send(todoList);
});

app.listen(3000, function(){
    console.log('Todo List API is now listening on port 3000...');
});