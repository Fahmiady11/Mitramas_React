import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { DatabaseIcon, BellIcon } from '@heroicons/react/solid';
import Swal from 'sweetalert2';
import gambar from '../../assets/fahmi.jpg';
function Navbar() {
  const [statusNav, setStatusNav] = useState(false);
  const navigate = useNavigate();
  const handleStatus = () => {
    setStatusNav(!statusNav);
  };
  const contentNav = [
    {
      link: '/',
      name: 'Customers',
    },
    {
      link: '/halaman2',
      name: 'Halaman 2',
    },
    {
      link: '/halaman3',
      name: 'Halaman 3',
    },
    {
      link: '/halaman4',
      name: 'Halaman 4',
    },
  ];

  // let activeStyle = {
  //   color: '#0A5D31',
  // };

  const handleLogout = () => {
    window.localStorage.removeItem('ACCESS_KEY');
    Swal.fire('Berhasil!', 'Anda Telah Berhasil Logout!', 'success').then(
      navigate('/login')
    );
  };

  return (
    <>
      <div className="absolute h-screen w-64 hidden sm:block shadow-xl bg-black">
        <div className="py-6 px-12">
          <NavLink
            to="/"
            className="text-white text-3xl font-semibold uppercase hover:text-gray-300"
          >
            <span className="text-orange-500">Mi</span>tramas
          </NavLink>
        </div>
        <nav className="text-white text-base font-semibold pt-3">
          {contentNav.map((item, index) => (
            <NavLink
              to={item.link}
              // style={({ isActive }) => (isActive ? activeStyle : undefined)}
              key={index}
            >
              <div className="flex items-center justify-start pl-12 hover:bg-orange-500">
                <DatabaseIcon className="w-6 text-red-500" />
                <div className="flex items-center text-white py-4 pl-6 nav-item text-lg">
                  {item.name}
                </div>
              </div>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="sm:bg-white shadow-md border-b-2 bg-black fixed w-full sm:static">
        <div className="py-2 px-4 flex items-center justify-between sm:justify-end ">
          <NavLink
            to="/"
            className="text-white text-3xl font-semibold uppercase hover:text-gray-300 sm:hidden"
          >
            <span className="text-orange-500 ">Mi</span>tramas
          </NavLink>
          {statusNav ? (
            <div
              onClick={handleStatus}
              className="px-4 py-2 sm:hidden bg-orange-500 rounded-md text-white font-semibold cursor-pointer hover:bg-orange-600"
            >
              Close
            </div>
          ) : (
            <div
              onClick={handleStatus}
              className="px-4 py-2 sm:hidden bg-orange-500 rounded-md text-white font-semibold cursor-pointer hover:bg-orange-600"
            >
              Open
            </div>
          )}
          <div className="text-orange-500 hidden items-center sm:flex sm:justify-end sm:items-center gap-3 pr-4">
            <BellIcon className="text-red-500 w-6" />
            <img
              src={gambar}
              alt="profile"
              className="w-8 rounded-full border-2 border-orange-500"
            />
            <p
              onClick={handleLogout}
              className="px-4 py-2 text-xs font-poppins bg-orange-200  text-center font-bold rounded-full cursor-pointer hover:bg-orange-300"
            >
              Logout
            </p>
          </div>
        </div>
      </div>
      <div className="fixed sm:hidden w-full mt-14">
        {statusNav ? (
          <div className="bg-orange-500 gap-5 p-4 w-11/12 mx-auto shadow-sm border-2 border-gray-300 rounded-b-xl pb-4 flex flex-col items-center justify-center">
            {contentNav.map((item) => (
              <NavLink to={item.link}>
                <div className=" text-white nav-item font-poppins text-xl font-medium hover:text-black">
                  {item.name}
                </div>
              </NavLink>
            ))}
            <p
              onClick={handleLogout}
              className="p-2 font-poppins bg-orange-200 w-9/12 text-center font-bold rounded-full cursor-pointer hover:bg-orange-300"
            >
              Logout
            </p>
            <img
              src={gambar}
              alt="profile"
              className="w-10 rounded-full border-2 border-white sm:hidden"
            />
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Navbar;
