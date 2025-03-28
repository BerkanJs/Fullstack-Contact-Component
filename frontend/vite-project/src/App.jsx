import { useEffect, useRef, useState } from "react";
import "./App.css";
import {
  getContacts,
  saveContact,
  updatePhoto,
} from "./api/ContactService";
import Header from "./components/Header";
import ContactList from "./components/ContactList";

import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const modalRef = useRef();
  const fileRef = useRef();
  const [data, setData] = useState({ content: [] });
  const [currentPage, setCurrentPage] = useState(0);
  const [file, setFile] = useState(undefined);
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    title: "",
    status: "",
  });

  const getAllContacts = async (page = 0, size = 10) => {
    try {
      setCurrentPage(page);
      const response = await getContacts(page, size);
      setData(response.data);
      console.log("Data Çekildi:", response.data);
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleNewContact = async (event) => {
    event.preventDefault();
    try {
      const response = await saveContact(values);
      console.log("Gelen yanıt:", response.data);

      const contactId = response.data.id;
      if (!contactId) {
        console.error("Hata: ID değeri alınamadı!");
        return;
      }

      if (file) {
        const formData = new FormData();
        formData.append("file", file, file.name);
        await updatePhoto(contactId, formData);
      }

      toggleModal(false);
      setFile(undefined);
      fileRef.current.value = null;
      setValues({
        name: "",
        email: "",
        phone: "",
        address: "",
        title: "",
        status: "",
      });
      getAllContacts();
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  const updateContact = async () => {};


  const updateImage = async (formData) => {
    try {
      const { data: photoUrl } = await updatePhoto(formData);
    } catch (error) {
      console.log(error);
 
    }
  };
  

  const toggleModal = (show) =>
    show ? modalRef.current.showModal() : modalRef.current.close();

  useEffect(() => {
    getAllContacts();
  }, []);

  return (
    <div>
      <Header
        toggleModal={toggleModal}
        nbOfContacts={data.totalElements || 0}
      />

      <Routes>
        <Route path="/" element={<Navigate to={"/contacts"} />} />
        <Route
          path="/contacts"
          element={
            <ContactList
              data={data || []}
              currentPage={currentPage}
              getAllContacts={getAllContacts}
            />
          }
        />
        
      </Routes>

      <dialog
        ref={modalRef}
        id="modal"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-white rounded-lg shadow-lg max-w-lg w-full z-50"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">New Contact</h3>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => toggleModal(false)}
          >
            <span className="material-icons">close</span>
          </button>
        </div>
        <form onSubmit={handleNewContact}>
          <div className="space-y-4">
            {["name", "email", "title", "phone", "address", "status"].map(
              (field) => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    id={field}
                    type="text"
                    value={values[field]}
                    onChange={onChange}
                    name={field}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              )
            )}
            <div>
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-gray-700"
              >
                Profile Photo
              </label>
              <input
                id="photo"
                type="file"
                onChange={(event) => setFile(event.target.files[0])}
                ref={fileRef}
                name="photo"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => toggleModal(false)}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}

export default App;
