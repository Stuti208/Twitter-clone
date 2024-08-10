import { useState,useEffect,useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from '../firebase.init';
import { loggedInUserContext, profileImageContext,editStatusContext } from '../Context/Context';


const useLoggedInUser = () => {
    const user = useAuthState(auth);

    const [loggedInUser, setLoggedInUser] = useState({});
    const value=useContext(profileImageContext)
    const userValue=useContext(loggedInUserContext)
    const editValue = useContext(editStatusContext);


    useEffect(() => {

        if (user) {
            const email = user[0].email;

            fetch(`http://localhost:3000/loggedInUser?email=${email}`)
             .then(res => res.json())
             .then(data => {
                 userValue.setLoggedInUser(data[0]);
                 setLoggedInUser(data[0]);
                 console.log(data[0])
              })
        }
    }, [value.profileImage,editValue.editStatus]);
    
    return (
       [loggedInUser, setLoggedInUser]
    )
  
}

export default useLoggedInUser
