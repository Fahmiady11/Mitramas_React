import React from 'react';

function Search({ setSearch }) {
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className=" flex gap-5 items-center w-full justify-end mt-8">
        <input
          type="text"
          placeholder="Cari berdasarkan Nama atau Status"
          className="shadow-md font-poppins rounded-3xl text-xs  px-3 border-2 w-2/3 md:w-full max-w-md border-slate-300 bg-transparent h-9"
          onChange={handleChange}
        />
      </div>
    </>
  );
}

export default Search;
