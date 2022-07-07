import React from 'react';

function Input({ input, setInput, label, placeholder, nameField, value }) {
  const handleChange = (event) => {
    if (nameField === 'name') {
      setInput({ ...input, name: event.target.value });
    } else if (nameField === 'address') {
      setInput({ ...input, address: event.target.value });
    } else if (nameField === 'country') {
      setInput({ ...input, country: event.target.value });
    } else if (nameField === 'phone_number') {
      setInput({ ...input, phone_number: event.target.value });
    } else if (nameField === 'job_title') {
      setInput({ ...input, job_title: event.target.value });
    } else if (nameField === 'status') {
      setInput({
        ...input,
        status: Boolean(event.target.value.toLowerCase() === 'true'),
      });
    }
  };
  return (
    <>
      <div className="">
        <label
          htmlFor="name_judul"
          className="block mb-2 text-sm text-gray-900 font-bold"
        >
          {label}
        </label>
        <input
          id="name_judul"
          placeholder={placeholder}
          defaultValue={value}
          type="text"
          className="border-2 bg-[#f2f2f2] border-gray-300 shadow-md font-poppins rounded-lg text-sm px-3 w-full  bg-transparent h-9"
          onChange={handleChange}
          required
        />
      </div>
    </>
  );
}

export default Input;
