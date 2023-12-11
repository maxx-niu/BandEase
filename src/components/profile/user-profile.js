import React, {useState} from 'react';
import { ref, set } from 'firebase/database';
import { database, storage } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { getDownloadURL, uploadBytes, ref as storageRef } from 'firebase/storage';

const UserProfile = () => {

  const { user } = useAuth();

  const [userProfileData, setUserProfileData] = useState({username:"", firstName:"", lastName: "", instruments:"", age:"",
      country:"", pronouns:"", bio:"", avatarURL:""});

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

  const handleUpload = () => {
    const imageRef = storageRef(storage, `profilepictures/${image.name}`);

    uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setUserProfileData({...userProfileData, avatarURL: url});
        console.log(url);
      })
    }).catch((error) => {
      console.error("Error uploading image: ", error)
    });
  };

  const setUserInDatabase = (e) => {
    e.preventDefault();
    //alert(`userID: ${userProfileUserID}`)
    const userRef = ref(database, 'users/' + user.uid);
    //handleUpload();
    set(userRef, userProfileData).then(() => {
      console.log("Data written successfully.");
    })
    .catch((error) => {
      console.error("Error writing data: ", error);
    });
    handleUpload();
  }


  return (
    <div>
      <h2>User Profile</h2>
      <p>{userProfileData.avatarURL}</p>
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
          type="text"
          placeholder="Instruments Played"
          name = "instruments"
          value={userProfileData.instruments}
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
        <input
          type="text"
          placeholder="Preferred Pronouns"
          name = "pronouns"
          value={userProfileData.pronouns}
          onChange={handleUpdateUserProfile}
        />
        <input
          type="text"
          placeholder="Bio"
          name = "bio"
          value={userProfileData.bio}
          onChange={handleUpdateUserProfile}
        />
        <div>
          <input 
            type="file" 
            onChange={handleImageChange} 
          />
          {/* <progress value={progress} max="100"/> */}
          <img src={userProfileData.avatarURL || "http://via.placeholder.com/300"} alt="upload-avatar" />
        </div>
        <button type="submit">Submit to Database</button>
      </form>
    </div>
  );
};

export default UserProfile;
