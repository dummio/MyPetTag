/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { useForm, Controller } from 'react-hook-form';
import { getDogBreeds, getCatBreeds } from '../../../firebaseCommands';
import { Patterns } from '../../../constants';
import get from 'lodash/get';

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

  async function getInitialValues() {
    return {
      petName: 'DefaultName',
      petSpecies: { label: 'Dog', value: 'Dog' },
      petBreed: { label: 'beagle', value: 'beagle' },
      petDescription: 'DefaultDesc',
      petSex: { label: 'Male', value: 'Male' },
      petBirthday: '1970-01-01',
      petWeight: '69',
      contactName: 'DefaultContact',
      contactPhone: '+1(801)555-1234',
      address: '123 Main St. SLC, UT, 84101',
      petVaccines: [
        { label: 'COVID-19', value: 'COVID-19' },
        { label: 'HIV', value: 'HIV' },
      ],
      petHealth: [
        { label: 'diabetes', value: 'diabetes' },
        { label: 'epilepsy', value: 'epilepsy' },
      ],
      petMedications: [
        { label: 'Tylenol', value: 'Tylenol' },
        { label: 'Cannabis', value: 'Cannabis' },
      ],
      petAllergies: [
        { label: 'Humans', value: 'Humans' },
        { label: 'Dogs', value: 'Dogs' },
      ],
      healthDescription: 'Tends to sleep all day.',
      petAggressions: [
        { label: 'Women', value: 'Women' },
        { label: 'Children', value: 'Children' },
      ],
      petGoodWith: [
        { label: 'Men', value: 'Men' },
        { label: 'Cats', value: 'Cats' },
      ],
      behaviorDescription: 'Does not get along with the fax machine.',
      clinicName: 'Default Clinic',
      clinicAddress: '123 Pet Way SLC, UT, 84101',
      clinicPhone: '+1(801)555-6969',
      vetName: 'Default Vet',
      microchipID: '1234-234-1234',
    };
  }

  const {
    control,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    defaultValues: getInitialValues,
  });

  // Temp Array
  const PetTypes = [
    { value: 'Dog', label: 'Dog' },
    { value: 'Cat', label: 'Cat' },
    { value: 'Other', label: 'Other' },
  ];
  const [CatBreeds, setCatBreeds] = useState([]);
  const [DogBreeds, setDogBreeds] = useState([]);
  const [PetBreeds, setPetBreeds] = useState([]);
  const PetSex = [
    { value: 'Male', label: 'Male' },
    { value: 'Neutered Male', label: 'Neutered Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Spayed Female', label: 'Spayed Female' },
  ];
  const PetAggressions = [
    { value: 'Men', label: 'Men' },
    { value: 'Women', label: 'Women' },
    { value: 'Children', label: 'Children' },
    { value: 'Cats', label: 'Cats' },
    { value: 'Dogs', label: 'Dogs' },
    { value: 'Other', label: 'Other' },
  ];
  const PetGoodWith = [
    { value: 'Men', label: 'Men' },
    { value: 'Women', label: 'Women' },
    { value: 'Children', label: 'Children' },
    { value: 'Cats', label: 'Cats' },
    { value: 'Dogs', label: 'Dogs' },
    { value: 'Other', label: 'Other' },
  ];

  useEffect(() => {
    async function fetchDogBreedInfo() {
      const dogBreeds = await getDogBreeds();
      if (dogBreeds) {
        setDogBreeds(dogBreeds);
        console.log(dogBreeds);
      }
    }
    async function fetchCatBreedInfo() {
      const catBreeds = await getCatBreeds();
      if (catBreeds) {
        setCatBreeds(catBreeds);
        console.log(catBreeds);
      }
    }
    fetchDogBreedInfo();
    fetchCatBreedInfo();
  }, []);

  const petSpecies = watch('petSpecies');
  useEffect(() => {
    console.log(petSpecies);
    let selectedSpecies = get(petSpecies, 'value');
    if (selectedSpecies === 'Dog') {
      setPetBreeds(DogBreeds);
    } else if (selectedSpecies === 'Cat') {
      setPetBreeds(CatBreeds);
    } else {
      setPetBreeds([]);
    }
  }, [petSpecies, CatBreeds, DogBreeds]);

  function formSubmit(data) {
    console.log(errors);
  }

  // Temp Info
  const pet = 'pet-name';
  const emptyOptions = [];

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
      <form id='edit-form' onSubmit={handleSubmit(formSubmit)}>
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
            <div className='error-container'>
              {errors.petName && get(errors, 'petName.message')}
            </div>
            <input
              className='form-input'
              type='text'
              {...register('petName', { required: 'Pet Name cannot be blank.' })}
            />
            <label>Pet Species</label>
            <div className='error-container'>
              {errors.petSpecies && get(errors, 'petSpecies.message')}
            </div>
            <Controller
              name='petSpecies'
              control={control}
              rules={{ required: 'Pet Species cannot be blank.' }}
              render={({ field }) => (
                <Select
                  {...field}
                  isClearable
                  isSearchable
                  closeMenuOnSelect={true}
                  styles={SelectStyles}
                  options={PetTypes}
                />
              )}
            />
            <label>Pet Breed</label>
            <div className='error-container'>
              {errors.petBreed && get(errors, 'petBreed.message')}
            </div>
            <Controller
              name='petBreed'
              control={control}
              rules={{ required: 'Pet Breed cannot be blank.' }}
              render={({ field }) => (
                <CreatableSelect
                  {...field}
                  isClearable
                  isSearchable
                  closeMenuOnSelect={true}
                  styles={SelectStyles}
                  options={PetBreeds}
                />
              )}
            />
            <label>Pet Description</label>
            <div className='error-container'>
              {errors.petDescription && get(errors, 'petDescription.message')}
            </div>
            <textarea
              className='form-textarea'
              placeholder='Please give a brief introduction about your pet?'
              rows={5}
              cols={50}
              {...register('petDescription')}
            />
            <label>Pet Birth Date</label>
            <div className='error-container'>
              {errors.petBirthday && get(errors, 'petBirthday.message')}
            </div>
            <input
              className='form-input'
              type='date'
              style={{ appearance: 'textfield' }}
              {...register('petBirthday', { required: 'Pet Birth Date cannot be blank.' })}
            />
            <label>Pet Weight</label>
            <div className='error-container'>
              {errors.petWeight && get(errors, 'petWeight.message')}
            </div>
            <input
              className='form-input'
              type='number'
              step='1'
              {...register('petWeight', {
                required: 'Pet Weight cannot be blank.',
                min: {
                  value: 1,
                  message: 'Enter a valid weight.',
                },
                max: {
                  value: 400,
                  message: 'Enter a valid weight',
                },
              })}
              style={{ appearance: 'textfield' }}
            />
            <label>Pet Sex</label>
            <div className='error-container'>{errors.petSex && get(errors, 'petSex.message')}</div>
            <Controller
              name='petSex'
              control={control}
              rules={{ required: 'Pet Sex cannot be blank.' }}
              render={({ field }) => (
                <Select
                  {...field}
                  isClearable
                  isSearchable
                  closeMenuOnSelect={true}
                  styles={SelectStyles}
                  options={PetSex}
                />
              )}
            />
            <div id='form-contacts-container'>
              <label>Contacts</label>
              <FontAwesomeIcon icon={faPlus} style={{ height: '25px' }} />
            </div>
            {/* {TODO: Wrap in map to dynamically add more contacts} */}
            <div className='error-container'>
              {errors.contactName && get(errors, 'contactName.message')}
            </div>
            <input
              className='form-input'
              type='text'
              placeholder='Name'
              {...register('contactName')} // TODO: Adapt for multiple contacts
            />
            <div className='error-container'>
              {errors.contactPhone && get(errors, 'contactPhone.message')}
            </div>
            <input
              className='form-input'
              type='tel'
              placeholder='Phone Number'
              {...register('contactPhone', {
                pattern: {
                  value: Patterns.PHONE_REGEX,
                  message: 'Enter a valid phone number.',
                },
              })} // TODO: Adapt for multiple contacts
            />
            {/*------------------------------------------------------------------*/}
            <label>Address</label>
            <div className='error-container'>
              {errors.address && get(errors, 'contactPhone.message')}
            </div>
            <input
              className='form-input'
              type='text'
              name='address'
              {...register('address')}
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
            <div className='error-container'>
              {errors.petVaccines && get(errors, 'petVaccines.message')}
            </div>
            <Controller
              name='petVaccines'
              control={control}
              render={({ field }) => (
                <CreatableSelect
                  {...field}
                  isMulti
                  isClearable
                  isSearchable
                  closeMenuOnSelect={false}
                  placeholder='Select all that apply...'
                  styles={SelectMultiStyles}
                  options={emptyOptions}
                />
              )}
            />
            <label>Health Conditions</label>
            <div className='error-container'>
              {errors.petHealth && get(errors, 'petHealth.message')}
            </div>
            <Controller
              name='petHealth'
              control={control}
              render={({ field }) => (
                <CreatableSelect
                  {...field}
                  isMulti
                  isClearable
                  isSearchable
                  closeMenuOnSelect={false}
                  placeholder='Select all that apply...'
                  styles={SelectMultiStyles}
                  options={emptyOptions}
                />
              )}
            />
            <label>Medications</label>
            <div className='error-container'>
              {errors.petMedications && get(errors, 'petMedications.message')}
            </div>
            <Controller
              name='petMedications'
              control={control}
              render={({ field }) => (
                <CreatableSelect
                  {...field}
                  isMulti
                  isClearable
                  isSearchable
                  closeMenuOnSelect={false}
                  placeholder='Select all that apply...'
                  styles={SelectMultiStyles}
                  options={emptyOptions}
                />
              )}
            />
            <label>Allergies</label>
            <div className='error-container'>
              {errors.petAllergies && get(errors, 'petAllergies.message')}
            </div>
            <Controller
              name='petAllergies'
              control={control}
              render={({ field }) => (
                <CreatableSelect
                  {...field}
                  isMulti
                  isClearable
                  isSearchable
                  closeMenuOnSelect={false}
                  placeholder='Select all that apply...'
                  styles={SelectMultiStyles}
                  options={emptyOptions}
                />
              )}
            />
            <label>Additional Information</label>
            <div className='error-container'>
              {errors.healthDescription && get(errors, 'healthDescription.message')}
            </div>
            <textarea
              className='form-textarea'
              rows={5}
              cols={50}
              name='healthDescription'
              {...register('healthDescription')}
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
            <div className='error-container'>
              {errors.petAggressions && get(errors, 'petAggressions.message')}
            </div>
            <Controller
              name='petAggressions'
              control={control}
              render={({ field }) => (
                <CreatableSelect
                  {...field}
                  isMulti
                  isClearable
                  isSearchable
                  closeMenuOnSelect={false}
                  placeholder='Select all that apply...'
                  styles={SelectMultiStyles}
                  options={PetAggressions}
                />
              )}
            />
            <label>Good With</label>
            <div className='error-container'>
              {errors.petGoodWith && get(errors, 'petGoodWith.message')}
            </div>
            <Controller
              name='petGoodWith'
              control={control}
              render={({ field }) => (
                <CreatableSelect
                  {...field}
                  isMulti
                  isClearable
                  isSearchable
                  closeMenuOnSelect={false}
                  placeholder='Select all that apply...'
                  styles={SelectMultiStyles}
                  options={PetGoodWith}
                />
              )}
            />
            <label>Additional Information</label>
            <div className='error-container'>
              {errors.behaviorDescription && get(errors, 'behaviorDescription.message')}
            </div>
            <textarea
              className='form-textarea'
              rows={5}
              cols={50}
              {...register('behaviorDescription')}
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
            <div className='error-container'>
              {errors.clinicName && get(errors, 'contactPhone.clinicName')}
            </div>
            <input
              className='form-input'
              type='text'
              placeholder='Clinic Name'
              {...register('clinicName')}
            />
            <div className='error-container'>
              {errors.clinicAddress && get(errors, 'contactPhone.clinicAddress')}
            </div>
            <input
              className='form-input'
              type='text'
              placeholder='Clinic Address'
              {...register('clinicAddress')}
            />
            <div className='error-container'>
              {errors.clinicPhone && get(errors, 'clinicPhone.message')}
            </div>
            <input
              className='form-input'
              type='tel'
              placeholder='Clinic Phone #'
              {...register('clinicPhone', {
                pattern: {
                  value: Patterns.PHONE_REGEX,
                  message: 'Enter a valid phone number.',
                },
              })}
            />
            <div className='error-container'>
              {errors.vetName && get(errors, 'vetName.message')}
            </div>
            <input
              className='form-input'
              type='text'
              placeholder='Vet Name'
              {...register('vetName')}
            />
            <div className='error-container'>
              {errors.microchipID && get(errors, 'microchipID.message')}
            </div>
            <input
              className='form-input'
              type='text'
              placeholder='Microchip ID'
              {...register('microchipID')}
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
