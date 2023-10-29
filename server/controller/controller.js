
const Userdb = require('../model/model');

//create and save a user
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        return res.status(400).send({message: 'Content cannot be empty..'});
    }

    //add user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    //save user 
    user
        .save(user)
        .then(data =>{
                // res.send(data);
                res.redirect('/');                                                                                                      
            })
        .catch(err =>{
                return res.status(500).send(
                    {
                        message: err.message|| "Some error occurred while creating a create operation"
                    }
                );
        });
}

//retrieve and return all users/ retrieve and return single user
exports.find = (req,res)=>{

    if(req.query.id){
        const id = req.query.id;
        console.log(req.query.id);
        Userdb.findById(id)
            .then(data =>{
                if(!data){
                   return res.status(404).send({ message: `user with id ${id} not found`});
                }else{
                   return res.send(data);
                }
            })
            .catch(err =>{
                return res.status(500).send({ message: `Server Error retrieving user with id ${id}: ${err}`})
            })
    }else{
        Userdb.find()
        .then(user => {
            return res.send(user)
        })
        .catch(err =>{
            return res.status(500).send({
                message: err.message||"Some error occured while finding the data.."
            })
        })
    }
   
}

//Update a new identified user by user id
exports.update = (req,res)=>{
    // validate request
    if(!req.body){
        return res.status(400).send({message: 'Data to update cannot be empty..'});
    }


const id = req.params.id;
Userdb.findByIdAndUpdate(id, req.body , {useFindAndModify: false})
    .then(data =>{
        if(!data){
            return res.status(404).send({message: `Cannot update user with ${id}. User Not Found`})
        }else{
            return res.send(data)
        }
    })
    .catch(err =>{
        return res.status(500).send({message: "Error Updating User Information.."})
    })

}

//Delete a user with specified user id in the request
exports.delete = (req,res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
    .then(data =>{
        if(!data){
            return res.status(404).send({message:`Cannot delete id ${id}: ID is Wrong`})
        }else{
            return res.status(200).send({message: `User with ${id} was deleted successfully`})
        }
    })
    .catch(err =>{
        return res.status(500).send({
            message: `Could not delete user with id ${id}`
        })
    })
}