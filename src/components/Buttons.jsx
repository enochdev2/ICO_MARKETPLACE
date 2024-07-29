import React from "react";

const Buttons = ({ name, handleClick, classStyle}) => {
  return (
    <button onClick={handleClick} className={`${classStyle} bg-black rounded-lg py-2 px-6 hover:bg-white hover:text-black border-white border-2`}>
      {name}
    </button>
  );
};

export default Buttons;
