const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/User');

const app = express();

app.use(cors());
app.use(express.json());


app.post('/createUser', async (req, res) => {
  try {
    const user = await UserModel.create(req.body);
    res.json(user);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: 'An error occurred while creating the user.' });
  }
});


app.get('/', async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.json(users);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: 'An error occurred while fetching users.' });
  }
});

app.get('/getUser/:id',(req,res)=>{
    const id = req.params.id;
    UserModel.findById({_id:id})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

app.put('/updateUser/:id',(req,res)=>{
    const id=req.params.id;
    UserModel.findByIdAndUpdate({_id:id},{
        name:req.body.name,
        email:req.body.email,
        age:req.body.age
    })
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

app.delete('/deleteUser/:id',(req,res)=>{
    const id=req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})


mongoose.connect('mongodb://127.0.0.1:27017/crud', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
