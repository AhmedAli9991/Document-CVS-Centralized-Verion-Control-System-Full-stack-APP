import React, { useState,useEffect } from "react";
import axios from "axios";
import Popup from "./Popup";
import { useNavigate } from "react-router-dom";
export default function Repositories() {
const[Repos,setRepos]=useState([])
const [isOpen, setIsOpen] = useState(false);
const [Title, setTitle] = useState("");
const [Desc, setDesc] = useState("");
const [id, setid] = useState("");
const[update,setUpdate]=useState(false)
const navigate=useNavigate()
const togglePopup = () => {
  setIsOpen(!isOpen);
};
const handleCloseX =()=>{
  setTitle("");
  setDesc("");
  setUpdate(false)
  setIsOpen(false)
}

useEffect(()=>{
  getData()
},[])

const handleUpdate=async (id)=>{
  setUpdate(true)
  const  response = await axios.get(`http://localhost:4000/Repos/${id}`);
  const updating= await response.data
  setid(updating._id)
  setTitle(updating.Title)
  setDesc(updating.Desc)
  togglePopup()  
}
const AddRepo = async (e) => {
  e.preventDefault();
  if (Title != "" && Desc != "") 
  {
  if(update==true){
    await axios.put(`http://localhost:4000/Repos/${id}`, {
      Title,
      Desc
      });
    setTitle("");
    setDesc("");
    setUpdate(false)
    getData()
    togglePopup();
  }
  else{
     await axios.post("http://localhost:4000/Repos/add", {
      Title,
      Desc
      });
    setTitle("");
    setDesc("");
    setUpdate(false)
    getData()
    togglePopup();
    } 
  }
  else {
      alert("empty values");
    }
  }
const getData=async()=>{
  const response = await axios.get("http://localhost:4000/Repos/view")
  setRepos(response.data)

}
const Delete=async(id)=>{
  await axios.delete(`http://localhost:4000/Repos/${id}`)
  getData()
}

const Versions =(Repo)=>{ 
  navigate(`/${Repo.Title}`, { state: { Repo } })    
}



const[Collaborator,setCollaborator]=useState([])
const[use,setUse]=useState([])
const[pop2,setpop2]=useState(false)
const[ab,setab]=useState("")

const addCollabs = async(e)=>{
  e.preventDefault()
  console.log(Collaborator)
  const body = Collaborator.map((obj)=>{
    return obj._id
  })
  console.log(body)
  await axios.put(`http://localhost:4000/collab/add/${ab}`, {
    body
    });
    setab("")
    setpop2(false)
}
const get = async(id)=>{
  setab(id)
  const response = await axios.get(`http://localhost:4000/collab/view/${id}`)
  setCollaborator(response.data)
  const response2 = await axios.get('http://localhost:4000/collab/users')
  const users=response2.data.filter(obj=>{
    return response.data.filter(a=>{
      if(a._id!=obj._id){
        return obj
      }
    })
  })
  setUse(users)
  setpop2(true)
}








  return(
    <div class="container" style={{ height: 700, width: "100%", padding: 20 }}>

    <div class="col d-flex justify-content-end">
    <button
      class="btn btn-primary ms-auto me-0 me-md-3 my-2 my-md-0"
      type="button"
      id="cource-btn"
      onClick={togglePopup}
    >
      New Repository
    </button>
    {isOpen && (
            <Popup
              content={
                <>
                  <h4 style={{ textAlign: "center", marginBottom: 30 }}>
                    Repository Detail
                  </h4>
                  <form onSubmit={AddRepo}>
                    <div class="row">
                      <div class="mb-3 col col-10">
                        <label for="course-code" class="form-label">
                          Repository name
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="course-code"
                          value={Title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      </div>
                      <div class="mb-3 col col-10">
                        <label for="course-name" class="form-label">
                          Description
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="course-name"
                          value={Desc}
                          onChange={(e) => setDesc(e.target.value)}
                        />
                      </div>

                    <input
                      type="submit"
                      name="submit"
                      value="Submit"
                      className=" btn btn-primary ms-auto me-0 me-md-3 my-2 my-md-0"
                    />
                  </form>
                </>
              }
              handleClose={handleCloseX}
            />
          )}

{pop2 && (
            <Popup
              content={
                <>
                  <form onSubmit={addCollabs}>
                  
                  <h4 style={{ textAlign: "center", marginBottom: 30 }}>
                    Added Collaborators
                  </h4>
                  <table class="table" id="list">
                    <thead>
                  <tr>
                  <th scope="col">Emails</th>
                  </tr>
                  </thead>
                  <tbody>

                    {Collaborator.map((Repo) => {
                        return (
                      <tr scope="row" key={Repo._id}> 
                      <td>{Repo.Email}</td>
                      <td>
                      <button className="btn btn-primary" onClick={()=>{
                        var use1=""
                        var arr = Collaborator.filter(obj=>{
                          if(obj._id!=Repo._id){
                            return obj
                          }
                          else{
                            use1 = obj
                          }
                        })

                        setUse([...use,use1]) 
                        setCollaborator([...arr])

                      }}>remove</button>  
                      </td>
                      </tr>
                      );
                    })}      
                  </tbody>
                  </table>
                    
                  <h4 style={{ textAlign: "center", marginBottom: 30 }}>
                    available Collaborators
                  </h4>
                  <table class="table" id="list">
                    <thead>
                  <tr>
                  <th scope="col">Emails</th>
                  </tr>
                  </thead>
                  <tbody>
                    {use.map((Repo) => {
                        return (
                      <tr scope="row" key={Repo._id}> 
                      <td>{Repo.Email}</td>
                      <td>
                      <button className="btn btn-primary" onClick={()=>{
                        var collab1=""
                        var arr = use.filter(obj=>{
                          if(obj._id!=Repo._id){
                            return obj
                          }
                          else{
                            collab1 = obj
                          }
                        }) 
                        setCollaborator([...Collaborator,collab1])
                        setUse([...arr])

                      }}>Add</button>
                      </td> 
                      </tr>
                      );
                    })}      
                  </tbody>
                  </table>
                  <input
                      type="submit"
                      name="submit"
                      value="Submit"
                      className=" btn btn-primary "
                    />    

                  </form>
                </>
              }
              handleClose={()=>{setpop2(false)}}
            />
          )}











    </div>

    <table class="table" id="list">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Add Collaborator</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>

        {Repos.map((Repo) => {
              return (
                <tr scope="row" key={Repo._id}> 
                  <td  onClick={()=>Versions(Repo)}>{Repo.Title}</td>
                  <td>{Repo.Desc}</td>
                  <td>
                  <button className="btn btn-primary" onClick={()=>{get(Repo._id)}}>Collaborate</button>  
                  </td>
                  <td>
                  <button className="btn btn-primary" onClick={()=>{handleUpdate(Repo._id)}}>Update</button>  
                  </td>
                  <td>
                  <button className="btn btn-primary" onClick={()=>Delete(Repo._id)} >Delete</button>  
                  </td>
                </tr>
              );
            })}      
          </tbody>
      </table>
    </div>
    )

}

