const express = require("express");
const app = express();

// Middleware to parse JSON in the request body
app.use(express.json());
app.listen(3000);

let users=[
    {
        'id':1,
        'name': "Abhishek"
    },
    {
        'id':2,
        "name":"Josh"
    },
    {
        'id': 3,
        "name": "Karthik"
    }
];

const userRouter = express.Router();  //mini app
app.use('/user', userRouter); //base router, route to use

userRouter
.route('/')
.get(getUser)
.post(postUser)
.patch(updateUser)
.delete(deleteUser)


userRouter
.route('/:id')
.get(getUserById)


// app.get("/user",);

// app.post("/user",);


//update -> patch
// app.patch("/user",);

//to delete data
// app.delete("/user",);

//params
// app.get('/user/:id',(req, res) => {
//     console.log(req.params.id);
//     console.log(req.params.id);
//     res.send("User id is :");
// });

function getUser(req, res){
    res.send(users);
};

function postUser(req, res) {
    console.log(req.body);
    users=req.body;
    res.json({
        message: "date received successfully",
        user:req.body
    });
};

function updateUser(req, res){
    console.log(req.body);

    //update data in users object;
    let dataToBeUpdated = req.body;
    for (key in dataToBeUpdated) {
        users[key] = dataToBeUpdated[key];
    }
    res.send({
        message: "Data updated successfully",
        user: req.body
    });
};

function deleteUser(req, res) {
    users = {};
    res.send({
        message: "data deleted :"
    });
}

function getUserById(req, res){
    console.log(req.params.id);
    let paramId=req.params.id;
    let obj={};
    for(let i=0; i<users.length;i++){
        if(users[i]['id'] == paramId){
            obj=users[i];
        }
    }
    res.json({
        message:"req received",
        data:obj
    });
}