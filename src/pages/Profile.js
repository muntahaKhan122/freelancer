import firebase from 'firebase/compat/app';
import {useEffect, useState, useContext, useRef} from 'react';
import { getUserAttributes,handleImageUpload,getImage } from '../firebase/auth';
import { useParams } from 'react-router-dom';
import { UserContext } from '../user/UserProvider';
import { FaCameraRetro } from "react-icons/fa";

function Profile(props) {
    const { user, setUser } = useContext(UserContext);
    const [img,setImg] = useState();
    const [userData,setUserData] =useState();
    const hiddenFileInput = useRef(null);

    const fetchData = async () => {
            
      try
      {
    
      const data = await getUserAttributes(user.uid);
      setUserData(data);
      }
      catch(e)
      {
        console.log(e);
      }
    };

    useEffect(()=>{
          
        //console.log("user",user);
          fetchData();

    },[user.uid]);
     
    useEffect(() => {

    
        fetchImage();

    }, [img, user.uid]);
    
    async function fetchImage() {
        const image = await getImage(user.uid);
        setImg(image);
    }    
    const fileUpload = async (e) => {
        await handleImageUpload(e, user.uid);
        const image = await getImage(user.uid);
        setImg(image);
    }
    const handleUpload = () =>{
        hiddenFileInput.current.click();
    }
  
  


        
  return (
    <>
    <div class="container mt-5">
    
    <div class="row d-flex justify-content-center">
        
        <div class="col-md-7">
            
            <div class="card p-3 py-4">
                

                <div style={{display:'flex',justifyContent:'center',alignItems:'end'}}>
                    <div class="text-center">
                    <img style={{height:'100px',width:'100px'}} src={img?img:"https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"} width="100" class="rounded-circle"/>
                    <input type="file" onChange={(e)=>fileUpload(e)} ref={hiddenFileInput} style={{display:'none'}}/>

                     
                </div>
                <button onClick={handleUpload} style={{border:'none'}}><FaCameraRetro /></button> 
                </div>
                
                <div class="text-center mt-3">
                    <span class="bg-secondary p-1 px-4 rounded text-white">{userData?.type}</span>
                    <h5 class="mt-2 mb-0">{userData?.name}</h5>
                    <span>{userData?.title}</span>
                    
                    <div class="px-4 mt-1">
                        <div class="fonts" style={{height:'100px',overflowY:'scroll'}}>{userData?.summary}</div>
                    
                    </div>
                    
                    <span>Rate: {userData?.rate}$/hr</span>
                    
                    <div class="buttons">
                        
                        <button class="btn btn-outline-primary px-4">Message</button>
                        <button class="btn btn-primary px-4 ms-3">Contact</button>
                    </div>
                    
                    
                </div>
                
               
                
                
            </div>
            
        </div>
        
    </div>
    
</div>
    </>
  );
}

export default Profile;