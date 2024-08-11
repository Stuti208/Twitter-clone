import React, { useContext, useState,useEffect } from 'react'
import './EditProfile.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios'
import { editStatusContext, loggedInUserContext,postStatusContext } from '../../../Context/Context';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
// import DatePicker from "react-date-picker";
// import 'react-datepicker/dist/react-datepicker.css'


const EditProfile = () => {
  
  const style = {
    position: 'absolute',
    top: '70px',
    left: '360px',
    width:'520px',
    height: '490px',
    backgroundColor:'white',
    borderRadius: '25px',  
    boxShadow:'0px 0px 10px grey',
  }

  // const user = useAuthState(auth);
  // const [loggedInUser, setLoggedInUser] = useState({});
  


  const userValue=useContext(loggedInUserContext)
  const loggedInUser = userValue.loggedInUser;
  const postValue = useContext(postStatusContext);

  const editValue = useContext(editStatusContext);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState(loggedInUser.name);
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [dob, setDob] = useState('');

  // useEffect(() => {

  //   if (user) {
  //       const email = user[0].email;

  //       fetch(`http://localhost:3000/loggedInUser?email=${email}`)
  //        .then(res => res.json())
  //        .then(data => {
  //               setLoggedInUser(data[0]);
  //         })
  //   }
  // }, [tempName]);

  // function EditChild({dob,setDob}) {
  //   const [open, setOpen] = useState(false);

  //   const handleOpen = () => {
  //     setOpen(true);
  //   }

  //   const handleClose = () => {
  //     setOpen(false);
  //   }

  //   return (
  //     <React.Fragment>
  //       <div className="birthdate-sction" onClick={handleOpen}>
  //           <text>Edit</text>
  //       </div>

  //       <Modal
  //         open={open}
  //         onClose={handleClose}
  //         aria-labelledby="child-modal-title"
  //         aria-describedby="child-modal-description">
          
  //         <Box sx={{...style,width:'300px',height:'300px'}}>
  //           <div className="text">
  //             <h2>Edit date of birth?</h2>
  //             <p>This can only be changed a few times.<br />
  //               make sure you enter the age of the <br />
  //               person using account</p>
              
  //             <input
  //               type='date'
  //               onChange={e => setDob(e.targer.value)} />
              
  //            </div>
  //         </Box>
  //       </Modal>


  //     </React.Fragment>
  //   )
  // }


  const handleClose = () => {
    setOpen(false);
  }

  const handleSave = async () => {
    
    const userProfile = {
      name: name,
      bio: bio,
      location: location,
      dob:dob
    }
    
    axios.patch(`http://localhost:3000/userUpdates/${loggedInUser.email}`, userProfile)
      .then(res => console.log(res))
    
    setOpen(false);
    await editValue.toggleEditStatus();

    const userName = {
      name:name
    }

    console.log(loggedInUser.name)

    axios.patch(`http://localhost:3000/postUpdates/${loggedInUser._id}`, userName)
      .then(res => console.log(res))
    
    postValue.changePostStatus();
    
  }

  return (

      <div>
      <button className='editProfile-btn' onClick={() => setOpen(true)}>Edit Profile</button>
      
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">

        <Box sx={style}>
          <div className="editpage-header">
              <IconButton 
                style={{position:'absolute', top:'4px', left:'2px',  zIndex: '1'}}
                onClick={handleClose} >
                
                <CloseIcon className='close-icon'
                  style={{transform: 'scale(1.2)'}}>
                </CloseIcon>
            </IconButton>
            
            <h2 className='editpage-heading'>Edit Profile</h2>

            <button className='editpage-savebtn' onClick={handleSave}> Save</button>
          </div>

          <div className="fill-content">
            <TextField className='textfield' label='Name' variant='filled'
              onChange={(e) => setName(e.target.value)} defaultValue={loggedInUser.name}
              style={{ width: '93%', marginLeft: '15px',border:'1px solid grey'}} />
            
            <TextField className='textfield' label='Bio' variant='filled'
              onChange={(e) => setBio(e.target.value)} defaultValue={loggedInUser.bio?loggedInUser.bio:''}
              style={{ width:'93%', marginLeft:'15px',marginTop:'25px', border:'1px solid grey' }} />
            
            <TextField className='textfield' label='Location' variant='filled'
              onChange={(e) => setLocation(e.target.value)} defaultValue={loggedInUser.location?loggedInUser.location:''}
              style={{ width: '93%', marginLeft: '15px',marginTop:'25px',border:'1px solid grey' }} />
            
            {/* <DatePicker  className='textfield' label='Birth date'
              onChange={(e) => setDob(e.target.value)} defaultValue={loggedInUser.dob?loggedInUser.dob:''}
               /> */}
          </div>
          
          {/* <div className="birthdate-section">
            <p>Birth date</p>
            <p>.</p>
            <EditChild dob={dob} setDob={setDob}/>
           </div> */}
        </Box>
      </Modal>

      </div>
  )
}

export default EditProfile