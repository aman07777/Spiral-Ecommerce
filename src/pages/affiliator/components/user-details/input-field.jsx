import React from "react";

const InputField = ({ label, type, name, placeholder, value, onChange }) => {
  return (
    <>
      <div className="">
        <label htmlFor="promo-code">
          {label} <span className="text-red-500">*</span>
        </label>
        <div className="flex px-[.6em] py-2 mt-2 border">
          {/* the input field */}
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required
            className="flex-1 outline-transparent"
          />
        </div>
      </div>
    </>
  );
};

export default InputField;
