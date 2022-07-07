import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import loginImage from '../../assets/login.svg';
// import logo from '../../Assets/logo.svg';
import axios from 'axios';
import Swal from 'sweetalert2';
import validator from 'validator';

const LoginPage = () => {
  const baseUrl = 'https://mitramas-test.herokuapp.com/auth/login';
  const [login, setLogin] = useState({ email: '', password: '' });
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  //eslint-disable-next-line
  const [emailError, setEmailError] = useState({ message: '', status: false });
  const handleChange = (e, type) => {
    if (type === 'email') {
      if (validator.isEmail(e.target.value)) {
        setEmailError({ message: 'Email sudah benar', status: true });
      } else {
        if (e.target.value === '') {
          setEmailError({ message: 'Email tidak boleh kosong', status: false });
        } else {
          setEmailError({ message: 'Email harus lengkap', status: false });
        }
      }
      setLogin({ ...login, email: e.target.value });
    } else {
      setLogin({ ...login, password: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(baseUrl, login, { withCredentials: false })
        .then((res) => {
          window.localStorage.setItem('ACCESS_KEY', res?.data?.access_token);
          Swal.fire('Berhasil!', 'Anda Telah Berhasil Login!', 'success');
          navigate(searchParams.get('redirect') ?? '/');
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            title: 'Gagal!',
            text: 'Login Gagal!',
            icon: 'error',
            confirmButtonText: 'ya, saya mencoba kembali',
          });
        });
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: 'Gagal!',
        text: 'Login Gagal!',
        icon: 'error',
        confirmButtonText: 'ya, saya mencoba kembali',
      });
    }
  };

  return (
    <>
      <div className="overflow-x-hidden flex py-44 items-center flex-col-reverse justify-center gap-10 w-full md:gap-x-80  lg:flex-row">
        <div className="hidden md:flex max-w-2xl">
          <img src={loginImage} alt="logo" className="w-full" />
        </div>
        <div className=" border-slate-200 rounded-xl  shadow-md p-12 w-96 sm:w-86 h-auto">
          <form
            className="text-sm max-w-[400px] h-full"
            onSubmit={handleSubmit}
          >
            <p className="text-center font-poppins font-bold text-lg text-orange-500">
              MITRAMAS
            </p>
            <label htmlFor="email">
              <span className="block font-semibold mb-1 after:content-['*'] after:ml-0.5 ">
                Email
              </span>
              <input
                id="email"
                placeholder="mitramas@gmail.com"
                onChange={(e) => handleChange(e, 'email')}
                className="w-full  block border rounded border-orange-400 bg-gray-100 p-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                type="email"
              />
              <p
                className={`mb-0 text-sm ${
                  emailError.status ? 'text-green-700' : 'text-pink-700'
                }`}
              >
                {emailError.message}
              </p>
            </label>
            <label htmlFor="password">
              <span className="block mt-4 font-semibold mb-1 after:content-['*'] after:ml-0.5 ">
                Password
              </span>
              <input
                placeholder="********"
                id="password"
                onChange={(e) => handleChange(e, 'password')}
                className="w-full block border rounded border-orange-400 bg-gray-100 p-2 mb-2 focus:outline-none focus:ring-orange-500 focus:border-orange-50"
                type="password"
              />
            </label>

            <p className="text-right mt-2">
              <Link to="#" className="text-pink-700">
                Lupa Password ?
              </Link>
            </p>

            <input
              type="submit"
              className="w-full py-3 mt-8 bg-orange-500 hover:bg-orange-600 relative text-white shadow-md rounded-full"
              value="Masuk"
            />

            <p className="text-center mt-4">
              Belum Punya Account ?
              <Link to="#" className="font-bold pl-2 text-red-600">
                Daftar
              </Link>
            </p>

            <div className="flex flex-row justify-center">
              <div></div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default React.memo(LoginPage);
