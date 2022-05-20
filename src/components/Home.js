import { updateProfile } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/userAuthContext";

import {
    ref,
    uploadBytes,
    getDownloadURL,

  } from "firebase/storage";
  import { storage } from "../firebase";
  import { v4 } from "uuid";

const Home = () => {
  const { logOut, user } = useUserAuth();
const [update, setUpdate] = useState(false);
const [name, setName] = useState("");
const [url,setUrl] = useState("");
const [updateText, setUpdateText] = useState("");

const [imageUpload, setImageUpload] = useState(null);

const uploadFile = () => {
  if (imageUpload == null) return;
  const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
  uploadBytes(imageRef, imageUpload).then((snapshot) => {
    getDownloadURL(snapshot.ref).then((url) => {
      setUrl(url);
    });
  });
};

function handleSubmit(){
    if(name === ""){
        alert("Please enter all the fields");
        return;
    }
    else{
       
        updateProfile(user, {
            displayName: name, photoURL: url
          }).then(() => {
            setUpdateText('Profile Updated');
          }).catch((error) => {
            setUpdateText(error.message);
          });

    }

}

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="p-4 box mt-3 text-center">
      {
            user && (
                <>
                <img src={user.photoURL} alt="profile" className="profile-pic rounded img-fluid" />
             <br></br>
                </>
            )
        }
        Hello Welcome <br />

        {user && user.email}
        <br />
        {
            user && user.displayName
        }
        {
            console.log(user)
        }
      </div>
      <div className="d-grid gap-2">
          <Button variant="primary" onClick={() => setUpdate(true)}>
            Update Profile
          </Button>
          {
              update && 
              (<>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
              <Form.Control
              type="text"
              placeholder=" Name" 
              className="mb-3"
              onChange={(e) => setName(e.target.value)}

              
            />
            
          </Form.Group>
          <Form.Group controlId="url">
              <Form.Control
              type="text"
              placeholder="Url of New Image"
              className="mb-3"
             onChange={(e) => setUrl(e.target.value)}
              
            />
            
          </Form.Group>
          {/* <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      /> */}

          <Button type="submit">
            Update
          </Button>

              </Form>
              </>)
          }
        <Button variant="primary" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </>
  );
};

export default Home;