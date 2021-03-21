import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}

function App() {
  // State for new user sign up 
  const [newUser,setNewUser] = useState(false);
  // State for user
  const [user,setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  });
  // Google Provider
  var provider = new firebase.auth.GoogleAuthProvider();
  // Facebook Provider
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  // github Provider
  var gitProvider = new firebase.auth.GithubAuthProvider();
  // Twitter Provider

  // Google event handel
  const handelGoogleSignIn = ()=>{
    firebase.auth()
  .signInWithPopup(provider)
  // .then((result) => {
  //   var credential = result.credential;
  //   var token = credential.accessToken;
  //   var user = result.user;
  //   console.log(user);
  //   setUser(user);
  // }).catch((error) => {
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  //   var email = error.email;
  //   var credential = error.credential;
  //   console.log(errorCode,errorMessage,email,credential);
  // });
  .then(res => {
    const {email,displayName,photoURL} = res.user;
    const signedInUser = {
      isSignedIn: true,
      name: displayName,
      email: email,
      photo: photoURL
    } 
    setUser(signedInUser);
  }).catch(error => {
    console.log(error);
    console.log(error.message);
  })
  }
  // Facebook event handel
  const handelFacebookSignIn = () =>{
    firebase
  .auth()
  .signInWithPopup(fbProvider)
  // .then((result) => {
  //   var credential = result.credential;
  //   var user = result.user;
  //   var accessToken = credential.accessToken;
  //   console.log(user);
  //   setUser(user);
  // })
  // .catch((error) => {
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  //   var email = error.email;
  //   var credential = error.credential;
  //   console.log(errorCode,errorMessage,email,credential);
  // });
  .then(res => {
    const {email,displayName,photoURL} = res.user;
    const signedInUser = {
      isSignedIn: true,
      name: displayName,
      email: email,
      photo: photoURL
    } 
    setUser(signedInUser);
  }).catch(error => {
    console.log(error);
    console.log(error.message);
  })
  }
  // Github event handel
  const handelGithubSignIn = () =>{
    firebase
  .auth()
  .signInWithPopup(gitProvider)
  // .then((result) => {
  //   var credential = result.credential;
  //   var token = credential.accessToken;
  //   var user = result.user;
  //   console.log(user);
  //   setUser(user);
  // }).catch((error) => {
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  //   var email = error.email;
  //   var credential = error.credential;
  //   console.log(errorCode,errorMessage,email,credential);
  // });
  .then(res => {
    const {email,displayName,photoURL} = res.user;
    const signedInUser = {
      isSignedIn: true,
      name: displayName,
      email: email,
      photo: photoURL
    } 
    setUser(signedInUser);
  }).catch(error => {
    console.log(error);
    console.log(error.message);
  })
  }
  // Add Twitter login system(home work)

  // Log Out
  const handelSignOut = () => {
    firebase.auth().signOut().then(() => {
      const logOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        error: '',
        success: false
      }
      setUser(logOutUser);
    }).catch((error) => {
      console.log(error);
    });
  }

  // On Change event handel
  const handelBlur = (e)=>{
    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value)
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  } 
  // Input Form event handel
  const handelSubmit = (e)=>{
    // console.log(user.email, user.password);
    if (newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(res => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        updateUserName(user.name);
      })
      .catch((error) => {
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      });
    }
    // New user Sign In / Log In
    if (!newUser && user.name && user.email) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        console.log('Sign in user info', res.user);
      })
      .catch((error) => {
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      });
    }
    e.preventDefault();
  }
  // update user Name
  const updateUserName = name => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name
    }).then(function() {
      console.log('user name updated successfully')
    }).catch(function(error) {
      console.log(error)
    });
  }
  return (
    <div className="App">
      <h2>Firebase Recap | Module 42.5/41/42</h2>
      {
        user.isSignedIn ? <button onClick={handelSignOut}>Sign Out</button>:
        <div>
        <button onClick={handelGoogleSignIn}>SignIn With Google</button>
        <br/>
        <button onClick={handelFacebookSignIn}>SignIn With Facebook</button>
        <br/>
        <button onClick={handelGithubSignIn}>SignIn With Github</button>
      </div>
      }
      
      
      
      {/* <p>Email: {user.email}</p>
      <p>Name: {user.displayName}</p>
      <img src={user.photoURL} alt=""/> */}
      {
        user.isSignedIn &&  
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <img src={user.photo} alt=""/>
        </div> 
      }
      <h2>Our won Authentication</h2>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
      <label htmlFor="newUser">New User Sign Up</label>
      <form onSubmit={handelSubmit}>
        {
          newUser && <input type="text" onBlur={handelBlur} name="name" placeholder="Your Name" required/>
        }
        
        <br/>
        <input type="text" onBlur={handelBlur} name="email" placeholder="Email Address" required/>
        <br/>
        <input type="password" onBlur={handelBlur} name="password" placeholder="Password" required/>
        <br/>
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'}/>
      </form>
      {/* Show Error Message */}
      <p style={{color: "red"}}>{user.error}</p>
      
      {
        user.success && <p style={{color: "green"}}>User {newUser ? 'created' : 'Logged In'} successfully.</p>
      }
    </div>
  );
}

export default App;
