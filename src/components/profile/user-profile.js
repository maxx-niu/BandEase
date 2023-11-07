import React, {useState} from 'react';
import { ref, set} from 'firebase/database';
import {database} from '../../firebase';
import {uid} from 'uid';

function UserProfile() {
  const [userProfileName, setUserProfileName] = useState("");
  const [userProfileInstrunment, setUserProfileInstrument] = useState("");

  const handleSetUserProfileName = (e) => {
    setUserProfileName(e.target.value);
  }

  const handleSetUserProfileInstrunment = (e) => {
    setUserProfileInstrument(e.target.value);
  }


  const setUserInDatabase = () => {
    //alert(`userID: ${userProfileUserID}`)
    console.log(userProfileName, userProfileInstrunment);
    const uuid = uid();
    alert(uuid);
    set(ref(database, `/${uuid}`), {
      uuid: uuid,
      name: userProfileName,
      instruments: userProfileInstrunment
    });
  }


  return (
    <div>
      <h2>User Profile</h2>
        {/* <input
          type="text"
          placeholder="User ID"
          value={userProfileUserID}
          onChange={(e) => setUserProfileUserID(e.target.value)}
        /> */}
        <input
          type="text"
          placeholder="Name"
          value={userProfileName}
          onChange={handleSetUserProfileName}
        />
        <input
          type="text"
          placeholder="Instruments"
          value={userProfileInstrunment}
          onChange={handleSetUserProfileInstrunment}
        />
        <button onClick={setUserInDatabase}>Submit to Database</button>
    </div>
  );
};

export default UserProfile;
