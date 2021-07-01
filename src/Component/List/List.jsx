import React, { useEffect, useState } from "react";
import ListRow from "./ListRow";

const List = () => {
  const [header, setHeader] = useState({}); //hooks for call header name
  const [bodyData, setBodyData] = useState([]); // hooks for call the body data
  const [itemSearch, setItemSearch] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost/api/list.php") // call api to load the header data
      .then((res) => res.json())
      .then((data) => setHeader(data.data.headers[0]));

    fetch("http://localhost/api/list.php")
      .then((res) => res.json())
      .then((data) => setBodyData(data.data.rows));
  }, []);
//   useEffect(() => {
//     const url = `http://localhost/api/list.php?s=${search}`;
//     fetch(url)
//       .then((res) => res.json())
//       .then((data) => setItemSearch(data.data.rows.map((e) => e.name)));    
//   }, [search]);
  useEffect(() => {setItemSearch(bodyData.filter((list) => {
    return list.name.toLowerCase().includes(search.toLowerCase());
  }))}, [search,bodyData])

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  console.log(bodyData);
  return (
    <div>
      <h1>List table</h1>
      <div>
        <p>Search any list item </p>
        <input
          type="text"
          onChange={handleChange}
          placeholder="search list item by name"
        ></input>
        <p>Serched Item = {search.length || 0}</p>
        <p>Serched Item = {itemSearch.length}</p>
      </div>
      <striped bordered hover>
        <thead>
          <tr>
            <th>{header.id?.title}</th>
            <th>{header.name?.title}</th>
            <th>{header.message?.title}</th>
            <th>{header.created_at?.title}</th>
          </tr>
        </thead>
        <tbody>
          {bodyData.map((list) => (
            <ListRow list={list} />
          ))}
        </tbody>
      </striped>
    </div>
  );
};

export default List;
