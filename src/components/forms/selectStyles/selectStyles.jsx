const selectStyles = {
  control: (provided, state) => ({
    ...provided,
    height: "50px",
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
  placeholder: (provided, state) => ({
    ...provided,
    color: "#354f44",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: "inherit",
  }),
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
    color: state.isSelected ? "black" : "",
    borderRadius: state.isSelected ? "6px" : "",
    backgroundColor: state.isSelected ? "#d4d4d4" : "",
    "&:hover": {
      backgroundColor: "#d4d4d4",
      borderRadius: "10px",
      color: "inherit",
    },
  }),
};

export default selectStyles;
