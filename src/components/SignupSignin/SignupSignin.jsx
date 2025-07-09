import React, { use, useState } from "react";
import "./Styles.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";
import { auth, db, doc, setDoc, provider } from "../../firebase";
import { useNavigate } from "react-router";
import { getDoc } from "firebase/firestore";
const SignupSignin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const navigate=useNavigate();
  const signupWithEmail = () => {
    setLoading(true);
    console.log(name, email, password, confirmPassword);
    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      if (password == confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log("user is :", user);
            toast.success("User created");
            setEmail("");
            setName("");
            setPassword("");
            setConfirmPassword("");
            createDoc(user);
            navigate("/dashboard");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage, errorCode);
            // ..
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        toast.error("passwords are not matching");
        setLoading(false);
      }
    } else {
      toast.error("All fields are mandatory");
      setLoading(false);
    }
  };
  
  const createDoc = async (user) => {
      if(!user) return;
      const useRef = doc(db, "users", user.uid);
      const userData= await getDoc(useRef);
      if(!userData.exists()){
         
          try{
            await setDoc(doc(db, "users", user.uid), {
              name: user.displayName?user.displayName:name,
              email: user.email,
              photoURL: user.photoURL ? user.photoURL:"",
              createdAt: new Date(),
            });
            toast.success("Doc created!")
          }
          catch(e){
              toast.error(e.message);
          }
      }else{
         //toast.error("Doc already exists");
      }
      

  };
  const signinWithEmail = () => {
    console.log(email, password);
    setLoading(true);
    if(email!=="" && password!==""){
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        toast.success("Successfully signed in");
        setEmail("");
        setPassword("");
        console.log("user is:", user);
        navigate("/dashboard");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage)
      })
      .finally(()=>setLoading(false));
    }
    else{
       toast.error("All fields are mandatory");
       setLoading(false);
    }
  };
  const googleAuth = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      toast.success("Login successfull!");
      createDoc(user);
      navigate("/dashboard");
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      toast.error(errorMessage);
      // ...
    })
    .finally(()=>setLoading(false));

  };
  return (
    <>
      {isLogin ? (
        <div className="signup-wrapper">
          <h2 className="title">
            Signup on{" "}
            <span style={{ color: "var(--theme)" }}>Money Nest</span>
          </h2>
          <form action="">
            <Input
              type={"email"}
              lable={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"vishnu@gmail.com"}
            />
            <Input
              type={"password"}
              lable={"password"}
              state={password}
              setState={setPassword}
              placeholder={"password"}
            />

            <Button
              disabled={isLoading}
              text={isLoading ? "Loading..." : "Signin with Email and Password"}
              onClick={signinWithEmail}
            />
            <p style={{ textAlign: "center", margin: "0" }}>or</p>
            <Button
              disabled={isLoading}
              text={isLoading ? "Loading..." : "Signin with Google"}
              blue={true}
              onClick={googleAuth}
            />
            <p className="p-login" onClick={() => setLogin(false)}>
              Or Don't Have an Account? Signup
            </p>
          </form>
        </div>
      ) : (
        <div className="signup-wrapper">
          <h2 className="title">
            Signup on{" "}
            <span style={{ color: "var(--theme)" }}>Personal Finance</span>
          </h2>
          <form action="">
            <Input
              lable={"Full Name"}
              state={name}
              setState={setName}
              placeholder={"Vishnu Virat"}
            />
            <Input
              type={"email"}
              lable={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"vishnu@gmail.com"}
            />
            <Input
              type={"password"}
              lable={"password"}
              state={password}
              setState={setPassword}
              placeholder={"password"}
            />
            <Input
              type={"password"}
              lable={"confirm password"}
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder={"confirm password"}
            />
            <Button
              disabled={isLoading}
              text={isLoading ? "Loading..." : "Signup with Email and Password"}
              onClick={signupWithEmail}
            />
            <p className="p-login" style={{ textAlign: "center", margin: "0" }}>
              or
            </p>
            <Button
              disabled={isLoading}
              text={isLoading ? "Loading..." : "Signup with Google"}
              blue={true}
              onClick={googleAuth}
            />
            <p className="p-login" onClick={() => setLogin(true)}>
              or Have an Account already? Click Here
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default SignupSignin;
