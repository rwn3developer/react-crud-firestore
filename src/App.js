import { useEffect, useState } from "react";
import { db } from "./firebase-config";
import { addDoc, collection,getDocs,doc,updateDoc,getDoc,deleteDoc, query} from "firebase/firestore";
function App() {

  const [input,setInput] = useState({
      name : "",
      phone : ""
  })
  const [user,setUser] = useState([]);
  const [eidtid,setEditid] = useState();
  const userCollectionRef = collection(db,"user"); 

  console.log(eidtid);

  const handleClick = (e) => {
      let name = e.target.name;
      let value = e.target.value;

      setInput({
          ...input,[name] : value
      })
  }

  const createUser = async () => {
      if(eidtid){
          //edit no code
          let name = input.name;
          let phone = input.phone;
           const userDoc = doc(db, "user", eidtid);
          const newFields = { name : name ,phone : phone};
          await updateDoc(userDoc, newFields); 
          setEditid("");
      }else{
         //insert no code
        let name = input.name;
        let phone = input.phone;
        await addDoc(userCollectionRef,{name : name,phone : phone});
      }
      
      setInput({
          name : '',
          phone : '',
      })
  }

  const updateUser =  async (id,name,phone) => {
       let obj = {
          id : id,
          name : name,
          phone : phone
       }      
      setInput(obj);
      setEditid(id);
      
  }

  const deleteUser = async (id) => {
    const userDoc = doc(db, "user", id);
    alert("user successfully delete");
    let res = await deleteDoc(userDoc);
      getUser(); 
  }

  const getUser = async () => {
    const data = await getDocs(userCollectionRef);
    setUser(data.docs.map((doc) => ({...doc.data(),id : doc.id})));
  }

  useEffect(()=>{
    getUser();
  },[]);
  return (
    <>    

          <input type="text" name="name" onChange={ (e) => handleClick(e) } value={input.name} placeholder="Enter your name"/>
          <input type="text" name="phone" onChange={ (e) => handleClick(e) } value={input.phone} placeholder="Enter your phone"/>
          <button onClick={ () => createUser() }>Submit</button><br></br><br></br>

          <table border="1">
              <tr>
                <td>Name</td>
                <td>Phone</td>
                <td>Action</td>
              </tr>

              {
              user.map((val)=>{
                  return (
                      <tr key={val.id}>
                          <td>{val.name}</td>
                          <td>{val.phone}</td>
                          <td>
                            <button onClick={ () => updateUser(val.id,val.name,val.phone) }>Edit</button> ||
                            <button onClick={ () => deleteUser(val.id) }>Delete</button>
                          </td>

                      </tr>
                  )
              })
          }
          </table>
          
    </>
  );
}

export default App;
