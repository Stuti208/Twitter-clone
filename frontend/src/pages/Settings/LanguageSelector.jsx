import React, { useContext } from 'react'
import './Settings.css'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import Welcome from '../../emails/Welcome'
import { renderToStaticMarkup } from "react-dom/server";
import { loggedInUserContext } from '../../Context/Context'


const languages = [
  { code: "en", lang: 'English' },
  { code: "fr", lang: 'French' },
  { code: "hi", lang: 'Hindi' },
  { code: "es", lang: 'Spanish' },
  { code: "pt", lang: 'Portuguese' },
  { code: "zh", lang: 'Chinese' },
]

const LanguageSelector = ({setOpen,language,setLanguage,setOpen2,setType,otp,setOtp}) => {

  const { i18n } = useTranslation();
  const userValue=useContext(loggedInUserContext)
  const loggedInUser = userValue.loggedInUser;

  const changeLanguage = async (lang_code, lang) => {
    
    setLanguage(lang_code);
    

    if (lang === 'French') {

      // const temp = Math.floor(100000 + Math.random() * 900000)
      // console.log(temp)
      try {
        await setOtp(Math.floor(100000 + Math.random() * 900000));
        console.log(otp);
        setType('email');
      
        const userOtp = {
          Otp: otp
        }
     
        await axios.patch(`https://twitter-clone-0b2e.onrender.com/userUpdates/${loggedInUser.email}`, userOtp)
          .then(res => console.log(res))
     
        const str = `Your OTP is ${otp}`
        console.log(str)
     
        const res = await axios.get(`https://twitter-clone-0b2e.onrender.com/sendemail?otp=${otp}&email=${loggedInUser.email}`);
        console.log(res);
      
        setOpen2(true)
      }
      catch (error) {
        alert("Something went wrong!! ,Please try again");
      }
    }

    else {
      setType('phone');
      setOpen(true);
      i18n.changeLanguage(lang_code);
      
    }

   
  
    // // setOpen(true);
    i18n.changeLanguage(lang_code);

    // i18n.changeLanguage(lang);
  }

  return (
    <div className='language-container' style={{diplay:'flex',flexDirection:'column'}}>
      {
        languages.map((lng) => {
          return <button style={{backgroundColor:'white',fontSize:'17px',width:'90%'}}
                    className={lng.code === i18n.language ? "selected" : "not-selected"}
                    key={lng.code}
                    onClick={()=>changeLanguage(lng.code,lng.lang)}>
                        {lng.lang}
                  </button>
        })
      }
    </div>
  )
}

export default LanguageSelector;
