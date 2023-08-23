import { useState, useContext, useRef, useEffect  } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { setUserAttributes,handleImageUpload,getImage } from "../firebase/auth";
import '../styles/profile.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { UserContext } from '../user/UserProvider';



function ProfileSetup() {

    
    const { user, setUser } = useContext(UserContext);
    const [dropdown,setDropdown] = useState('Buyer/Seller');
    const [profile, setProfile] = useState({
        rate: '', title: '', mobile_number: '', summary: '',
        area: '', state: '',type:''
    });
    const [img,setImg] = useState();
    const hiddenFileInput = useRef(null);

    const navigate = useNavigate();

    const setProfileAttr = (name, value) => {
        setProfile({ ...profile, [name]: value });
    }
    const saveProfile = () => {

        try {
            setUserAttributes(user.uid, profile);
            navigate(`/profile/${user.uid}`);
        } catch (e) {
            console.log(e);
        }
    }
    
    useEffect(() => {

    
        fetchImage();
        console.log(img);
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
        <div className="body">
            <div class="container rounded bg-white">
                <div class="row">
                    <div class="col-md-3 border-right">
                        <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                            <img class="rounded-circle mt-5" width="150px" style={{height:'150px',width:'150px'}} src={img?img:"https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"} />
                            <span><input type="file" title="Update Image" ref={hiddenFileInput} onChange={fileUpload} style={{display:'none'}}/>
                            <Button onClick={handleUpload}>Upload Picture</Button>
                            </span>
                            <span class="font-weight-bold">{user?.displayName}</span>
                            <span class="text-black-50">{user?.email}</span><span> </span></div>
                    </div>
                    <div class="col-md-5 border-right">
                        <div class="p-3 py-5">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <h4 class="text-right">Profile Settings</h4>
                            </div>
                            <div class="row mt-2">
                                <div class="col-lg-6"><label class="labels">Enter your rate per $/hour</label><input type="number" onChange={(e) => setProfileAttr('rate', e.target.value)} class="form-control" placeholder="15" value={profile.rate} /></div>
                                <div class="col-lg-6"><label class="labels">Enter your title</label><input type="text" onChange={(e) => setProfileAttr('title', e.target.value)} class="form-control" value={profile.title} placeholder="UI/UX Designer" /></div>
                            </div>
                            <div class="row mt-3">
                            <div class="col-md-6"><label class="labels">Mobile Number</label><input type="text" onChange={(e) => setProfileAttr('mobile_number', e.target.value)} class="form-control" placeholder="+1 12345644" value={profile.mobile_number} /></div>
                                <div className="col-md-6"><label class="labels">Are you a Buyer or Seller?</label>
                                    <DropdownButton key='secondary' id="dropdown-basic-button" onSelect={(key)=>{setProfileAttr('type', key);setDropdown(key)}} title={dropdown}>
                                        <Dropdown.Item key={1} eventKey={"Buyer"}>Buyer</Dropdown.Item>
                                        <Dropdown.Item key={2} eventKey={"Seller"}>Seller</Dropdown.Item>
                                    </DropdownButton>
                                </div>
                            </div>
                            <div class="row mt-3">
                                
                                <div class="col-md-12"><label class="labels">State</label><input type="text" onChange={(e) => setProfileAttr('state', e.target.value)} class="form-control" placeholder="enter address line 2" value={profile.state} /></div>
                                <div class="col-md-12"><label class="labels">Area</label><input type="text" onChange={(e) => setProfileAttr('area', e.target.value)} class="form-control" placeholder="enter address line 2" value={profile.area} /></div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-12"><label class="labels">Tell us about yourself</label>
                                    <div class="form-control" onInput={(e) => setProfileAttr('summary', e.currentTarget.textContent)} contentEditable='true' style={{ whiteSpace: 'pre-wrap', height: '150px', overflowY: 'scroll' }} value={profile.summary}></div>
                                </div>
                            </div>
                            <div class="mt-5 text-center"><button class="btn btn-primary profile-button" onClick={saveProfile} type="button">Save Profile</button></div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ProfileSetup;