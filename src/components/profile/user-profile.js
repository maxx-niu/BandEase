import React, { useState } from 'react';
import { ref, set } from 'firebase/database';
import { database, storage } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { useUserProfileData } from '../../contexts/UserContext';
import { getDownloadURL, uploadBytes, ref as storageRef, deleteObject, listAll } from 'firebase/storage';

const UserProfile = () => {

  const { user } = useAuth();
  const { userProfileData, setUserProfileData } = useUserProfileData();

  const handleUpdateUserProfile = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserProfileData({...userProfileData, [name]: value});
  }
  
  const [image, setImage] = useState(null);
  //const [progress, setProgress] = useState(0);

  const handleImageChange = e => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const fileType = file.type;
      const validImageTypes = ["image/jpeg", "image/png"];
      if (validImageTypes.includes(fileType)) {
        setImage(file);
      } else {
        alert("Please upload an image file (jpeg, or png).");
      }
    }
  };

  const handleUpload = async () => { // handles profile picture setting in the database

    // if there's an existing profile picture, delete it to save space
    if (userProfileData.avatarURL !== "") {
      const oldImageRef = storageRef(storage, `users/${user.uid}/profilepicture/${userProfileData.avatarFileName}`);
      await deleteObject(oldImageRef).catch((error) => {
        console.error("Error deleting old image: ", error);
      });
    }

    const imageRef = storageRef(storage, `users/${user.uid}/profilepicture/${image.name}`);
    return await uploadBytes(imageRef, image).then(async (snapshot) => {
      const url = await getDownloadURL(snapshot.ref);
      console.log(url);
      const newUserProfileData = {...userProfileData, avatarURL: url, avatarFileName: image.name};
      setUserProfileData(newUserProfileData);
      return newUserProfileData;
    }).catch((error) => {
      console.error("Error uploading image: ", error)
    });
  };
  
  const setUserInDatabase = async (e) => {
    e.preventDefault();
    const updatedUserProfileData = await handleUpload();
    console.log(updatedUserProfileData);
    const userRef = ref(database, 'users/' + user.uid);
    set(userRef, updatedUserProfileData).then(() => {
      console.log("Data written successfully.");
    })
    .catch((error) => {
      console.error("Error writing data: ", error);
    });
  }

  return (
    <div>
      <h2>User Profile</h2>
      <form className="profile-form" onSubmit={setUserInDatabase}>
        <input
          type="text"
          placeholder="Username"
          name = "username"
          value={userProfileData.username}
          onChange={handleUpdateUserProfile}
        />
        <input
          type="text"
          placeholder="First Name"
          name = "firstName"
          value={userProfileData.firstName}
          onChange={handleUpdateUserProfile}
        />
        <input
          type="text"
          placeholder="Last Name"
          name = "lastName"
          value={userProfileData.lastName}
          onChange={handleUpdateUserProfile}
        />
        <input
          type="number"
          placeholder="Age"
          name = "age"
          value={userProfileData.age}
          onChange={handleUpdateUserProfile}
        />
        <input
          type="text"
          placeholder="Country"
          name = "country"
          value={userProfileData.country}
          onChange={handleUpdateUserProfile}
        />
        <div>
          <input 
            type="file" 
            onChange={handleImageChange} 
          />
          {/* <progress value={progress} max="100"/> */}
          <img src={userProfileData.avatarURL || "http://via.placeholder.com/300"} alt="upload avatar" style={{maxWidth: "300px", maxHeight: "300px"}} />
        </div>
        <button type="submit">Submit to Database</button>
      </form>
    </div>
  );
};

export default UserProfile;

