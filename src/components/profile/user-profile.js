import React, {useState} from 'react';
import {ref, set} from 'firebase/database';
import {database} from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';

const UserProfile = () => {

  const {user} = useAuth();

  const [userProfileData, setUserProfileData] = useState({username:"", firstName:"", lastName: "", instruments:"", age:"",
      country:"", pronouns:"", avatar:"", bio:""});

  const handleUpdateUserProfile = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserProfileData({...userProfileData, [name]: value});
  }

  // const setUserInDatabase = () => {
  //   //alert(`userID: ${userProfileUserID}`)
  //   console.log(userProfileName, userProfileInstrunment);
  //   const uuid = uid();
  //   alert(uuid);
  //   set(ref(database, `/${uuid}`), {
  //     uuid: uuid,
  //     name: userProfileName,
  //     instruments: userProfileInstrunment
  //   });
  // }

  const setUserInDatabase = () => {
    //alert(`userID: ${userProfileUserID}`)
    const userRef = ref(database, 'users/' + user.uid);
    set(userRef, userProfileData);
  }


  return (
    <div>
      <h2>User Profile</h2>
      <form className="profile-form">
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
          placeholder="Avatar"
          name = "avatar"
          value={userProfileData.avatar}
          onChange={handleUpdateUserProfile}
        />
        <input
          type="text"
          placeholder="Bio"
          name = "bio"
          value={userProfileData.bio}
          onChange={handleUpdateUserProfile}
        />
        <button onClick={setUserInDatabase}>Submit to Database</button>
      </form>
    </div>
  );
};

export default UserProfile;
