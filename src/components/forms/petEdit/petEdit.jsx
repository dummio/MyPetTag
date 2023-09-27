/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import useForm from '../../../Hooks/useForm';

// Import CSS
import './petEdit.css';
import logo from '../../../images/paw.png';
import defaultProfileImage from '../../../images/profile-default.png';
import SelectStyles from '../selectStyles/selectStyles';
import SelectMultiStyles from '../selectStyles/selectMultiStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

/**
 * Displays Pet Profile Information that is editable by the user.
 * Once the user saves changes it writes the new changes to
 * firebase and updates the pet profile.
 *
 * @returns HTML Element
 */
const PetEdit = () => {
  // Render States
  const [petInfoHide, setPetInfoHide] = useState(true);
  const [petHealthHide, setPetHealthHide] = useState(false);
  const [petBehaviorHide, setPetBehaviorHide] = useState(false);
  const [petVetHide, setPetVetHide] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);

  function formSubmit() {
    console.debug(values, errors);
    if (canSubmit) {
      console.debug('Success!');
    }
    return null;
  }

  const { handleChange, values, errors, handleSubmit, setValue } = useForm(formSubmit);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && Object.keys(values).length !== 0) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
    console.debug(values, errors);
  }, [values, errors]);

  // Temp Array
  const options = [];

  // Temp Name
  const pet = 'pet-name';

  const UploadImage = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    let image = URL.createObjectURL(file);
    let profileImage = document.getElementById('pet-img');
    profileImage.src = image;
  };

  return (
    <div id='edit-container'>
      <img className='logo' src={logo} alt='MyPetTag' width={250} height={250} />
      <div className='company-title'>
        My<span style={{ color: '#75af96' }}>PetTag</span>
      </div>
      <form id='edit-form' onSubmit={handleSubmit}>
        <h1 id='edit-form-title'>Editing {pet}</h1>
        <h2>
          Pet Information{' '}
          <FontAwesomeIcon
            style={{
              fontSize: '20px',
              paddingRight: '15px',
              cursor: 'pointer',
            }}
            icon={faChevronDown}
            onClick={() => {
              setPetInfoHide(!petInfoHide);
            }}
          />
        </h2>
        {petInfoHide && (
          <>
            <label>Upload Pet Picture</label>
            <div id='pet-img-container'>
              <img
                id='pet-img'
                src={defaultProfileImage}
                alt='profile-img'
                width={157}
                height={157}
              />
            </div>
            <input
              className='form-input-file'
              type='file'
              accept='image/*'
              onChange={UploadImage}
            />
            <label>Pet Name</label>
            <div className='error-container'>{errors.petName}</div>
            <input
              className='form-input'
              type='text'
              required
              name='petName'
              onChange={handleChange}
            />
            <label>Pet Species</label>
            <div className='error-container'>{errors.petSpecies}</div>
            <Select
              isClearable
              isSearchable
              closeMenuOnSelect={true}
              styles={SelectStyles}
              options={options}
              onChange={(e) => setValue('petSpecies', e?.value, false)}
            />
            <label>Pet Breed</label>
            <div className='error-container'>{errors.petBreed}</div>
            <CreatableSelect
              isClearable
              isSearchable
              closeMenuOnSelect={true}
              styles={SelectStyles}
              options={options}
              onChange={(e) => setValue('petBreed', e?.value, false)}
            />
            <label>Pet Description</label>
            <div className='error-container'>{errors.petDescription}</div>
            <textarea
              className='form-textarea'
              rows={5}
              cols={50}
              name='petDescription'
              onChange={handleChange}
            />
            <label>Pet Age</label>
            <div className='error-container'>{errors.petDoB}</div>
            <input
              className='form-input'
              type='date'
              style={{ appearance: 'textfield' }}
              required
              name='petDoB'
              onChange={handleChange}
            />
            <label>Pet Weight</label>
            <div className='error-container'>{errors.petWeight}</div>
            <input
              className='form-input'
              type='number'
              required
              name='weight'
              onChange={handleChange}
              style={{ appearance: 'textfield' }}
            />
            <label>Pet Sex</label>
            <div className='error-container'>{errors.petSex}</div>
            <Select
              isClearable
              isSearchable
              closeMenuOnSelect={true}
              styles={SelectStyles}
              options={options}
              onChange={(e) => setValue('petSex', e?.value, false)}
            />
            <div id='form-contacts-container'>
              <label>Contacts</label>
              <FontAwesomeIcon icon={faPlus} style={{ height: '25px' }} />
            </div>
            {/* {TODO: Wrap in map to dynamically add more contacts} */}
            <div className='error-container'>{errors.contactName}</div>
            <input
              className='form-input'
              type='text'
              placeholder='Name'
              name='contactName' // TODO: Adapt for multiple contacts
              onChange={handleChange}
            />
            <div className='error-container'>{errors.contactPhone}</div>
            <input
              className='form-input'
              type='tel'
              placeholder='Phone Number'
              name='contactPhone' // TODO: Adapt for multiple contacts
              onChange={handleChange}
            />
            {/*------------------------------------------------------------------*/}
            <label>Address</label>
            <div className='error-container'>{errors.address}</div>
            <input
              className='form-input'
              type='text'
              name='address'
              onChange={handleChange}
              placeholder='1234 Park Ave, City, TX 12345'
            />
          </>
        )}
        <h2>
          Health Information{' '}
          <FontAwesomeIcon
            style={{
              fontSize: '20px',
              paddingRight: '15px',
              cursor: 'pointer',
            }}
            icon={faChevronDown}
            onClick={() => {
              setPetHealthHide(!petHealthHide);
            }}
          />
        </h2>
        {petHealthHide && (
          <>
            <label>Vaccines</label>
            <div className='error-container'>{errors.petVaccines}</div>
            <CreatableSelect
              isMulti
              isClearable
              isSearchable
              closeMenuOnSelect={false}
              styles={SelectMultiStyles}
              options={options}
              onChange={(e) => setValue('petVaccines', e?.value, false)}
            />
            <label>Health Conditions</label>
            <div className='error-container'>{errors.petHealth}</div>
            <CreatableSelect
              isMulti
              isClearable
              isSearchable
              closeMenuOnSelect={false}
              styles={SelectMultiStyles}
              options={options}
              onChange={(e) => setValue('petHealth', e?.value, false)}
            />
            <label>Medications</label>
            <div className='error-container'>{errors.petMedications}</div>
            <CreatableSelect
              isMulti
              isClearable
              isSearchable
              closeMenuOnSelect={false}
              styles={SelectMultiStyles}
              options={options}
              onChange={(e) => setValue('petMedications', e?.value, false)}
            />
            <label>Allergies</label>
            <div className='error-container'>{errors.petAllergies}</div>
            <CreatableSelect
              isMulti
              isClearable
              isSearchable
              closeMenuOnSelect={false}
              styles={SelectMultiStyles}
              options={options}
              onChange={(e) => setValue('petAlergies', e?.value, false)}
            />
            <label>Additional Information</label>
            <div className='error-container'>{errors.healthDescription}</div>
            <textarea
              className='form-textarea'
              rows={5}
              cols={50}
              name='healthDescription'
              onChange={handleChange}
            />
          </>
        )}
        <h2>
          Behavior Information{' '}
          <FontAwesomeIcon
            style={{
              fontSize: '20px',
              paddingRight: '15px',
              cursor: 'pointer',
            }}
            icon={faChevronDown}
            onClick={() => {
              setPetBehaviorHide(!petBehaviorHide);
            }}
          />
        </h2>
        {petBehaviorHide && (
          <>
            <label>Aggressions</label>
            <div className='error-container'>{errors.petAggressions}</div>
            <CreatableSelect
              isMulti
              isClearable
              isSearchable
              closeMenuOnSelect={false}
              styles={SelectMultiStyles}
              options={options}
              onChange={(e) => setValue('petAggressions', e?.value, false)}
            />
            <label>Good With</label>
            <div className='error-container'>{errors.petGoodWith}</div>
            <CreatableSelect
              isMulti
              isClearable
              isSearchable
              closeMenuOnSelect={false}
              styles={SelectMultiStyles}
              options={options}
              onChange={(e) => setValue('petGoodWith', e?.value, false)}
            />
            <label>Additional Information</label>
            <div className='error-container'>{errors.behaviorDescription}</div>
            <textarea
              className='form-textarea'
              rows={5}
              cols={50}
              name='behaviorDescription'
              onChange={handleChange}
            />
          </>
        )}
        <h2>
          Vet Information{' '}
          <FontAwesomeIcon
            style={{
              fontSize: '20px',
              paddingRight: '15px',
              cursor: 'pointer',
            }}
            icon={faChevronDown}
            onClick={() => {
              setPetVetHide(!petVetHide);
            }}
          />
        </h2>
        {petVetHide && (
          <>
            <div className='error-container'>{errors.clinicName}</div>
            <input
              className='form-input'
              type='text'
              placeholder='Clinic Name'
              name='clinicName'
              onChange={handleChange}
            />
            <div className='error-container'>{errors.clinicAddress}</div>
            <input
              className='form-input'
              type='text'
              placeholder='Clinic Address'
              name='clinicAddress'
              onChange={handleChange}
            />
            <div className='error-container'>{errors.clinicPhone}</div>
            <input
              className='form-input'
              type='tel'
              placeholder='Clinic Phone #'
              name='clinicPhone'
              onChange={handleChange}
            />
            <div className='error-container'>{errors.vetName}</div>
            <input
              className='form-input'
              type='text'
              placeholder='Vet Name'
              name='vetName'
              onChange={handleChange}
            />
            <div className='error-container'>{errors.microchipID}</div>
            <input
              className='form-input'
              type='text'
              placeholder='Microchip ID'
              name='microchipID'
              onChange={handleChange}
            />
          </>
        )}
        <div id='edit-form-btns'>
          <input id='cancel-btn' type='submit' value='Cancel' />
          <input id='save-btn' type='submit' value='Save' />
        </div>
      </form>
    </div>
  );
};

export default PetEdit;
