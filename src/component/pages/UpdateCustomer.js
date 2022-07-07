import React, { useState, useEffect } from 'react';
import Navbar from '../moleculs/Navbar';
import BreadCrumbs from '../moleculs/BreadCrumbs';
import Input from '../moleculs/Input';
import BackSubmit from '../moleculs/BackSubmit';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateCustomer() {
  const navigate = useNavigate();
  let { userId } = useParams();
  const [data, setData] = useState(null);
  const token = window.localStorage.getItem('ACCESS_KEY');
  const [input, setInput] = useState({});
  useEffect(() => {
    const getApi = async () => {
      try {
        await axios
          .get('https://mitramas-test.herokuapp.com/customers', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${token}`,
            },
          })
          .then((res) => {
            const filterData = res?.data?.data?.filter(
              (item) => item.id === +userId
            );
            setData(filterData);
            setInput(filterData[0]);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getApi();
    //eslint-disable-next-line
  }, []);
  const handleClick = async (e) => {
    await axios
      .put('https://mitramas-test.herokuapp.com/customers', input, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        Swal.fire(
          'Berhasil!',
          'Anda Telah Berhasil mengubah Data Customers',
          'success'
        );
        navigate('/');
      })
      .catch((error) => {
        Swal.fire({
          title: 'Gagal!',
          text: 'Anda Tidak Berhasil mengubah Data Customers',
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
          <BreadCrumbs prev="Customers" current="Edit" />
          <div className="my-10 flex flex-col gap-6 sm:w-11/12 justify-center mx-auto sm:mt-20">
            <Input
              setInput={setInput}
              input={input}
              label="Name"
              placeholder="Masukkan name"
              nameField="name"
              value={data && data[0]?.name}
            />
            <Input
              setInput={setInput}
              input={input}
              label="Address"
              placeholder="Masukkan Address"
              nameField="address"
              value={data && data[0]?.address}
            />
            <Input
              setInput={setInput}
              input={input}
              label="Country"
              placeholder="Masukkan Country"
              nameField="country"
              value={data && data[0]?.country}
            />
            <Input
              setInput={setInput}
              input={input}
              label="Phone Number"
              placeholder="Masukkan Phone Number"
              nameField="phone_number"
              value={data && data[0]?.phone_number}
            />
            <Input
              input={input}
              setInput={setInput}
              label="Job Title"
              placeholder="Masukkan Job Title"
              nameField="job_title"
              value={data && data[0]?.job_title}
            />
            <Input
              input={input}
              setInput={setInput}
              label="Status"
              placeholder="Masukkan Status true or false"
              value={data && data[0]?.status?.toString()}
              nameField="status"
            />

            <BackSubmit handleClick={handleClick} />
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateCustomer;
