import React, { useState } from "react";

const RememberTagContext = React.createContext();

const RememberTagProvider = (props) => {
  const [rememberedTag, setRemeberedTag] = useState("");

  return (
    <RememberTagContext.Provider
      value={{ rememberedTag, setRemeberedTag }}
      {...props}
    />
  );
};

export { RememberTagContext, RememberTagProvider };
