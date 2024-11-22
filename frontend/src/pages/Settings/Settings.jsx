import React, { useContext, useEffect, useState } from 'react'
import '../Feed_Page.css'
import LanguageSelector from './LanguageSelector';
import './Settings.css'
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import '../Login/ForgetPassword.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OtpInput from "otp-input-react"
import { CgSpinner } from "react-icons/cg"
import VerifiedIcon from '@mui/icons-material/Verified';
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast, Toaster } from "react-hot-toast";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { loggedInUserContext } from '../../Context/Context';
import {loadStripe} from '@stripe/stripe-js';


const Settings = () => {
  const [user, setUser] = useState(null);
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [phoneNum, setPhoneNum] = useState('');
  const [OTP, setOTP] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState("");
  const [msg1, setMsg1] = useState("");
  const [msg2, setMsg2] = useState("");
  const [type, setType] = useState("");
  const [otp, setOtp] = useState("");
  const [plan, setPlan] = useState("");
  const [amount, setAmount] = useState(0);
  const [tweetCount, setTweetCount] = useState(0);
  const [openSub, setOpenSub] = useState(false);

  const userValue=useContext(loggedInUserContext)
  const loggedInUser = userValue.loggedInUser;


  

  


  function onSignup() {

    try {

      setLoading(true);

      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth,
          "recaptcha",
          {
            size: "invisible",
            callback: (response) => {
              onSignup();
            },
            "expired-callback": () => { },
          });
      }
    

      const appVerifier = window.recaptchaVerifier;
      console.log(appVerifier)

      const formatPh = "+"+ph;
      console.log(formatPh)

      signInWithPhoneNumber(auth, formatPh, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          console.log(window.confirmationResult)
          setLoading(false);
          setShowOTP(true);
          toast.success("OTP sended successfully!");
          setOpen2(true);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          setMsg1("Error Expected!! Try Again")
        });

    }
    catch (err) {
      console.error(err);
      setMsg1("Try Again")
    }
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(OTP)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
        setOpen3(true);
        i18n.changeLanguage(language);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setMsg2("Incorrect OTP")
      });
  }

  // const sendOTP = async() => {
  //   try {
  //     const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {})
  //     const formatPh = `+${ph}`;
  //     const confirmation = await signInWithPhoneNumber(auth, formatPh, recaptcha)
  //     console.log(confirmation)
  //   }
  //   catch (err) {
  //     console.error(err);
  //   }
  // }

  const handleClose = () => {
    setOpen(false);
    setPh("");
    setMsg1("")
  }

  const handleClose2 = () => {
    setOpen2(false);
    setOTP("")
    setMsg2("")

  }

  const handleClose3 = () => {
    setOpen3(false);
  }

  const handleCloseSub = () => {
    setOpenSub(false);
  }

  const handleClickSent = () => {
    onSignup();
  }

  const handleClickVerify = () => {
    console.log(type)
    if (type === 'email') {

      // console.log(otp)
      // console.log(OTP)
      
      const email = loggedInUser.email;

      fetch(`https://twitter-clone-0b2e.onrender.com/loggedInUser?email=${email}`)
      .then(res => res.json())
        .then(data => {  
             
          const otp = data[0].Otp;
          console.log(otp)
          if (OTP == otp) {
            setOpen3(true)
            i18n.changeLanguage(language);
          }  
          else {
            setMsg2("Incorrect OTP")
          }
       })
      

      
    }
    else {
      onOTPVerify();
    }
  }

  const makePayment = async () => {
    
    // const now = new Date();
    // const istTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
    // const currentHour = istTime.getHours();
    // const currentMinutes = istTime.getMinutes();

    // if (currentHour !== 10 || (currentHour === 10 && currentMinutes > 59)) {
    //   alert("Payments are allowed only between 10:00 AM and 11:00 AM IST.");
    //   return;
    // }

    try {

      console.log("hello")

      const stripe = await loadStripe('pk_test_51QGNy7J40uHuls0p4J3FaoFJGDDpaH35lVU0btJnj4Vcn37aJq5w53ZEXY2lpGoBNRMYDDShbrRcjnz6rxQ0sRfF00tbJr9C0x');
      const body = {
        plan: plan,
        amount: amount,
        tweet: tweetCount
      }

      const headers = {
        "Content-Type": "application/json"
      }

      const response = await fetch(`https://twitter-clone-0b2e.onrender.com/create-checkout-session`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
      })

      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      
      
      })

      if (result.error) {
        console.log(result.error);
      }
      
    }
    catch (error) {
      alert("Something went wront!!, Please try again.")
    }
  }


  return (
    <div className='feed-page'>
       <div className="communities-header">
        <h2>{ t("component8")}</h2>
      </div>

      <div className='subscription-container'>
        <h5>{ t("subscribe")}</h5>
        <input type='button' className='payment-btn' value={ t("subscription")} onClick={()=>setOpenSub(true)}></input>
      </div>

      <div className="language-setting" >
         <h4>{ t("select-language")}</h4>
      </div>

     
      <div>
        <LanguageSelector setOpen={setOpen} language={language} setLanguage={setLanguage} setOpen2={setOpen2} setType={setType} otp={ otp} setOtp={ setOtp} />
      </div>

      

      
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">

        <Box className='phone-modal'>
          <div className="editpage-header">
              <IconButton 
                style={{position:'absolute', top:'4px', left:'2px',  zIndex: '1'}}
                onClick={handleClose} >
                
                <CloseIcon className='close-icon'
                  style={{transform: 'scale(1.2)'}}>
                </CloseIcon>
            </IconButton>
            

            {/* <button className='editpage-savebtn' onClick={handleSave}> Save</button> */}
          </div>

          <div className='verification-box subscription-box module'>
              
           

            <div style={{marginBottom:"15px"}} className="forgetPass-detail">
                 Please enter your phone number to receive a verification code.
              </div>

              {/* {requestError && <p style={{color:'red',marginTop:'20px'}}>{requestError}</p>} */}
            
            <p style={{ color: "red",margin:"10px" }}>{msg1}</p>
            
            <PhoneInput country={"in"}
              value={ph} onChange={(e) => { setPh(e); setMsg1("")}}
              inputProps={{
                name:"phone",
                required: true,
                autoFocus: true
              }}
              inputStyle={{backgroundColor:"white",color:"black",border:"1px solid rgb(56, 189, 241)",width:"75%",height:"30px",marginTop:"30px",marginLeft:"3px",borderRadius:"10px",padding:"18px 45px",fontSize:"15px"}} />
            
            {/* <input type="tel" required
                className='phone-num'
                placeholder='Phone Number'
                onChange={(e) => { setPhoneNum(e.target.value) }}
                style={{ color: 'black' }} ></input> */}
              
             <Toaster toastOptions={{ duration: 4000 }} />
             <div id="recaptcha"></div>

              <div className="next-btn">
                      <button type='submit' className='otp-btn' onClick={handleClickSent}>
                          Send OTP
                      </button>
              </div>
         
        </div>
           
          
        </Box>
      </Modal>



      <Modal
        open={open2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">

        <Box className='phone-modal'>
          <div className="editpage-header">
              <IconButton 
                style={{position:'absolute', top:'4px', left:'2px',  zIndex: '1'}}
                onClick={handleClose2} >
                
               <ArrowBackIcon />
            </IconButton>
            

            {/* <button className='editpage-savebtn' onClick={handleSave}> Save</button> */}
          </div>

          <div className='verification-box subscription-box module'>
              
           

            <div style={ {marginTop:'20px',marginBottom:'20px'}} className="forgetPass-detail">
              {language === 'fr'?
                "Enter your verification code sent to your registered email address" :
                "Enter your verification code"
               }            
            </div>
            
            <p style={{ color: "red",margin:"10px" }}>{msg2}</p>

            <OtpInput
              value={OTP} onChange={(e) => { setOTP(e); setMsg2("")}}
              OTPLength={6}
              otpType="number"
              disabled={false}
              autoFocus
              inputStyles={{ backgroundColor: "white", color: "black", border: "1px solid rgb(56, 189, 241)" }}
              className="otp-field"/>

              {/* {requestError && <p style={{color:'red',marginTop:'20px'}}>{requestError}</p>} */}
            
           
              <div className="next-btn">
                   <button type='submit' className='otp-btn' onClick={handleClickVerify}>
                     {loading && <CgSpinner size={20} className="animate-spin" style={{marginRight:"9px"}} />}
                          Verify OTP
                      </button>
              </div>
         
        </div>

         
        </Box>
      </Modal>

      


      <Modal
        open={open3}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">

        <Box className='phone-modal'>
          <div className="editpage-header">
              <IconButton 
                style={{position:'absolute', top:'4px', left:'2px',  zIndex: '1'}}
                onClick={handleClose3} >
                
               <ArrowBackIcon />
            </IconButton>
            

            {/* <button className='editpage-savebtn' onClick={handleSave}> Save</button> */}
          </div>

          <div className='verification-box' subscription-box module>
              
           

            <div style={{textAlign:'center',fontSize:"27px"}} className="forgetPass-detail">
                 Verified Successfully
            </div>

            <VerifiedIcon style={ {scale:"4",marginLeft:'170px',marginTop:"50px",color:"rgb(56, 189, 241)"}} />
           
              {/* {requestError && <p style={{color:'red',marginTop:'20px'}}>{requestError}</p>} */}
            
           
         
        </div>

         
        </Box>
      </Modal>

      

      <Modal
        open={openSub}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">

        <Box className="subscription-module">
          <div className="editpage-header">
              <IconButton 
                style={{position:'absolute', top:'4px', left:'2px',  zIndex: '1'}}
                onClick={handleCloseSub} >
                
                <CloseIcon className='close-icon'
                  style={{transform: 'scale(1.2)'}}>
                </CloseIcon>
            </IconButton>
            
          </div>

          <div className='verification-box subscription-box'>
              
            <button className='subscription btn1' onClick={() => { setPlan('Gold Plan'); setAmount(1000); setTweetCount('unlimited'); makePayment()}}>
              <h2>Gold Plan</h2>
              <p>Unlock unlimited tweeting with our Gold Plan at ₹1000/month, offering the most freedom to share as much as you want!</p>
            </button>
            
            <button className='subscription btn2' onClick={() => { setPlan('Silver Plan'); setAmount(300);setTweetCount('5');makePayment()}}>
              <h2>Silver Plan</h2>
              <p>At ₹300/month, the Silver Plan allows you to post up to 5 tweets, ideal for users looking to engage more frequently</p>
            </button>
            
            <button className='subscription btn3' onClick={() => { setPlan('Bronze Plan'); setAmount(100);setTweetCount('3');makePayment()}}>
              <h2>Bronze Plan</h2>
              <p>For ₹100/month, the Bronze Plan lets you post up to 3 tweets, providing an affordable way to stay active with more posts</p>
             </button>

        </div>
           
          
        </Box>
      </Modal>



    </div>
  )
}

export default Settings;
