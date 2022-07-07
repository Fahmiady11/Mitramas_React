import React, { useState } from 'react';
import Navbar from '../moleculs/Navbar';
import BreadCrumbs from '../moleculs/BreadCrumbs';
import Input from '../moleculs/Input';
import BackSubmit from '../moleculs/BackSubmit';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateCustomer() {
  const navigate = useNavigate();
  const token = window.localStorage.getItem('ACCESS_KEY');
  const [input, setInput] = useState({
    name: '',
    address: '',
    country: '',
    phone_number: '',
    job_title: '',
    status: false,
  });

  const handleClick = async (e) => {

    await axios
      .post('https://mitramas-test.herokuapp.com/customers', input, 
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        Swal.fire(
          'Berhasil!',
          'Anda Telah Berhasil membuat Data Customers',
          'success'
        );
        navigate('/');
      })
      .catch((error) => {
        Swal.fire({
          title: 'Gagal!',
          text: 'Anda Tidak Berhasil membuat Data Customers',
          icon: 'error',
          confirmButtonText: 'ya, saya mencoba kembali',
        });
        navigate('/');
      });
  };
  return (
    <>
      <div className="font-poppins overflow-x-hidden">
        <Navbar />
        <div className="ml-10 sm:ml-72 mt-32 sm:mt-11 pr-10">
          <BreadCrumbs prev="Customers" current="Create" />
          <div className="my-10 flex flex-col gap-6 sm:w-11/12 justify-center mx-auto sm:mt-20">
            <Input
              setInput={setInput}
              input={input}
              label="Name"
              placeholder="Masukkan name"
              nameField="name"
            />
            <Input
              setInput={setInput}
              input={input}
              label="Address"
              placeholder="Masukkan Address"
              nameField="address"
            />
            <Input
              setInput={setInput}
              input={input}
              label="Country"
              placeholder="Masukkan Country"
              nameField="country"
            />
            <Input
              setInput={setInput}
              input={input}
              label="Phone Number"
              placeholder="Masukkan Phone Number"
              nameField="phone_number"
            />
            <Input
              input={input}
              setInput={setInput}
              label="Job Title"
              placeholder="Masukkan Job Title"
              nameField="job_title"
            />

            <BackSubmit handleClick={handleClick} />
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateCustomer;
