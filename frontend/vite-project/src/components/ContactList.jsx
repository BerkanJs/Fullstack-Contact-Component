import React from 'react';
import Contact from "./Contact";

const ContactList = ({ data, currentPage, getAllContacts }) => {
    const { content, totalPages, totalElements } = data || {}; 
    console.log(content,"liste");



    return (
        <main className='p-6 bg-gray-100 min-h-screen'>
            {/* No contacts message */}
            {content?.length === 0 && (
                <div className='text-center text-lg font-semibold text-gray-700'>
                    No Contacts. Please add a new contact.
                </div>
            )}

            {/* Contacts List */}
            <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
                {content?.length > 0 && content.map(contact => (
                    <Contact contact={contact} key={contact.id} />
                ))}
            </ul>

            {/* Pagination */}
            {content?.length > 0 && totalPages > 1 && (
                <div className='flex justify-center items-center space-x-4 mt-6'>
                    {/* Previous Button */}
                    <button 
                        onClick={() => getAllContacts(currentPage - 1)} 
                        className={`px-4 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-500 transition duration-200 ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={currentPage === 0}
                    >
                        &laquo;
                    </button>

                    {/* Page Numbers */}
                    {totalPages && [...Array(totalPages).keys()].map((page) => (
                        <button 
                            onClick={() => getAllContacts(page)} 
                            key={page}
                            className={`px-4 py-2 text-gray-600 rounded-lg ${currentPage === page ? 'bg-gray-700 text-white' : 'bg-gray-300 hover:bg-gray-400'} transition duration-200`}
                        >
                            {page + 1}
                        </button>
                    ))}

                    {/* Next Button */}
                    <button 
                        onClick={() => getAllContacts(currentPage + 1)} 
                        className={`px-4 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-500 transition duration-200 ${totalPages === currentPage + 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={totalPages === currentPage + 1}
                    >
                        &raquo;
                    </button>
                </div>
            )}
        </main>
    );
};

export default ContactList;
