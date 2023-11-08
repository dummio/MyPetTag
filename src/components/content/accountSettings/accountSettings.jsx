/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useState, useEffect } from 'react';
import {
  getUserData,
  isUserAuthenticated,
  updateAccountInfo,
  changeAccountEmail,
  changeAccountPassword,
  reauthenticateCurrentUser,
} from '../../../firebaseCommands';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import _ from 'lodash';
import { Patterns } from '../../../constants';

// Import CSS
import './accountSettings.css';
import logo from '../../../images/paw.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

// Import React Components
import PasswordModal from '../../modals/passwordModal';

/**
 * Handles edit of all information about a users account filling in and updating data
 * pertaining to the user. Such as (Phone, Email, Name, and Pet Profiles)
 *
 * @returns Account Settings HTML element.
 */
const AccountSettings = () => {
  const [pageReady, setPageReady] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentEmail, setCurrentEmail] = useState();

  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    defaultValues: getInitialValues,
  });

  async function getInitialValues() {
    try {
      const userData = await getUserData();

      if (userData) {
        const userDoc = userData[0];
        const email = userData[1];
        setCurrentEmail(email);

        setPageReady(true);
        return {
          firstName: userDoc.firstname,
          lastName: userDoc.lastname,
          userPhone: userDoc.phone,
          userEmail: email,
        };
      }
      return {};
    } catch (error) {
      console.error('Error retrieving pet data:\n', error);
      return {};
    }
  }

  async function formSubmit(data) {
    let emailSuccess = true;
    let passwordSuccess = true;
    if (data.userEmail !== currentEmail || !_.isEmpty(data.newPassword)) {
      let reauthenticatedUser = await reauthenticateCurrentUser(data.password);
      if (reauthenticatedUser) {
        if (data.userEmail !== currentEmail)
          emailSuccess = await changeAccountEmail(data.userEmail);
        if (!_.isEmpty(data.newPassword))
          passwordSuccess = await changeAccountPassword(data.newPassword);
      } else {
        alert(
          'Failed to save account settings.\n\n' +
            "Please check that you're inputting your current password correctly."
        );
        return;
      }
    }

    const userInfo = {
      firstname: data.firstName,
      lastname: data.lastName,
      phone: data.userPhone,
    };

    let infoSuccess = await updateAccountInfo(userInfo);

    console.log('Info success: ', infoSuccess);
    console.log('Email success: ', emailSuccess);
    if (infoSuccess && emailSuccess && passwordSuccess)
      setTimeout(() => navigate('/user/account'), 500);
    else console.error('Updating account failed.');
  }

  useEffect(() => {
    async function getAuthState() {
      const authenticated = await isUserAuthenticated();
      setIsAuthed(authenticated);
      if (!authenticated) navigate('/*');
    }
    getAuthState();
  }, [navigate]);

  if (!pageReady || !isAuthed) return null;

  return (
    <div id="account-settings-container">
      <div id="company-name-container">
        <h1>
          My<span style={{ color: '#75af96' }}>PetTag</span>
        </h1>
        <img className="logo" src={logo} alt="MyPetTag" width={55} height={55} />
      </div>
      <div id="settings-title-container">
        <h1 id="settings-title">Account Settings</h1>
        <p id="settings-title-sub">
          Edit account and security settings.
        </p>
      </div>
      <form id="settings-form" onSubmit={handleSubmit(formSubmit)}>
        <span style={{ color: '#ff0000' }}>* indicates a required field</span>
        <br/>
        <label>First Name</label>
        <div className="error-container">
          {errors.firstName && _.get(errors, 'firstName.message')}
        </div>
        <input
          className="form-input"
          type="text"
          {...register('firstName', {
            required: 'First Name cannot be blank.',
          })}
        />
        <label>Last Name</label>
        <div className="error-container">
          {errors.firstName && _.get(errors, 'firstName.message')}
        </div>
        <input
          className="form-input"
          type="text"
          {...register('lastName', {
            required: 'Last Name cannot be blank.',
          })}
        />
        <label>Phone</label>
        <div className="error-container">{_.get(errors, 'userPhone.message')}</div>
        <input
          className="form-input"
          type="tel"
          placeholder="Phone Number"
          {...register('userPhone', {
            pattern: {
              value: Patterns.PHONE_REGEX,
              message: 'Enter a valid phone number.',
            },
            required: 'Phone cannot be blank.',
          })}
        />
        <label>Email</label>
        <div className="error-container">{_.get(errors, 'userEmail.message')}</div>
        <input
          className="form-input"
          type="email"
          placeholder="email@example.com"
          {...register('userEmail', {
            pattern: {
              value: Patterns.EMAIL_REGEX,
              message: 'Enter a valid email.',
            },
          })}
        />
        <label>
          Change Password{' '}
          <FontAwesomeIcon icon={faCircleQuestion} onClick={() => setShowPasswordModal(true)} />
        </label>
        <div className="error-container">{_.get(errors, 'newPassword.message')}</div>
        <input
          className="form-input"
          type="password"
          placeholder="New Password"
          {...register('newPassword', {
            pattern: {
              value: Patterns.PASSWORD_REGEX,
              message: 'Password does not fit requirements.',
            },
          })}
        />
        <div className="error-container">{_.get(errors, 'confirmPassword.message')}</div>
        <input
          className="form-input"
          type="password"
          placeholder="Confirm Password"
          {...register('confirmPassword', {
            validate: (confirmPass) => {
              let newPass = watch('newPassword');
              if ((newPass !== '' || confirmPass !== '') && newPass !== confirmPass) {
                return 'Passwords do not match.';
              }
            },
          })}
        />
        {(watch('userEmail') !== currentEmail || !_.isEmpty(watch('newPassword'))) && (
          <>
            <label>Current Password <span style={{ color: '#ff0000' }}>*</span></label>
            <div className="error-container">{_.get(errors, 'password.message')}</div>
            <input
              className="form-input"
              type="password"
              placeholder="Current Password"
              {...register('password', {
                validate: (currentPassword) => {
                  let email = watch('userEmail');
                  let newPassword = watch('newPassword');

                  if (
                    (email !== currentEmail || !_.isEmpty(newPassword)) &&
                    _.isEmpty(currentPassword)
                  )
                    return 'Current password is required.';
                },
              })}
            />
          </>
        )}
        <div id="account-edit-btns">
          <button id="cancel-btn" type="button" onClick={() => navigate('/user/account')}>
            Cancel
          </button>
          <input id="save-btn" type="submit" value="Save" />
        </div>
      </form>
      <PasswordModal showModal={showPasswordModal} setShowModal={setShowPasswordModal} />
    </div>
  );
};

export default AccountSettings;
