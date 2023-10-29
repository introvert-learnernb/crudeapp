const axios = require('axios');

//exporting the function homeRoutes
exports.homeRoutes = (req,res) =>{

    //Get request to /api/users
    axios.get('http://localhost:5000/api/users')
        .then((response)=>{
            // console.log(response);
            res.render('index', {users: response.data});
        })
        .catch(err =>{
            res.send(err);
        })
    
}

//exporting the function add_user
exports.add_user = (req,res) =>{
    res.render('add_user');
}


//exporting the function homeRoutes
exports.update_user = (req,res) =>{
    axios.get('http://localhost:5000/api/users', {
        params: {id: req.query.id}
    })
    .then(function(userdata){
        res.render("update_user",{user: userdata.data})
    })
    .catch(err=>{
        res.send(err);
    })
}