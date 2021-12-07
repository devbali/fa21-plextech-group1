const express = require("express");

const app = express();
const port = 4200;
max_id = 0  
tasks = []
// create a new task
app.post('/v1/tasks', function(req, res) {
    max_id += 1
    tasks.push(
        {
            id: max_id,
            title: req.body,
            is_completed: false
        }
    )
    res.send(
        {
            id: max_id
        }
    )
})

// list all tasks created
app.get('/v1/tasks', function(req, res) {
    res.send(tasks)
})

// get specific task
app.get('v1/tasks/:id', function(req, res) {
    let json_sent = {}
    for(let i = 0; i < tasks.length; i++){
        if ((tasks[i]['id']) == req.params.id)
            {
                json_sent = tasks[i]
                break
            }
    }
    res.send(json_sent)
})

// delete specific task
app.delete('/v1/tasks/:id', function(req, res) {
    for(let i = 0; i< tasks.length;i++) {
         if(task[i]["id"] == req.params.id) {
            task.splice(i, 1)
            res.status(204).send
         }
    }
})

//updates specific task
app.put('/v1/tasks/:id', function(req, res){
    var found = false

    for(let i = 0; i < tasks.length; i++) {
        if(task[i]["id"] === req.params.id) {
            tasks[i]["title"] = req.body.title
            tasks[i]["is_completed"] = req.body.is_completed
            found = true
        }
    } 
    if (found === false){
        res.status(404).send({
            error: "There is no task at that id"
        })
    }
})


app.listen(port, () => console.log(`The server is listening on port ${port}`))