import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function TableHeader({ title }) {
  return (
    <th
      scope="col"
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    >
      {title}
    </th>
  );
}

function TableRow({ data }) {
  const token = window.localStorage.getItem('ACCESS_KEY');
  const navigate = useNavigate();
  let statusClass = ' bg-green-100 text-green-700';
  if (data.status === false) {
    statusClass = ' bg-red-100 text-red-700';
  }
  const handleDelete = async () => {
    try {
      await axios
        .delete(`https://mitramas-test.herokuapp.com/customers`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
          data: {
            id: data?.id,
          },
        })
        .then((res) => {
          Swal.fire(
            'Berhasil!',
            'Anda Telah Berhasil Menghapus data Customer!',
            'success'
          );
          window.location.reload();
          navigate(`/`);
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            title: 'Gagal!',
            text: 'Gagal Menghapus!',
            icon: 'error',
            confirmButtonText: 'ya, saya mencoba kembali',
          });
          navigate(`/`);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <tr>
      <td className="px-2 py-4 whitespace-nowrap text-sm">{data.name}</td>
      <td className="px-2 py-4 whitespace-nowrap text-sm">{data.address}</td>
      <td className="px-2 py-4 whitespace-nowrap text-sm truncate ">
        {data.country}
      </td>
      <td className="px-2 py-4 whitespace-nowrap text-sm">
        {data.phone_number}
      </td>
      <td className="px-2 py-4 whitespace-nowrap text-sm">{data.job_title}</td>
      <td className="px-2 py-4 whitespace-nowrap">
        <span
          className={
            'px-2 py-1 text-sm font-medium rounded-full capitalize' +
            statusClass
          }
        >
          {`${data.status}`}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex flex-row gap-4">
        <Link to={`/update/${data?.id}`}>
          <p className="bg-indigo-100 px-3 py-2 rounded text-indigo-600 hover:text-indigo-800 cursor-pointer">
            Edit
          </p>
        </Link>
        <p
          onClick={handleDelete}
          className="bg-red-200 px-3 py-2 rounded text-red-600 hover:text-red-800 cursor-pointer"
        >
          Delete
        </p>
      </td>
    </tr>
  );
}

function Tables({ data }) {
  const [tempData, setTempData] = useState(null);

  tempData &&
    tempData?.sort((a, b) => {
      return a?.name?.localeCompare(b?.name);
    });

  useEffect(() => {
    setTempData(data);
  }, [tempData, data]);
  return (
    <div className="flex flex-col space-y-2 my-12">
      <div className="shadow-md overflow-auto rounded-md h-96">
        <table className="min-w-full divide-y">
          <thead className="bg-gray-50">
            <tr>
              <TableHeader title="Name" />
              <TableHeader title="Address" />
              <TableHeader title="Country" />
              <TableHeader title="Phone Number" />
              <TableHeader title="Job Title" />
              <TableHeader title="Status" />
              <TableHeader title="Action" />
              <th
                scope="col"
                className="relative px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                <span></span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y">
            {tempData &&
              tempData.map((data, index) => {
                return (
                  <TableRow
                    key={index}
                    data={data}
                    setTempData={setTempData}
                    dataFull={tempData}
                  />
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tables;
