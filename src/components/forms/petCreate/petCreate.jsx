/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

// Import React
import React, { useState, useEffect, useRef, useContext } from "react";
import {
  addPetToDatabase,
  getPetBreeds,
  getVaccines,
  isUserAuthenticated,
  authStateChangedWrapper,
  getPetHealthConditions,
} from "../../../firebaseCommands";
import { Link, useNavigate } from "react-router-dom";
import { storage } from "../../../firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// Import CSS
import "./petCreate.css";
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

import { RememberTagContext } from "../../providers/rememberTagProvider";

// Import Modules
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import LoadingModal from "../../modals/loadingModal";

// For cropping
import CropEasy from "../../crop/CropEasy";

const PetCreate = () => {
  // Render States
  const [petInfoHide, setPetInfoHide] = useState(true);
  const [petHealthHide, setPetHealthHide] = useState(false);
  const [petBehaviorHide, setPetBehaviorHide] = useState(false);
  const [petVetHide, setPetVetHide] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);

  // Pet Data States
  const [image, setImage] = useState(null);
  const [petName, setPetName] = useState(null);
  const [petSpecies, setPetSpecies] = useState(null);
  const [petBreed, setPetBreed] = useState(null);
  const [petDescr, setPetDescr] = useState(null);
  const [petBirthDate, setPetBirthDate] = useState(null);
  const [petWeight, setPetWeight] = useState(null);
  const [petSex, setPetSex] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [petAddress, setPetAddress] = useState(null);
  const [petVaccines, setPetVaccines] = useState([]);
  const [petConditions, setPetConditions] = useState([]);
  const [petMeds, setPetMeds] = useState([]);
  const [petAllergies, setPetAllergies] = useState([]);
  const [petHealthInfo, setPetHealthInfo] = useState(null);
  const [medicalPDF, setMedicalPDF] = useState(null);
  const [petAggressions, setPetAggressions] = useState([]);
  const [petGoodWith, setPetGoodWith] = useState([]);
  const [petBehaviorInfo, setPetBehaviorInfo] = useState(null);
  const [clinicName, setClinicName] = useState(null);
  const [clinicAddr, setClinicAddr] = useState(null);
  const [clinicPhone, setClinicPhone] = useState(null);
  const [vetName, setVetName] = useState(null);
  const [microchipId, setMicrochipId] = useState(null);

  const [isAuthed, setIsAuthed] = useState(false);
  const [uid, setUid] = useState(null);

  const [openCrop, setOpenCrop] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);

  const [showLoad, setShowLoad] = useState(false);

  const [currentTag, setCurrentTag] = useState("");

  const { rememberedTag, setRemeberedTag } = useContext(RememberTagContext);

  const navigate = useNavigate();

  useEffect(() => {
    setCurrentTag(window.location.pathname.split("/")[2]);
    async function fetchAuth() {
      const isAuthed = await isUserAuthenticated();
      if (!isAuthed) {
        navigate("/", { replace: true });
      }
    }
    fetchAuth();
  }, []);

  useEffect(() => {
    async function fetchUid() {
      const uid_ = await authStateChangedWrapper();
      if (uid_) {
        setUid(uid_);
      }
    }
    fetchUid().then(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );
    const getAuthState = async () => {
      const data = await isUserAuthenticated();
      console.log(data);
      setIsAuthed(data);
    };
    getAuthState();
  }, []);

  const ValidateForm = () => {
    let isValid = false;
    if (petName) isValid = true;
    setCanSubmit(isValid);
  };

  const ErrorHandle = () => {
    let errorText = document.getElementById("error-container");
    if (petName === "") {
      if (errorText !== null) {
        errorText.innerHTML = "Pet name cannot be empty!";
        errorText.style.display = "flex";
        errorText.style.visibility = "visible";
      }
    } else {
      if (errorText !== null) {
        errorText.style.display = "none";
        errorText.style.visibility = "hidden";
      }
    }
  };

  const UploadImage = (e) => {
    console.log("IN UPLOAD IMAGE");
    e.preventDefault();
    let file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      let image = URL.createObjectURL(file);
      /* The cropper only displays if the selected file has changed.
       * If the user selects the same file, the cropper wouldn't open,
       * but we want it to open, so we set the file name value to null. */
      document.getElementById("file-btn").value = null;

      setImage(file);
      setPhotoURL(URL.createObjectURL(file));
      setOpenCrop(true);

      /* The dialog defaults to only image types, but users can upload
       * a non-image file anyways, so this displays an error message. */
    } else if (file && !file.type.startsWith("image/")) {
      alert("Only image file types are supported.");
    }
  };

  const UploadPDF = (e) => {
    console.log("IN UPLOAD PDF");
    e.preventDefault();
    let file = e.target.files[0];

    if (file && file.type === "application/pdf") {
      setMedicalPDF(file);

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
    setPhotoURL(null);
    setOpenCrop(false);
    let profileImage = document.getElementById("pet-img");
    profileImage.src = defaultProfileImage;
  };

  const ClearPDF = () => {
    setMedicalPDF(null);
    document.getElementById("pdf-file-btn").value = null;
  };

  useEffect(ValidateForm, [
    petName,
    petSpecies,
    petBreed,
    petDescr,
    petBirthDate,
    petWeight,
    petSex,
    contacts,
    petAddress,
    petVaccines,
    petConditions,
    petMeds,
    petAllergies,
    petHealthInfo,
    petAggressions,
    petGoodWith,
    petBehaviorInfo,
    {
      clinicName: clinicName,
      addr: clinicAddr,
      phone: clinicPhone,
      vetName: vetName,
      microchipId: microchipId,
    },
  ]);

  useEffect(ErrorHandle, [petName]);

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

  const UpdateProfile = async (e) => {
    if (canSubmit) {
      // Step 1: Disable submit button to prevent duplicate pet creation
      let submitBtn = document.getElementById("create-btn");
      submitBtn.disabled = true;
      setShowLoad(true);

      // Step 2: Handle file uploads: Upload files to firestore and get URLs
      const imgName =
        "image_" + petName + (Math.random() + 1).toString(36).substring(2);
      let imageURL = await UploadFile(image, imgName); // Promise();

      const pdfName =
        "medical_" + petName + (Math.random() + 1).toString(36).substring(2);
      let pdfURL = await UploadFile(medicalPDF, pdfName); // Promise();

      // Step 3: Get the tag and add the pet to the database
      let tag = "";
      const regex = /^\/tag\/[a-zA-Z0-9]{6}\/create$/;
      if (regex.test(window.location.pathname)) {
        tag = window.location.pathname.split("/")[2];
      }
      addPetToDatabase(
        tag,
        petName,
        petSpecies,
        petBreed,
        petDescr,
        petBirthDate,
        petWeight,
        petSex,
        petAddress,
        petVaccines,
        petConditions,
        petMeds,
        petAllergies,
        petHealthInfo,
        petAggressions,
        petGoodWith,
        petBehaviorInfo,
        contacts,
        {
          clinicName: clinicName,
          addr: clinicAddr,
          phone: clinicPhone,
          vetName: vetName,
          microchipId: microchipId,
        },
        imageURL,
        pdfURL
      )
        // Step 4: Navigate to user account page. Make sure to clear the remembered tag
        // if the user got here by scanning a new tag
        .then((response) => {
          localStorage.setItem("rememberedTag", "");
          setRemeberedTag("");
          const path = `/user/account`;
          setShowLoad(false);
          setTimeout(navigate(path, { replace: true }), 1000);
        })
        .catch((err) => {
          console.debug(err);
        });
    }
  };

  // Select Arrays
  const PetTypes = [
    { value: "Dog", label: "Dog" },
    { value: "Cat", label: "Cat" },
    { value: "Other", label: "Other" },
  ];
  const PetSex = [
    { value: "Male", label: "Male" },
    { value: "Neutered Male", label: "Neutered Male" },
    { value: "Female", label: "Female" },
    { value: "Spayed Female", label: "Spayed Female" },
  ];
  const [PetBreeds, setPetBreeds] = useState([]);
  const [Vaccines, setVaccines] = useState([]);
  const [HealthConditions, setHealthConditions] = useState([]);
  const Medications = [];
  const Allergies = [];
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
    async function fetchPetBreedInfo() {
      let breeds = [];
      breeds = await getPetBreeds(petSpecies);
      setPetBreeds(breeds);
    }
    fetchPetBreedInfo();
  }, [petSpecies]);

  const imageInputRef = useRef(null);
  const triggerImageInput = () => {
    imageInputRef.current.click();
  };

  const addContactField = () => {
    setContacts([...contacts, { name: "", phone: "" }]);
    console.log("Contacts: ", contacts);
  };

  const removeContactField = (index) => {
    const updatedFields = [...contacts];
    updatedFields.splice(index, 1);
    setContacts(updatedFields);
    console.log("Contacts: ", contacts);
  };

  const handleContactNameChange = (index, value) => {
    const updatedFields = [...contacts];
    updatedFields[index].name = value;
    setContacts(updatedFields);
    console.log("Contacts: ", contacts);
  };

  const handleContactPhoneChange = (index, value) => {
    const updatedFields = [...contacts];
    updatedFields[index].phone = value;
    setContacts(updatedFields);
    console.log("Contacts: ", contacts);
  };

  useEffect(() => {
    async function fetchVaccines() {
      let vaccines = [];
      vaccines = await getVaccines(petSpecies);
      setVaccines(vaccines);
    }
    fetchVaccines();
  }, [petSpecies]);

  useEffect(() => {
    async function fetchPetHealthConditions() {
      const conditions = await getPetHealthConditions();
      setHealthConditions(conditions);
    }
    fetchPetHealthConditions();
  }, []);

  return (
    <div id="create-container">
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
          {...{ photoURL, openCrop, setOpenCrop, setPhotoURL, setImage }}
        />
      )}
      <form id="create-form">
        <h1 id="create-form-title">Add New Pet</h1>
        <p
          style={{
            fontSize: "20px",
            textAlign: "center",
            maxWidth: "500px",
          }}
        >
          Using tag {currentTag}
          <br />
          {currentTag && (
            <Link
              to="/input-code"
              onClick={() => {
                navigate("/input-code", { replace: true });
              }}
              // onClick={() => navigate("../create", { replace: true })}
              style={{
                textDecoration: "none",
                borderBottom: "2px solid #0f5738",
                color: "black",
              }}
            >
              Click here to use a different tag
            </Link>
          )}
        </p>
        <h2
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
                src={image ? URL.createObjectURL(image) : defaultProfileImage}
                alt="profile-img"
                width={157}
                height={157}
              />
            </div>
            <input
              id="file-btn"
              ref={imageInputRef}
              className="form-input-img"
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
              onClick={triggerImageInput}
            />

            {image !== null && (
              <input
                id="clear-image-btn"
                type="button"
                value="Clear Image"
                onClick={ClearImage}
              />
            )}

            {/* <input className="form-input-file" onChange={UploadImage} /> */}
            <label>Pet Name</label>
            <div className="error-container">
              {petName === "" ? "Pet Name is Required" : null}
            </div>
            <input
              className="form-input"
              type="text"
              autoFocus
              onChange={(e) => {
                setPetName(e.target.value);
              }}
              value={petName}
            />
            <label>Pet Species</label>
            <Select
              isClearable
              isSearchable
              closeMenuOnSelect={true}
              styles={SelectStyles}
              options={PetTypes}
              onChange={(e) => {
                if (e) {
                  setPetSpecies(e.value);
                  console.log(e, "value: ", e.value);
                } else {
                  console.log("setting species to null");
                  setPetSpecies(null);
                }
              }}
              value={
                petSpecies ? { value: petSpecies, label: petSpecies } : null
              }
            />
            <label>Pet Breed</label>
            <CreatableSelect
              isClearable
              isSearchable
              closeMenuOnSelect={true}
              styles={SelectStyles}
              options={PetBreeds}
              onChange={(e) => {
                if (e) {
                  setPetBreed(e.value);
                } else {
                  setPetBreed(null);
                }
              }}
              value={petBreed ? { value: petBreed, label: petBreed } : null}
            />
            <label>Pet Description</label>
            <textarea
              className="form-textarea"
              name="description"
              placeholder="Provide a brief introduction about your pet"
              rows={5}
              cols={50}
              onChange={(e) => {
                setPetDescr(e.target.value);
              }}
              value={petDescr}
            />
            <label>Pet Birth Date</label>
            <input
              className="form-input"
              type="date"
              style={{ appearance: "textfield" }}
              onChange={(e) => {
                setPetBirthDate(e.target.value);
              }}
              value={petBirthDate}
            />
            <label>Pet Weight {"(lbs)"}</label>
            <input
              className="form-input"
              type="number"
              style={{ appearance: "textfield" }}
              onChange={(e) => {
                setPetWeight(e.target.value);
              }}
              value={petWeight}
            />
            <label>Pet Sex</label>
            <Select
              isClearable
              isSearchable
              closeMenuOnSelect={true}
              styles={SelectStyles}
              options={PetSex}
              onChange={(e) => {
                if (e) {
                  setPetSex(e.value);
                } else {
                  setPetSex(null);
                }
              }}
              value={petSex ? { value: petSex, label: petSex } : null}
            />
            <div id="form-contacts-container">
              <label>Contacts</label>
              {contacts.length < 5 && (
                <FontAwesomeIcon
                  icon={faPlus}
                  style={{ height: "25px" }}
                  onClick={addContactField}
                />
              )}
            </div>
            {/* {Wrap in map to dynamically add more contacts} */}
            {contacts.map((field, index) => (
              <div
                key={index}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <label>Contact {index + 1}</label>
                  {
                    <FontAwesomeIcon
                      icon={faMinus}
                      style={{
                        height: "25px",
                        marginLeft: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() => removeContactField(index)}
                    />
                  }
                </div>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Name"
                  value={field.name}
                  onChange={(e) =>
                    handleContactNameChange(index, e.target.value)
                  }
                />
                <input
                  className="form-input"
                  type="text"
                  placeholder="Phone Number"
                  value={field.phone}
                  onChange={(e) =>
                    handleContactPhoneChange(index, e.target.value)
                  }
                />
              </div>
            ))}
            {/*------------------------------------------------------------------*/}
            <label>Address</label>
            <input
              className="form-input"
              type="text"
              placeholder="1234 Park Ave, City, TX 12345"
              onChange={(e) => {
                setPetAddress(e.target.value);
              }}
              value={petAddress}
            />
          </>
        )}
        <h2
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
            <CreatableSelect
              isMulti
              isClearable
              isSearchable
              closeMenuOnSelect={false}
              placeholder="Select all that apply..."
              styles={SelectMultiStyles}
              options={Vaccines}
              onChange={(e) => {
                let newVaccines = [];
                e.forEach((item) => newVaccines.push(item.value));
                setPetVaccines(newVaccines);
              }}
              value={petVaccines.map((value) => ({ value, label: value }))}
            />
            <label>Health Conditions</label>
            <CreatableSelect
              isMulti
              isClearable
              isSearchable
              closeMenuOnSelect={false}
              placeholder="Select all that apply..."
              styles={SelectMultiStyles}
              options={HealthConditions}
              onChange={(e) => {
                let newConds = [];
                e.forEach((item) => newConds.push(item.value));
                setPetConditions(newConds);
              }}
              value={petConditions.map((value) => ({ value, label: value }))}
            />
            <label>Medications</label>
            <CreatableSelect
              isMulti
              isClearable
              isSearchable
              closeMenuOnSelect={false}
              placeholder="Select all that apply..."
              styles={SelectMultiStyles}
              options={Medications}
              onChange={(e) => {
                let newMeds = [];
                e.forEach((item) => newMeds.push(item.value));
                setPetMeds(newMeds);
              }}
              value={petMeds.map((value) => ({ value, label: value }))}
            />
            <label>Allergies</label>
            <CreatableSelect
              isMulti
              isClearable
              isSearchable
              closeMenuOnSelect={false}
              placeholder="Select all that apply..."
              styles={SelectMultiStyles}
              options={Allergies}
              onChange={(e) => {
                let newAllergies = [];
                e.forEach((item) => newAllergies.push(item.value));
                setPetAllergies(newAllergies);
              }}
              value={petAllergies.map((value) => ({ value, label: value }))}
            />
            <label>Additional Information</label>
            <textarea
              className="form-textarea"
              name="description"
              rows={5}
              cols={50}
              onChange={(e) => {
                setPetHealthInfo(e.target.value);
              }}
              value={petHealthInfo}
            />
            <label>Upload Medical History PDF</label>
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

            {medicalPDF !== null && (
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
            <CreatableSelect
              isMulti
              isClearable
              isSearchable
              closeMenuOnSelect={false}
              placeholder="Select all that apply..."
              styles={SelectMultiStyles}
              options={PetAggressions}
              onChange={(e) => {
                let newAggressions = [];
                e.forEach((item) => newAggressions.push(item.value));
                setPetAggressions(newAggressions);
              }}
              value={petAggressions.map((value) => ({ value, label: value }))}
            />
            <label>Good With</label>
            <CreatableSelect
              isMulti
              isClearable
              isSearchable
              closeMenuOnSelect={false}
              placeholder="Select all that apply..."
              styles={SelectMultiStyles}
              options={PetGoodWith}
              onChange={(e) => {
                let newGoodWith = [];
                e.forEach((item) => newGoodWith.push(item.value));
                setPetGoodWith(newGoodWith);
              }}
              value={petGoodWith.map((value) => ({ value, label: value }))}
            />
            <label>Additional Information</label>
            <textarea
              className="form-textarea"
              name="description"
              rows={5}
              cols={50}
              onChange={(e) => {
                setPetBehaviorInfo(e.target.value);
              }}
              value={petBehaviorInfo}
            />
          </>
        )}
        <h2
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
            <input
              className="form-input"
              type="text"
              placeholder="Clinic Name"
              onChange={(e) => {
                setClinicName(e.target.value);
              }}
              value={clinicName}
            />
            <input
              className="form-input"
              type="text"
              placeholder="Clinic Address"
              onChange={(e) => {
                setClinicAddr(e.target.value);
              }}
              value={clinicAddr}
            />
            <input
              className="form-input"
              type="text"
              placeholder="Clinic Phone #"
              onChange={(e) => {
                setClinicPhone(e.target.value);
              }}
              value={clinicPhone}
            />
            <input
              className="form-input"
              type="text"
              placeholder="Vet Name"
              onChange={(e) => {
                setVetName(e.target.value);
              }}
              value={vetName}
            />
            <input
              className="form-input"
              type="text"
              placeholder="Microchip ID"
              onChange={(e) => {
                setMicrochipId(e.target.value);
              }}
              value={microchipId}
            />
          </>
        )}
        <LoadingModal showModal={showLoad} setShowModal={setShowLoad} />
        <input
          id="create-btn"
          type="submit"
          value="Create Pet"
          onClick={UpdateProfile}
          disabled={!canSubmit}
        />
      </form>
      {/* <CropEasy
        {...{ photoURL, openCrop, setOpenCrop, setPhotoURL, setImage }}
      /> */}
    </div>
  );
};

export default PetCreate;

// : (
//   <CropEasy {...{ photoURL, setOpenCrop, setPhotoURL, setImage }} />
// )
