import React from 'react';
import { useState } from 'react';
// import { storage } from '../uploadimage/firebase';
// import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
// import { UploadProfileImage } from '../UploadImage/UploadImage';

const PersonalInfo = ({ formData, setFormData }) => {
  function onChangeValue(event) {
    setFormData({ ...formData, interests: event.target.value });
  }

  // const UploadProfileImage = (image) => {
  //   const imageRef = ref(storage, `imageprofile/${image.name + Date.now()}`);
  //   return uploadBytes(imageRef, image).then((snapshot) => {
  //     return getDownloadURL(snapshot.ref);
  //   });
  // };

  //  if (image !== null) {
  //     UploadProfileImage(image).then((url) => {
  //       fetchApi(url);
  //     });
  //   } else {
  //     fetchApi(null);
  //   }
  // };
  // const handleImageChange = (event) => {
  //   setFormData{}
  // }

  return (
    <>
      <div className="personal-info-container">
        <label>
          {' '}
          Profile pic:
          <input
            type={'file'}
            placeholder={'Profile picture'}
            value={formData.profilePic}
            onChange={(event) =>
              // UploadProfileImage(event.target.value).then((url) => {
              //   setFormData({ ...formData, profilePic: url });
              // })
              // console.log(event.target.value)
              setFormData({ ...formData, profilePic: event.target.value })
            }
          />
        </label>
        <label>
          {' '}
          Interest:
          <div>
            <input
              onChange={onChangeValue}
              type="radio"
              value="Heli-skiing"
              name="interest"
              checked={formData.interests === 'Heli-skiing'}
            />{' '}
            Heli-skiing
            <br />
            <input
              onChange={onChangeValue}
              type="radio"
              value="Quidditch"
              name="interest"
              checked={formData.interests === 'Quidditch'}
            />{' '}
            Quidditch
            <br />
            <input
              onChange={onChangeValue}
              type="radio"
              value="Geocaching"
              name="interest"
              checked={formData.interests === 'Geocaching'}
            />{' '}
            Geocaching
            <br />
            <input
              onChange={onChangeValue}
              type="radio"
              value="Ker-Plucking"
              name="interest"
              checked={formData.interests === 'Ker-Plucking'}
            />{' '}
            Ker-Plucking
            <br />
            <input
              onChange={onChangeValue}
              type="radio"
              value="News-raising"
              name="interest"
              checked={formData.interests === 'News-raising'}
            />{' '}
            News-raising
          </div>
        </label>
      </div>
    </>
  );
};

export default PersonalInfo;
