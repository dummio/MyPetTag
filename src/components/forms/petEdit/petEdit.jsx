/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useEffect, useState, useRef } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  getPetBreeds,
  getPetData,
  isUserAuthenticated,
  authStateChangedWrapper,
  updatePetInDatabase,
} from '../../../firebaseCommands';
import { storage } from '../../../firebase-config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
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
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
// For cropping
import CropEasy from '../../crop/CropEasy';

/**
 * Displays Pet Profile Information that is editable by the user.
 * Once the user saves changes it writes the new changes to
 * firebase and updates the pet profile.
 *
 * @returns HTML Element
 */
const PetEdit = () => {
  // Render States
  const [pageReady, setPageReady] = useState(false);
  const [petInfoHide, setPetInfoHide] = useState(true);
  const [petHealthHide, setPetHealthHide] = useState(false);
  const [petBehaviorHide, setPetBehaviorHide] = useState(false);
  const [petVetHide, setPetVetHide] = useState(false);
  const [openCrop, setOpenCrop] = useState(false);

  // Component States
  const [isAuthed, setIsAuthed] = useState(null);
  const [userID, setUserID] = useState(undefined);
  const [petID, setPetID] = useState(undefined);
  const [petName, setPetName] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function getAuthState() {
      const authenticated = await isUserAuthenticated();
      console.log(authenticated);
      setIsAuthed(authenticated);
      if (!authenticated) navigate('/*');
    }
    getAuthState();
  }, [navigate]);

  async function getInitialValues() {
    const uID = await authStateChangedWrapper();
    const pID = Number(window.location.pathname.split('/')[3]);
    setPetID(pID);
    setUserID(uID);
    try {
      const petData = await getPetData(uID, pID, [
        'name',
        'species',
        'breed',
        'descr',
        'birthDate',
        'weight',
        'sex',
        'imageUrl',
        'contacts', // TODO: Currently {Name: ... Phone: ...}
        'addr',
        'vaccines',
        'conds',
        'meds',
        'allergies',
        'healthInfo',
        'aggressions',
        'goodWith',
        'behavior',
        'vets', // {addr:..., clinicName:..., microhipId:..., phone:..., vetName:...}
      ]);

      setPetName(petData['name'] ?? '{NO_NAME_FOUND}');

      if (petData['imageUrl']) {
        setOriginalImage(petData['imageUrl']);
        setPhotoURL(petData['imageUrl']);
      }

      setPageReady(true);
      return {
        petName: petData['name'],
        petSpecies: { label: petData['species'], value: petData['species'] },
        petBreed: { label: petData['breed'], value: petData['breed'] },
        petDescription: petData['descr'],
        petSex: { label: petData['sex'], value: petData['sex'] },
        petBirthday: petData['birthDate'],
        petWeight: petData['weight'],
        contactName: petData['contacts']['Name'],
        contactPhone: petData['contacts']['Phone'],
        address: petData['addr'],
        petVaccines: petData['vaccines']?.map((vaccine) => ({
          label: vaccine,
          value: vaccine,
        })),
        petHealth: petData['conds']?.map((vaccine) => ({
          label: vaccine,
          value: vaccine,
        })),
        petMedications: petData['meds']?.map((vaccine) => ({
          label: vaccine,
          value: vaccine,
        })),
        petAllergies: petData['allergies']?.map((vaccine) => ({
          label: vaccine,
          value: vaccine,
        })),
        healthDescription: petData['healthInfo'],
        petAggressions: petData['aggressions']?.map((vaccine) => ({
          label: vaccine,
          value: vaccine,
        })),
        petGoodWith: petData['goodWith']?.map((vaccine) => ({
          label: vaccine,
          value: vaccine,
        })),
        behaviorDescription: petData['behavior'],
        clinicName: petData['vets']['clinicName'],
        clinicAddress: petData['vets']['addr'],
        clinicPhone: petData['vets']['phone'],
        vetName: petData['vets']['vetName'],
        microchipID: petData['vets']['microchipId'],
      };
    } catch (error) {
      console.error('Error retrieving pet data:\n', error);
      return {};
    }
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

  // Option Arrays
  const emptyOptions = [];
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
      const dogBreeds = await getPetBreeds('Dog');
      if (dogBreeds) {
        setDogBreeds(dogBreeds);
      }
    }
    async function fetchCatBreedInfo() {
      const catBreeds = await getPetBreeds('Cat');
      if (catBreeds) {
        setCatBreeds(catBreeds);
      }
    }

    fetchDogBreedInfo();
    fetchCatBreedInfo();
  }, []);

  const petSpecies = watch('petSpecies');
  useEffect(() => {
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
    const pet = {
      petID: petID,
      name: data.petName,
      species: data.petSpecies.value,
      breed: data.petBreed.value,
      descr: data.petDescription,
      birthDate: data.petBirthday,
      weight: data.petWeight,
      sex: data.petSex.value,
      addr: data.address,
      vaccines: data.petVaccines?.map((item) => item.value) ?? null,
      conds: data.petHealth?.map((item) => item.value) ?? null,
      meds: data.petMedications?.map((item) => item.value) ?? null,
      allergies: data.petAllergies?.map((item) => item.value) ?? null,
      healthInfo: data.healthDescription,
      aggressions: data.petAggressions?.map((item) => item.value) ?? null,
      goodWith: data.petGoodWith?.map((item) => item.value) ?? null,
      behavior: data.behaviorDescription ?? null,
      contacts: { Name: data.contactName, Phone: data.contactPhone },
      vets: {
        addr: data.clinicAddress,
        clinicName: data.clinicName,
        microchipId: data.microchipID,
        phone: data.clinicPhone,
        vetName: data.vetName,
      },
      imageUrl: photoURL,
    };

    if (image) {
      // TODO: Come up with better naming scheme
      const imgName = petName + (Math.random() + 1).toString(36).substring(2);
      const imageRef = ref(storage, imgName);
      uploadBytes(imageRef, image)
        .then(() => {
          getDownloadURL(imageRef)
            .then((url) => {
              setPhotoURL(url);
              pet.imageUrl = url;
              updatePetInDatabase(pet)
                .then((success) => {
                  const path = `/user/${userID}/account`;
                  setTimeout(navigate(path, { replace: true }), 1000);
                })
                .catch((err) => {
                  console.error(err);
                });
            })
            .catch((error) => {
              console.log('Error when uploading image: ', error);
            });
        })
        .catch((error) => {
          console.log('Error when uploading image: ', error);
        });
    } else {
      updatePetInDatabase(pet)
        .then((success) => {
          if (success) {
            const path = `/user/${userID}/account`;
            setTimeout(navigate(path, { replace: true }), 1000);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  const UploadImage = (e) => {
    e.preventDefault();
    let file = e.target.files[0];

    if (file && file.type.startsWith('image/')) {
      let img = URL.createObjectURL(file);
      /* The cropper only displays if the selected file has changed.
       * If the user selects the same file, the cropper wouldn't open,
       * but we want it to open, so we set the file name value to null. */
      document.getElementById('file-btn').value = null;

      setImage(file);
      setPhotoURL(URL.createObjectURL(file));
      setOpenCrop(true);

      /* The dialog defaults to only image types, but users can upload
       * a non-image file anyways, so this displays an error message. */
    } else if (file && !file.type.startsWith('image/')) {
      alert('Only image file types are supported.');
    }
  };

  const ClearImage = () => {
    // e.preventDefault();
    setImage(null);
    setOriginalImage(null);
    setPhotoURL(null);
    setOpenCrop(false);
    let profileImage = document.getElementById('pet-img');
    profileImage.src = defaultProfileImage;
  };

  const fileInputRef = useRef(null);

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Render nothing until we have a response for the pet's information
  if (!pageReady || !isAuthed) return null;
  else
    return (
      <div id='edit-container'>
        <img className='logo' src={logo} alt='MyPetTag' width={250} height={250} />
        <div className='company-title'>
          My<span style={{ color: '#75af96' }}>PetTag</span>
        </div>
        {/* Conditionally render CropEasy */}
        {openCrop && <CropEasy {...{ photoURL, openCrop, setOpenCrop, setPhotoURL, setImage }} />}
        <form id='edit-form' onSubmit={handleSubmit(formSubmit)}>
          <h1 id='edit-form-title'>Editing {petName}</h1>
          <h2>
            Pet Information{' '}
            <FontAwesomeIcon
              style={{
                fontSize: '20px',
                paddingRight: '15px',
                cursor: 'pointer',
              }}
              icon={petInfoHide ? faChevronDown : faChevronRight}
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
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : originalImage
                      ? originalImage
                      : defaultProfileImage
                  }
                  alt='profile-img'
                  width={157}
                  height={157}
                />
              </div>
              <input
                id='file-btn'
                ref={fileInputRef}
                className='form-input-file'
                type='file'
                accept='image/*'
                title=' '
                onChange={UploadImage}
                style={{ display: 'none' }}
              />
              <input
                id='clear-image-btn'
                type='button'
                value='Upload Image'
                onClick={triggerFileInput}
              />

              {(image !== null || originalImage !== null) && (
                <input
                  id='clear-image-btn'
                  type='button'
                  value='Clear Image'
                  onClick={ClearImage}
                />
              )}

              <label>Pet Name</label>
              <div className='error-container'>
                {errors.petName && get(errors, 'petName.message')}
              </div>
              <input
                className='form-input'
                type='text'
                {...register('petName', {
                  required: 'Pet Name cannot be blank.',
                })}
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
                {...register('petBirthday', {
                  required: 'Pet Birth Date cannot be blank.',
                })}
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
              <div className='error-container'>
                {errors.petSex && get(errors, 'petSex.message')}
              </div>
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
              icon={petHealthHide ? faChevronDown : faChevronRight}
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
              icon={petBehaviorHide ? faChevronDown : faChevronRight}
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
              icon={petVetHide ? faChevronDown : faChevronRight}
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
            <button id='cancel-btn' type='button' onClick={() => navigate('../../account/')}>
              Cancel
            </button>
            <input id='save-btn' type='submit' value='Save' />
          </div>
        </form>
      </div>
    );
};

export default PetEdit;
