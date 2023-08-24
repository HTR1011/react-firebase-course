import {auth, googleProvider} from "../config/firebase";
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";
import {useState} from "react";

export const Auth = () => {
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log(auth?.currentUser?.email)


    const signIn = async () =>{
        try{
            //login function from Auth lib
            await createUserWithEmailAndPassword(auth, email,password)
        } catch(err){
            //if error
            console.error("error at + " + err)
        }
        
    };

    const signInWithGoogle = async () => {
        try{
            await signInWithPopup(auth, googleProvider)
        }
        catch(err){
            console.error("Error at + " + err)
        }
    };

    const LogOut = async () =>{
        try{
            //login function from Auth lib
            await signOut(auth)
        } catch(err){
            //if error
            console.error("error at + " + err)
        }
        
    };



    return(
    <div>
        <input 
        placeholder="Email..." 
        //e.target.value updating the satet with current value of input field.
        onChange={(e) => setEmail (e.target.value)} 
        />

        <input 
        placeholder="Password" 
        type="password"
        onChange={(e) => setPassword (e.target.value)}  
        />
        
        <button onClick={signIn}>Sign In</button>

        <button onClick={signInWithGoogle}> Sign In with Google</button>

        <button onClick={LogOut}>Log Out</button>

    </div>
    )
}