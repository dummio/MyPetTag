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
  const [isAuthed, setIsAuthed] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentEmail, setCurrentEmail] = useState();

  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
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

        return {
          firstName: userDoc.firstname,
          lastName: userDoc.lastname,
          userPhone: userDoc.phone,
          userEmail: email,
          zipcode: userDoc.zipcode ?? '',
        };
      }
      return {};
    } catch (error) {
      console.error('Error retrieving pet data:\n', error);
      return {};
    }
  }

  function formSubmit(data) {
    return new Promise((resolve) => {
      const Status = {
        AUTH_ERROR: 'AUTH_ERROR',
        UPDATE_ERROR: 'UPDATE_ERROR',
        SUCCESS: 'SUCCESS',
      };

      const updateChanges = async (data) => {
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
            return Status.AUTH_ERROR;
          }
        }

        const userInfo = {
          firstname: data.firstName,
          lastname: data.lastName,
          phone: data.userPhone,
          zipcode: data.zipcode,
        };

        let infoSuccess = await updateAccountInfo(userInfo);

        return infoSuccess && emailSuccess && passwordSuccess
          ? Status.SUCCESS
          : Status.UPDATE_ERROR;
      };

      updateChanges(data).then((rc) => {
        switch (rc) {
          case Status.AUTH_ERROR:
            alert(
              'Failed to save account settings.\n\n' +
                "Please check that you're inputting your current password correctly."
            );
            resolve();
            break;
          case Status.UPDATE_ERROR:
            console.error('Updating account failed.');
            resolve();
            break;
          default:
          case Status.SUCCESS:
            setTimeout(() => navigate('/user/account'), 500);
        }
      });
    });
  }

  useEffect(() => {
    async function getAuthState() {
      const authenticated = await isUserAuthenticated();
      setIsAuthed(authenticated);
      if (!authenticated) navigate('/*');
    }
    getAuthState();
  }, [navigate]);

  if (!isAuthed || isLoading) return null;

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
        <p id="settings-title-sub">Edit account and security settings.</p>
      </div>
      <form id="settings-form" onSubmit={handleSubmit(formSubmit)}>
        <span style={{ color: '#ff0000' }}>* indicates a required field</span>
        <br />
        <label>
          First Name<span style={{ color: '#ff0000' }}>*</span>
        </label>
        <div className="error-container">
          {errors.firstName && _.get(errors, 'firstName.message')}
        </div>
        <input
          className="form-input"
          type="text"
          autoComplete='given-name'
          {...register('firstName', {
            required: 'First Name cannot be blank.',
          })}
        />
        <label>
          Last Name<span style={{ color: '#ff0000' }}>*</span>
        </label>
        <div className="error-container">
          {errors.firstName && _.get(errors, 'firstName.message')}
        </div>
        <input
          className="form-input"
          type="text"
          autoComplete='family-name'
          {...register('lastName', {
            required: 'Last Name cannot be blank.',
          })}
        />
        <label>
          Phone<span style={{ color: '#ff0000' }}>*</span>
        </label>
        <div className="error-container">{_.get(errors, 'userPhone.message')}</div>
        <input
          className="form-input"
          type="tel"
          placeholder="Phone Number"
          autoComplete="tel"
          {...register('userPhone', {
            pattern: {
              value: Patterns.PHONE_REGEX,
              message: 'Enter a valid phone number.',
            },
            required: 'Phone cannot be blank.',
          })}
        />
        <label>
          Email<span style={{ color: '#ff0000' }}>*</span>
        </label>
        <div className="error-container">{_.get(errors, 'userEmail.message')}</div>
        <input
          className="form-input"
          type="email"
          placeholder="email@example.com"
          autoComplete="email"
          {...register('userEmail', {
            pattern: {
              value: Patterns.EMAIL_REGEX,
              message: 'Enter a valid email.',
            },
          })}
        />
        <label>Zip Code</label>
        <p className="label-subtext">For MyPetTag lost pet alert network.</p>
        <div className="error-container">{errors.address && _.get(errors, 'zipcode.message')}</div>
        <input
          className="form-input"
          type="text"
          placeholder="12345"
          autoComplete="postal-code"
          {...register('zipcode', {
            pattern: {
              value: Patterns.ZIPCODE_REGEX,
              message: 'Enter a valid zip code.',
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
          autoComplete="new-password"
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
          autoComplete="new-password"
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
            <label>
              Current Password <span style={{ color: '#ff0000' }}>*</span>
            </label>
            <div className="error-container">{_.get(errors, 'password.message')}</div>
            <input
              className="form-input"
              type="password"
              placeholder="Current Password"
              autoComplete="current-password"
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
          <input id="save-btn" type="submit" value="Save" disabled={isSubmitting} />
        </div>
      </form>
      <PasswordModal showModal={showPasswordModal} setShowModal={setShowPasswordModal} />
    </div>
  );
};

export default AccountSettings;
