import React, { useEffect, useState } from "react";
import "./App.css";
//import { Users } from "./users";
import { RiArrowDropDownLine } from "react-icons/ri";
import axios from "axios";

const App = () => {
  const [Users, setUser]= useState([])
  useEffect(()=> {
    const usersApi = async () => {
      try {
        const response = await axios.get(
          "https://randomuser.me/api/?results=10"
        );
        console.log(response.data);
        setUser(response.data);
        return response;
      } catch (e) {
        console.log(e);
      }
    };
    usersApi();
  },[])
  const randomUsers = Users?.results;
  const maleUsers = Users?.results?.filter((user) => {
    return user.gender === "male";
  });
  const femaleUsers = Users?.results?.filter((user) => {
    return user.gender === "female";
  });
  const [nation, setNation] = useState("NL");
  const [gender, setGender] = useState("All");
  const [dropList, setDropList] = useState(false)
  const isSelected = (val) => gender === val;
  const handleClick = (e) => setGender(e.currentTarget.value);
  const handleDrop = (user) => {
    setNation(user);
    setDropList(false)
  }
  return (
    <div className="main">
      <dl>
        <input
          type="radio"
          value="Male"
          checked={isSelected("Male")}
          onChange={handleClick}
        />
        <span>Male</span>
      </dl>
      <dl>
        <input
          type="radio"
          value="Female"
          checked={isSelected("Female")}
          onChange={handleClick}
        />
        <span>Female</span>
      </dl>
      <dl>
        <input
          type="radio"
          value="All"
          checked={isSelected("All")}
          onChange={handleClick}
        />
        <span>All</span>
      </dl>
      <h1 className="select">Select Nationality:</h1>
      <div className="dropdown">
        <span>{nation}</span>
        <RiArrowDropDownLine className="arrow" onClick={()=>setDropList(!dropList)}/>
        {dropList=== true? randomUsers.map((user) => {
          return <div className="list" onClick={()=>handleDrop(user.nat)}>{user.nat} </div>;
        }): null}
      </div>
      {gender === "All" ? (
        <div>
          {randomUsers?.map((user) => {
            return (
              <div className="userBg">
                <img className="img" src={user.picture.medium} />
                <span className="name">
                  {user.name.title} {user.name.first} {user.name.last} (
                  {user.nat})
                </span>
                <span className="email">{user.email}</span>
              </div>
            );
          })}
        </div>
      ) : gender === "Male" ? (
        <div>
          {maleUsers.map((user) => {
            return (
              <div className="userBg">
                <img className="img" src={user.picture.medium} />
                <span className="name">
                  {user.name.title} {user.name.first} {user.name.last} (
                  {user.nat})
                </span>
                <span className="email">{user.email}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          {femaleUsers.map((user) => {
            return (
              <div className="userBg">
                <img className="img" src={user.picture.medium} />
                <span className="name">
                  {user.name.title} {user.name.first} {user.name.last} (
                  {user.nat})
                </span>
                <span className="email">{user.email}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default App;
