import React from "react";

const Header = ({ toggleModal, nbOfContacts }) => {
  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold">Contact List ({nbOfContacts})</h3>
        <button
          onClick={() => toggleModal(true)}
          className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition duration-200"
        >
          Add New Contact
        </button>
      </div>
    </div>
  );
};

export default Header;
