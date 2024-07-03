import  React,{useState} from 'react'
import './EditProfile.css'
import TextField from '@mui/material/TextField';
import { Box, Button, Modal } from '@mui/material';
import {IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import axios from 'axios';
import { Grid } from '@mui/material';

const style={
   position: 'absolute',
   top: '50%',
   left: '50%',
   transfrom: 'transfrom(-50%, -50%)',
   width: '800',
   heigth: '600',
   bgcolor: 'background.paper',
   boxShadow: 24,
   borderRadius: 8,
}


export default function EditProfile ({user, loggedInUser})  {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(false);
  const [bio, setBio] = React.useState(false);
  const [location, setLocation] = React.useState(false);
  const [website, setWebsite] = React.useState(false);
  const [dob, setDob] = React.useState(false);

  // const [open, setOpen] =useState(false);

  const handleClose = () => {
    setOpen(true);
  };
  const handleOpen = () =>{
    setOpen(false)
  };

  const HandleSave = async () => {
    const editedInfo = {
      name,
      bio,
      location,
      website,
      dob,
    }
    if(editedInfo){
      await axios.patch(`http://localhost:3000/userUpdate/${user?.email}`) 
      setOpen(false)
    }
   
  }
  return (
    <div>
      <div className='Edit'>
       <button className='Edit-profile-btn '  data-bs-toggle="modal"
        data-bs-target="#modalId" >Edit Profile</button>
        </div>
       
        <div className="row" >
        <div className="col-sm-12" style={{width: '100%', marginLeft: '50px'}}>
        <div
        class="modal fade"
        id="modalId"
        tabindex="-1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        
        role="dialog"
        aria-labelledby="modalTitleId"
        aria-hidden="true"
       >
        <div
          class="modal-dialog  modal-dialog-centered modal-sm"
          role="document"
        >
          <div class="modal-content">
            <div class="modal-header">
            
            <button type="button" style={{backgroundColor: 'lightgray', borderRadius: '20px', marginRight: '40px' }}>Save</button>

              <h5 class="modal-title" id="modalTitleId">
              Profile Edit
              </h5>
              
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">

<form className="fill-content">
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            variant="filled"
            onChange={(e) => setName(e.target.value)}
            defaultValue={loggedInUser[0]?.name ? loggedInUser[0]?.name : ''}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Bio"
            variant="filled"
            onChange={(e) => setBio(e.target.value)}
            defaultValue={loggedInUser[0]?.bio ? loggedInUser[0]?.bio : ''}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Location"
            variant="filled"
            onChange={(e) => setLocation(e.target.value)}
            defaultValue={loggedInUser[0]?.location ? loggedInUser[0]?.location : ''}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Website"
            variant="filled"
            onChange={(e) => setWebsite(e.target.value)}
            defaultValue={loggedInUser[0]?.website ? loggedInUser[0]?.website : ''}
          />
        </Grid>
      </Grid>
    </form>
    <div>
    <h5>Edit date of birth</h5>
    <input type="date" name="" className='form-control' id="date" />
      <Modal
      hideBackdrop
       open={open}
       onClose={handleClose}
       aria-labelledby="child-modal-title"
       aria-describedby="child-modal-description"
       >
        <Box style={{...style, width:'20px', heigth:'25px'}}>
           <div className="text">
            
            <p>this can only be change a few times. <br/>
            make sure you enter the age of the <br/>
            person uing account.</p>
            <input
            type='date'
            onChange={e=>setDob(e.target.value)}
            />
            <Button classNamee='e-button' onClick={() => {setOpen(false)}}>Cancel</Button>
           </div>
        </Box>
       </Modal>

       </div>
    
              <div className="last-section">
                <div className="last-btn">
                  <h5>Switch to professional</h5>
                   <ChevronRightIcon/>
                </div>
              </div>
               </div>
          </div>
        </div>
       </div>
        </div>
      </div>
       
       {/* <!-- Optional: Place to the bottom of scripts --> */}
       <script>
        const myModal = new bootstrap.Modal(
          document.getElementById("modalId"),
          options,
        );
       </script>
       
    </div>
   
  )
}


