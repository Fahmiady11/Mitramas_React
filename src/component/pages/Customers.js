import React, { useState, useEffect } from 'react';
import CardTotal from '../moleculs/CardTotal';
import Navbar from '../moleculs/Navbar';
import Search from '../moleculs/Search';
import { UserIcon } from '@heroicons/react/solid';
import Tables from '../moleculs/Tables';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Customers() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const token = window.localStorage.getItem('ACCESS_KEY');
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
            setData(res?.data?.data);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getApi();
    //eslint-disable-next-line
  }, []);
  const filterActive = data?.filter((data) => data?.status === true);
  const filterInactive = data?.filter((data) => data?.status === false);

  let temp;
  if (search === '') {
    temp = data;
  } else if ('true'.includes(search.toLowerCase())) {
    temp = data.filter((data) =>
      data?.status.toString().toLowerCase().includes(search.toLowerCase())
    );
  } else if ('false'.includes(search.toLowerCase())) {
    temp = data.filter((data) =>
      data?.status.toString().toLowerCase().includes(search.toLowerCase())
    );
  } else {
    temp = data.filter((data) =>
      data.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <>
      <div className="font-poppins overflow-x-hidden">
        <Navbar />
        <div className="ml-10 sm:ml-72 mt-32 sm:mt-11 pr-10">
          <h2 className="font-medium text-2xl mb-10">Customers</h2>
          <Search setSearch={setSearch} />
          <div className="flex flex-col sm:flex-row items-center justify-start gap-5 mt-12 mb-16">
            <CardTotal
              icon={UserIcon}
              name="Customers Total"
              total={data.length}
            />
            <CardTotal
              icon={UserIcon}
              name="Customers Active"
              total={filterActive.length}
            />
            <CardTotal
              icon={UserIcon}
              name="Customers Inactive"
              total={filterInactive.length}
            />
          </div>
          <div className="w-24">
            <Link to="/create">
              <p className="px-4 py-1 text-center  bg-orange-500 rounded-full cursor-pointer font-semibold text-white">
                Create
              </p>
            </Link>
          </div>
          <Tables data={temp} />
        </div>
      </div>
    </>
  );
}

export default Customers;
