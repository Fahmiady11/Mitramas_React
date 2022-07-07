import React from 'react';

function CardTotal(props) {
  return (
    <>
      <div className="flex space-x-4 items-center px-4 py-4 rounded-md shadow bg-white border-2 border-gray-100 w-full sm:w-96">
        <props.icon className="w-10 text-blue-400" />
        <div className="flex flex-col space-y-1">
          <h3 className="font-lg text-red-500 font-semibold">{props.name}</h3>
          <span className="font-semibold text-2xl text-gray-600">
            {props.total}
          </span>
        </div>
      </div>
    </>
  );
}

export default CardTotal;
