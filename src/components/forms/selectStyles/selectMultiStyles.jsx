/**
 * MyPetTag - All rights reserved (c) 2023
 * Maintainers: Ashton Foulger, Kevin Xue, Kyle Charlton, Sameer Khan
 */

/**
 * Component sets style props for react-select multi selectors in pet create form.
 */
const SelectMultiStyles = {
  container: (provided, state) => ({ ...provided }),
  control: (provided, state) => ({
    ...provided,
    minHeight: "50px",
    backgroundColor: "#75af96",
    borderRadius: "16px",
    border: "none",
    boxShadow: "0px 8px 10px 0px rgba(0,0,0,0.25)",
    marginBottom: "23px",
    padding: "0px 10px",
    fontFamily: "inherit",
    fontSize: "16px",
    color: "black",
  }),
  placeholder: (provided, state) => ({ ...provided, color: "#354f44" }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    backgroundColor: "black",
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    svg: {
      fill: "black",
    },
  }),
  menu: (provided, state) => ({
    ...provided,
    border: "solid 2px #0f5738",
    borderRadius: "12px",
  }),
  option: (provided, state) => ({
    ...provided,
    color: "black",
    borderRadius: "6px",
    backgroundColor: "none",
    "&:hover": {
      backgroundColor: "#d4d4d4",
      borderRadius: "10px",
      color: "inherit",
    },
  }),
  multiValue: (provided, state) => ({
    ...provided,
    backgroundColor: "#0f5738",
    borderRadius: "12px",
    color: "white",
  }),
  multiValueLabel: (provided, state) => ({
    ...provided,
    color: "inherit",
    paddingLeft: "10px",
  }),
  multiValueRemove: (provided, state) => ({
    ...provided,
    color: "inherit",
    "&:hover": {
      backgroundColor: "transparent",
    },
  }),
};

export default SelectMultiStyles;
