import React, { useEffect, useState } from "react";
import { getAllContact } from "./redux/contact.slice";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { AiOutlineSearch } from "react-icons/ai";

const App = () => {
  const [UserContact, setUserContact] = useState([]);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const data = useSelector((state) => state.contact);

  useEffect(() => {
    dispatch(getAllContact());
  }, [dispatch]);

  useEffect(() => {
    let { user, isSuccess } = data;
    if (Array.isArray(user) && user.length > 0 && isSuccess) {
      setUserContact(user);
    }
  }, [data]);

  const filtered = !search
    ? UserContact
    : UserContact.filter((item) =>
        item?.first_name?.toLowerCase().includes(search.toLowerCase())
      );
  return (
    <div className="List d-flex justify-content-center">
      <div className="mx-5 my-4">
        <input
          type="text"
          className="box"
          onChange={(e) => setSearch(e.target.value)}
        />
        <AiOutlineSearch className="search" />
        {filtered.map((item, index) => (
          <div className="Contact_list my-2" key={index}>
            <div>
              <img src={item.avatar} alt="img" className="logo_img" />
            </div>
            <div className="list_name">
              <h2>
                {item.first_name} {item.last_name}
              </h2>
              <p>{item.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default App;
