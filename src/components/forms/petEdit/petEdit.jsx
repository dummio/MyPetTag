/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React Modules
import React, { useEffect, useState, useRef } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  getPetBreeds,
  getPetData,
  isUserAuthenticated,
  authStateChangedWrapper,
  updatePetInDatabase,
} from "../../../firebaseCommands";
import { storage } from "../../../firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Patterns } from "../../../constants";
import get from "lodash/get";

// Import CSS
import "./petEdit.css";
import logo from "../../../images/paw.png";
import defaultProfileImage from "../../../images/profile-default.png";
import SelectStyles from "../selectStyles/selectStyles";
import SelectMultiStyles from "../selectStyles/selectMultiStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
// For cropping
import CropEasy from "../../crop/CropEasy";

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
  const [petID, setPetID] = useState(undefined);
  const [petName, setPetName] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [pdfURL, setPdfURL] = useState(null);
  const [medicalPDF, setMedicalPDF] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [image, setImage] = useState(null);
  const [prevImage, setPrevImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function getAuthState() {
      const authenticated = await isUserAuthenticated();
      setIsAuthed(authenticated);
      if (!authenticated) navigate("/*");
    }
    getAuthState();
  }, [navigate]);

  async function getInitialValues() {
    try {
      const uID = await authStateChangedWrapper();
      const pID = Number(window.location.pathname.split("/")[3]);
      setPetID(pID);
      const petData = await getPetData(uID, pID, [
        "name",
        "species",
        "breed",
        "descr",
        "birthDate",
        "weight",
        "sex",
        "imageUrl",
        "contacts", // TODO: Currently {Name: ... Phone: ...}
        "addr",
        "vaccines",
        "conds",
        "meds",
        "allergies",
        "healthInfo",
        "aggressions",
        "goodWith",
        "behavior",
        "vets", // {addr:..., clinicName:..., microhipId:..., phone:..., vetName:...}
        "medicalUrl",
      ]);

      setPetName(petData["name"] ?? "{NO_NAME_FOUND}");

      if (petData["imageUrl"]) {
        setOriginalImage(petData["imageUrl"]);
        setPhotoURL(petData["imageUrl"]);
      }

      if (petData["medicalUrl"]) {
        setPdfURL(petData["medicalUrl"]);
      }

      setPageReady(true);
      return {
        petName: petData["name"] ?? "",
        petSpecies:
          { label: petData["species"], value: petData["species"] } ?? {},
        petBreed: { label: petData["breed"], value: petData["breed"] } ?? {},
        petDescription: petData["descr"] ?? "",
        petSex: { label: petData["sex"], value: petData["sex"] } ?? {},
        petBirthday: petData["birthDate"] ?? "",
        petWeight: petData["weight"] ?? 0,
        contacts: petData["contacts"] ?? [],
        address: petData["addr"] ?? "",
        petVaccines: petData["vaccines"]?.map((val) => ({
          label: val,
          value: val,
        })),
        petHealth: petData["conds"]?.map((val) => ({
          label: val,
          value: val,
        })),
        petMedications: petData["meds"]?.map((val) => ({
          label: val,
          value: val,
        })),
        petAllergies: petData["allergies"]?.map((val) => ({
          label: val,
          value: val,
        })),
        healthDescription: petData["healthInfo"] ?? "",
        petAggressions: petData["aggressions"]?.map((val) => ({
          label: val,
          value: val,
        })),
        petGoodWith: petData["goodWith"]?.map((val) => ({
          label: val,
          value: val,
        })),
        behaviorDescription: petData["behavior"] ?? "",
        clinicName: petData["vets"]["clinicName"] ?? "",
        clinicAddress: petData["vets"]["addr"] ?? "",
        clinicPhone: petData["vets"]["phone"] ?? "",
        vetName: petData["vets"]["vetName"] ?? "",
        microchipID: petData["vets"]["microchipId"] ?? "",
      };
    } catch (error) {
      console.error("Error retrieving pet data:\n", error);
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
    mode: "onTouched",
    defaultValues: getInitialValues,
  });

  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "contacts", // unique name for your Field Array
    rules: { minLength: 1 },
  });

  // Option Arrays
  const emptyOptions = [];
  const PetTypes = [
    { value: "Dog", label: "Dog" },
    { value: "Cat", label: "Cat" },
    { value: "Other", label: "Other" },
  ];
  const [CatBreeds, setCatBreeds] = useState([]);
  const [DogBreeds, setDogBreeds] = useState([]);
  const [PetBreeds, setPetBreeds] = useState([]);
  const PetSex = [
    { value: "Male", label: "Male" },
    { value: "Neutered Male", label: "Neutered Male" },
    { value: "Female", label: "Female" },
    { value: "Spayed Female", label: "Spayed Female" },
  ];
  const PetAggressions = [
    { value: "Men", label: "Men" },
    { value: "Women", label: "Women" },
    { value: "Children", label: "Children" },
    { value: "Cats", label: "Cats" },
    { value: "Dogs", label: "Dogs" },
    { value: "Other", label: "Other" },
  ];
  const PetGoodWith = [
    { value: "Men", label: "Men" },
    { value: "Women", label: "Women" },
    { value: "Children", label: "Children" },
    { value: "Cats", label: "Cats" },
    { value: "Dogs", label: "Dogs" },
    { value: "Other", label: "Other" },
  ];

  useEffect(() => {
    async function fetchDogBreedInfo() {
      const dogBreeds = await getPetBreeds("Dog");
      if (dogBreeds) {
        setDogBreeds(dogBreeds);
      }
    }
    async function fetchCatBreedInfo() {
      const catBreeds = await getPetBreeds("Cat");
      if (catBreeds) {
        setCatBreeds(catBreeds);
      }
    }

    fetchDogBreedInfo();
    fetchCatBreedInfo();
  }, []);

  const petSpecies = watch("petSpecies");
  useEffect(() => {
    let selectedSpecies = get(petSpecies, "value");
    if (selectedSpecies === "Dog") {
      setPetBreeds(DogBreeds);
    } else if (selectedSpecies === "Cat") {
      setPetBreeds(CatBreeds);
    } else {
      setPetBreeds([]);
    }
  }, [petSpecies, CatBreeds, DogBreeds]);

  const UploadFile = async (file, fileName) => {
    if (file) {
      const fileRef = ref(storage, fileName);
      try {
        await uploadBytes(fileRef, file);
        const downloadURL = await getDownloadURL(fileRef);
        return downloadURL;
      } catch (error) {
        console.log("Error uploading file: ", error);
        return "";
      }
    }
    return "";
  };

  async function formSubmit(data) {
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
      contacts: data.contacts,
      vets: {
        addr: data.clinicAddress,
        clinicName: data.clinicName,
        microchipId: data.microchipID,
        phone: data.clinicPhone,
        vetName: data.vetName,
      },
      imageUrl: photoURL,
      medicalUrl: pdfURL,
    };

    const imgName =
      "image_" + petName + (Math.random() + 1).toString(36).substring(2);
    let petImageURL = await UploadFile(image, imgName); // Promise();

    const pdfName =
      "medical_" + petName + (Math.random() + 1).toString(36).substring(2);
    let medPdfURL = await UploadFile(medicalPDF, pdfName); // Promise();

    if (petImageURL) {
      pet.imageUrl = petImageURL;
    }

    if (medPdfURL) {
      pet.medicalUrl = medPdfURL;
    }

    updatePetInDatabase(pet)
      .then((success) => {
        const path = `/user/account`;
        setTimeout(navigate(path), 1000);
      })
      .catch((err) => {
        console.error(err);
      });

    // if (image) {
    //   // TODO: Come up with better naming scheme
    //   const imgName = petName + (Math.random() + 1).toString(36).substring(2);
    //   const imageRef = ref(storage, imgName);
    //   uploadBytes(imageRef, image)
    //     .then(() => {
    //       getDownloadURL(imageRef)
    //         .then((url) => {
    //           setPhotoURL(url);
    //           pet.imageUrl = url;
    //           pet.medicalUrl = "";
    //           updatePetInDatabase(pet)
    //             .then((success) => {
    //               const path = `/user/account`;
    //               setTimeout(navigate(path, { replace: true }), 1000);
    //             })
    //             .catch((err) => {
    //               console.error(err);
    //             });
    //         })
    //         .catch((error) => {
    //           console.error("Error when uploading image: ", error);
    //         });
    //     })
    //     .catch((error) => {
    //       console.error("Error when uploading image: ", error);
    //     });
    // } else {
    //   updatePetInDatabase(pet)
    //     .then((success) => {
    //       if (success) {
    //         const path = `/user/account`;
    //         setTimeout(navigate(path, { replace: true }), 1000);
    //       }
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //     });
    // }
  }

  const UploadImage = (e) => {
    e.preventDefault();
    let file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      // Remember the previous image:
      if (image) {
        setPrevImage(new File([image], image.name, { type: image.type }));
      } else {
        setPrevImage(null);
      }
      let img = URL.createObjectURL(file);
      /* The cropper only displays if the selected file has changed.
       * If the user selects the same file, the cropper wouldn't open,
       * but we want it to open, so we set the file name value to null. */
      document.getElementById("file-btn").value = null;

      setImage(file);
      setPhotoURL(img);
      setOpenCrop(true);

      /* The dialog defaults to only image types, but users can upload
       * a non-image file anyways, so this displays an error message. */
    } else if (file && !file.type.startsWith("image/")) {
      alert("Only image file types are supported.");
    }
  };

  const UploadPDF = (e) => {
    e.preventDefault();
    let file = e.target.files[0];

    if (file && file.type === "application/pdf") {
      // Max size: 2.5 megabytes (A lil bit of wiggle room, actually 2550 bytes)
      if (file.size < 2673868) {
        setMedicalPDF(file);
      } else {
        alert("File too large. Max size: 2.5 MB");
        document.getElementById("pdf-file-btn").value = null;
      }

      /* The dialog defaults to only PDF types, but users can upload
       * a non-image file anyways, so this displays an error message. */
    } else if (file) {
      alert("Only PDF file types are supported.");
      document.getElementById("pdf-file-btn").value = medicalPDF;
    }
  };

  const ClearImage = () => {
    // e.preventDefault();
    setImage(null);
    setOriginalImage(null);
    setPhotoURL(null);
    setOpenCrop(false);
    let profileImage = document.getElementById("pet-img");
    profileImage.src = defaultProfileImage;
  };

  const ClearPDF = () => {
    setPdfURL("");
    setMedicalPDF(null);
    document.getElementById("pdf-file-btn").value = null;
  };

  const fileInputRef = useRef(null);

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Render nothing until we have a response for the pet's information
  if (!pageReady || !isAuthed) return null;
  else
    return (
      <div id="edit-container">
        <img
          className="logo"
          src={logo}
          alt="MyPetTag"
          width={250}
          height={250}
        />
        <div className="company-title">
          My<span style={{ color: "#75af96" }}>PetTag</span>
        </div>
        {/* Conditionally render CropEasy */}
        {openCrop && (
          <CropEasy
            {...{
              photoURL,
              openCrop,
              setOpenCrop,
              setPhotoURL,
              setImage,
              prevImage,
            }}
          />
        )}
        <form id="edit-form" onSubmit={handleSubmit(formSubmit)}>
          <h1 id="edit-form-title">Editing {petName}</h1>
          <h2
            style={{ cursor: "pointer" }}
            onClick={() => {
              setPetInfoHide(!petInfoHide);
            }}
          >
            Pet Information{" "}
            <FontAwesomeIcon
              style={{
                fontSize: "20px",
                paddingRight: "15px",
                cursor: "pointer",
              }}
              icon={petInfoHide ? faChevronDown : faChevronRight}
            />
          </h2>
          {petInfoHide && (
            <>
              <label>Upload Pet Picture</label>
              <div id="pet-img-container">
                <img
                  id="pet-img"
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : originalImage
                      ? originalImage
                      : defaultProfileImage
                  }
                  alt="profile-img"
                  width={157}
                  height={157}
                />
              </div>
              <input
                id="file-btn"
                ref={fileInputRef}
                className="form-input-file"
                type="file"
                accept="image/*"
                title=" "
                onChange={UploadImage}
                style={{ display: "none" }}
              />
              <input
                id="clear-image-btn"
                type="button"
                value="Upload Image"
                onClick={triggerFileInput}
              />

              {(image !== null || originalImage !== null) && (
                <input
                  id="clear-image-btn"
                  type="button"
                  value="Clear Image"
                  onClick={ClearImage}
                />
              )}

              <label>Pet Name</label>
              <div className="error-container">
                {errors.petName && get(errors, "petName.message")}
              </div>
              <input
                className="form-input"
                type="text"
                {...register("petName", {
                  required: "Pet Name cannot be blank.",
                })}
              />
              <label>Pet Species</label>
              <div className="error-container">
                {errors.petSpecies && get(errors, "petSpecies.message")}
              </div>
              <Controller
                name="petSpecies"
                control={control}
                rules={{ required: "Pet Species cannot be blank." }}
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
              <div className="error-container">
                {errors.petBreed && get(errors, "petBreed.message")}
              </div>
              <Controller
                name="petBreed"
                control={control}
                rules={{ required: "Pet Breed cannot be blank." }}
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
              <div className="error-container">
                {errors.petDescription && get(errors, "petDescription.message")}
              </div>
              <textarea
                className="form-textarea"
                placeholder="Please give a brief introduction about your pet?"
                rows={5}
                cols={50}
                {...register("petDescription")}
              />
              <label>Pet Birth Date</label>
              <div className="error-container">
                {errors.petBirthday && get(errors, "petBirthday.message")}
              </div>
              <input
                className="form-input"
                type="date"
                style={{ appearance: "textfield" }}
                {...register("petBirthday", {
                  required: "Pet Birth Date cannot be blank.",
                })}
              />
              <label>Pet Weight</label>
              <div className="error-container">
                {errors.petWeight && get(errors, "petWeight.message")}
              </div>
              <input
                className="form-input"
                type="number"
                step="1"
                {...register("petWeight", {
                  required: "Pet Weight cannot be blank.",
                  min: {
                    value: 1,
                    message: "Enter a valid weight.",
                  },
                  max: {
                    value: 400,
                    message: "Enter a valid weight",
                  },
                })}
                style={{ appearance: "textfield" }}
              />
              <label>Pet Sex</label>
              <div className="error-container">
                {errors.petSex && get(errors, "petSex.message")}
              </div>
              <Controller
                name="petSex"
                control={control}
                rules={{ required: "Pet Sex cannot be blank." }}
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
              <div id="form-contacts-container">
                <label>Contacts</label>
                {fields.length < 5 && (
                  <FontAwesomeIcon
                    icon={faPlus}
                    style={{ height: "25px" }}
                    onClick={() => append({ name: "", phone: "" })}
                  />
                )}
              </div>
              {fields.map((field, index) => (
                <div
                  key={`contact${index}`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "rgba(117, 175, 150, 0.3)",
                    borderRadius: "12px",
                    margin: "6px 0px 6px 0px",
                    padding: "0px 6px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0px 6px",
                    }}
                  >
                    <label style={{ fontSize: "16px", paddingTop: "6px" }}>
                      Contact {index + 1}
                    </label>
                    {
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faMinus}
                          style={{
                            height: "25px",
                            marginLeft: "10px",
                            cursor: "pointer",
                          }}
                          onClick={() => remove([index])}
                        />
                      </div>
                    }
                  </div>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Name"
                    key={`contactName${field.id}`} // important to include key with field's id
                    {...register(`contacts.${index}.name`)}
                  />
                  <div className="error-container">
                    {get(errors, `contacts.${index}.phone.message`)}
                  </div>
                  <input
                    className="form-input"
                    type="tel"
                    placeholder="Phone Number"
                    key={`contactPhone${field.id}`} // important to include key with field's id
                    {...register(`contacts.${index}.phone`, {
                      pattern: {
                        value: Patterns.PHONE_REGEX,
                        message: "Enter a valid phone number.",
                      },
                    })}
                  />
                </div>
              ))}
              <label>Address</label>
              <div className="error-container">
                {errors.address && get(errors, "address.message")}
              </div>
              <input
                className="form-input"
                type="text"
                name="address"
                {...register("address")}
                placeholder="1234 Park Ave, City, TX 12345"
              />
            </>
          )}
          <h2
            style={{ cursor: "pointer" }}
            onClick={() => {
              setPetHealthHide(!petHealthHide);
            }}
          >
            Health Information{" "}
            <FontAwesomeIcon
              style={{
                fontSize: "20px",
                paddingRight: "15px",
                cursor: "pointer",
              }}
              icon={petHealthHide ? faChevronDown : faChevronRight}
            />
          </h2>
          {petHealthHide && (
            <>
              <label>Vaccines</label>
              <div className="error-container">
                {errors.petVaccines && get(errors, "petVaccines.message")}
              </div>
              <Controller
                name="petVaccines"
                control={control}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    isMulti
                    isClearable
                    isSearchable
                    closeMenuOnSelect={false}
                    placeholder="Select all that apply..."
                    styles={SelectMultiStyles}
                    options={emptyOptions}
                  />
                )}
              />
              <label>Health Conditions</label>
              <div className="error-container">
                {errors.petHealth && get(errors, "petHealth.message")}
              </div>
              <Controller
                name="petHealth"
                control={control}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    isMulti
                    isClearable
                    isSearchable
                    closeMenuOnSelect={false}
                    placeholder="Select all that apply..."
                    styles={SelectMultiStyles}
                    options={emptyOptions}
                  />
                )}
              />
              <label>Medications</label>
              <div className="error-container">
                {errors.petMedications && get(errors, "petMedications.message")}
              </div>
              <Controller
                name="petMedications"
                control={control}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    isMulti
                    isClearable
                    isSearchable
                    closeMenuOnSelect={false}
                    placeholder="Select all that apply..."
                    styles={SelectMultiStyles}
                    options={emptyOptions}
                  />
                )}
              />
              <label>Allergies</label>
              <div className="error-container">
                {errors.petAllergies && get(errors, "petAllergies.message")}
              </div>
              <Controller
                name="petAllergies"
                control={control}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    isMulti
                    isClearable
                    isSearchable
                    closeMenuOnSelect={false}
                    placeholder="Select all that apply..."
                    styles={SelectMultiStyles}
                    options={emptyOptions}
                  />
                )}
              />
              <label>Additional Information</label>
              <div className="error-container">
                {errors.healthDescription &&
                  get(errors, "healthDescription.message")}
              </div>
              <textarea
                className="form-textarea"
                rows={5}
                cols={50}
                name="healthDescription"
                {...register("healthDescription")}
              />

              <label>Upload Medical History PDF</label>
              {pdfURL && (
                <p style={{ marginTop: "0" }}>
                  Note: Uploading a PDF will override your previously uploaded
                  PDF
                </p>
              )}
              <input
                id="pdf-file-btn"
                // ref={pdfInputRef}
                className="form-input-pdf"
                type="file"
                accept="application/pdf"
                title=" "
                onChange={UploadPDF}
                // style={{ display: "none" }}
              />

              {(pdfURL || medicalPDF) && (
                <input
                  id="clear-pdf-btn"
                  type="button"
                  value="Clear PDF"
                  onClick={ClearPDF}
                />
              )}
            </>
          )}
          <h2
            style={{ cursor: "pointer" }}
            onClick={() => {
              setPetBehaviorHide(!petBehaviorHide);
            }}
          >
            Behavior Information{" "}
            <FontAwesomeIcon
              style={{
                fontSize: "20px",
                paddingRight: "15px",
                cursor: "pointer",
              }}
              icon={petBehaviorHide ? faChevronDown : faChevronRight}
            />
          </h2>
          {petBehaviorHide && (
            <>
              <label>Aggressions</label>
              <div className="error-container">
                {errors.petAggressions && get(errors, "petAggressions.message")}
              </div>
              <Controller
                name="petAggressions"
                control={control}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    isMulti
                    isClearable
                    isSearchable
                    closeMenuOnSelect={false}
                    placeholder="Select all that apply..."
                    styles={SelectMultiStyles}
                    options={PetAggressions}
                  />
                )}
              />
              <label>Good With</label>
              <div className="error-container">
                {errors.petGoodWith && get(errors, "petGoodWith.message")}
              </div>
              <Controller
                name="petGoodWith"
                control={control}
                render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    isMulti
                    isClearable
                    isSearchable
                    closeMenuOnSelect={false}
                    placeholder="Select all that apply..."
                    styles={SelectMultiStyles}
                    options={PetGoodWith}
                  />
                )}
              />
              <label>Additional Information</label>
              <div className="error-container">
                {errors.behaviorDescription &&
                  get(errors, "behaviorDescription.message")}
              </div>
              <textarea
                className="form-textarea"
                rows={5}
                cols={50}
                {...register("behaviorDescription")}
              />
            </>
          )}
          <h2
            style={{ cursor: "pointer" }}
            onClick={() => {
              setPetVetHide(!petVetHide);
            }}
          >
            Vet Information{" "}
            <FontAwesomeIcon
              style={{
                fontSize: "20px",
                paddingRight: "15px",
                cursor: "pointer",
              }}
              icon={petVetHide ? faChevronDown : faChevronRight}
            />
          </h2>
          {petVetHide && (
            <>
              <div className="error-container">
                {errors.clinicName && get(errors, "contactPhone.clinicName")}
              </div>
              <input
                className="form-input"
                type="text"
                placeholder="Clinic Name"
                {...register("clinicName")}
              />
              <div className="error-container">
                {errors.clinicAddress &&
                  get(errors, "contactPhone.clinicAddress")}
              </div>
              <input
                className="form-input"
                type="text"
                placeholder="Clinic Address"
                {...register("clinicAddress")}
              />
              <div className="error-container">
                {errors.clinicPhone && get(errors, "clinicPhone.message")}
              </div>
              <input
                className="form-input"
                type="tel"
                placeholder="Clinic Phone #"
                {...register("clinicPhone", {
                  pattern: {
                    value: Patterns.PHONE_REGEX,
                    message: "Enter a valid phone number.",
                  },
                })}
              />
              <div className="error-container">
                {errors.vetName && get(errors, "vetName.message")}
              </div>
              <input
                className="form-input"
                type="text"
                placeholder="Vet Name"
                {...register("vetName")}
              />
              <div className="error-container">
                {errors.microchipID && get(errors, "microchipID.message")}
              </div>
              <input
                className="form-input"
                type="text"
                placeholder="Microchip ID"
                {...register("microchipID")}
              />
            </>
          )}
          <div id="edit-form-btns">
            <button
              id="cancel-btn"
              type="button"
              onClick={() => navigate("../../account/")}
            >
              Cancel
            </button>
            <input id="save-btn" type="submit" value="Save" />
          </div>
        </form>
      </div>
    );
};

export default PetEdit;
