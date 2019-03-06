import React from 'react';

const Input = (onChange, value, name, placeholder, type) => {
  return (
    <input
      type={type || "text"}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default Input;
