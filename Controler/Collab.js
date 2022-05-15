const Repodoc=require("../Models/Repos")
var users = require("../Models/Users");

module.exports.Add= async (req,res)=>{
    try {
        const user = req.user
        if(!user) return res.status("401").json("unAutherized") 
        const old = await Repodoc.findOne({_id:req.params.id}) 
        const obj = {
            Title:old.Title,
            Desc:old.Desc,
            User:old.User,
            Collaborator:req.body.body
        }
        console.log(obj)
        const Repo = await Repodoc.findOneAndUpdate({ _id: req.params.id },obj)
        await res.status("201").json(Repo)
    }
    catch(err){
        await res.status("400").json(err)
    }
}

module.exports.ViewAll= async (req,res)=>{
    try{    
        const user = req.user
        if(!user) return res.status("401").json("unAutherized")      
        const Repo = await Repodoc.find({})
        const arr  = Repo.filter((a)=>{
            if(a.Collaborator.includes(user._id)) return a
        })
        console.log(arr)
        await res.status("200").json(arr)
    }
    catch(err){
        await res.status("400").json(err)
    }
}

module.exports.getAllUsers= async (req,res)=>{
    try{
   
        const user = req.user
        if(!user) return res.status("401").json("unAutherized")      
        const allusers = await users.find({})
        console.log("array1 ",allusers)
        const returnuser = allusers.filter((a)=>{
            if(a.Email!=user.Email) return a
        }) 
        console.log("array2 ",returnuser)
        await res.status("200").json(returnuser)
    }
    catch(err){
        console.log("erre")
        await res.status("400").json(err)
    }
}

module.exports.getcollab= async (req,res)=>{
    try{    
        const user = req.user
        if(!user) return res.status("401").json("unAutherized") 
        const Repo = await Repodoc.findOne({_id:req.params.id}).populate('Collaborator')
        
        console.log("arraycollabs1 ",Repo)
        
        await res.status("200").json(Repo.Collaborator)
    }
    catch(err){
        await res.status("400").json(err)
    }
}
