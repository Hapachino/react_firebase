import React from 'react';

const Input = (value, name, placeholder, type) => {
  const { onChange } = this;

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
