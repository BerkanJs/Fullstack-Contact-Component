import React from 'react';
import { Link } from 'react-router-dom';  

const Contact = ({ contact }) => {
  console.log(contact.photoUrl);
  
  return (
    <div className="block p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center  space-x-4">
       
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <img src={contact.photoUrl} alt={contact.name} className="object-cover w-full h-full" />
        </div>
       
        <div className="text-gray-800">
          <p className="text-lg font-semibold">{contact.name.substring(0, 15)}</p>
          <p className="text-gray-500 text-sm">{contact.title}</p>
        </div>
      </div>
   
      <div className="mt-4 text-gray-600">
        <p className="text-sm">{contact.name.substring(0, 20)}</p>
        <p className="text-sm">{contact.address}</p>
        <p className="text-sm">{contact.phone}</p>
        <p className="flex items-center space-x-2 text-sm">
          {contact.status === 'Active' ? (
            <div className="w-3 h-3 bg-green-500 rounded-full" />
          ) : (
            <div className="w-3 h-3 bg-gray-500 rounded-full" />
          )}
          <span>{contact.status}</span>
        </p>
      </div>
    </div>
  );
}

export default Contact;
