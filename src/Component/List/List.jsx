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
  useEffect(() => {
    setItemSearch(
      bodyData.filter((list) => {
        return list.name.toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [search, bodyData]);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  console.log(bodyData);
  return (
    <div class="row auto badge bg-success border border-5 text-wrap rounded  " >
      <h1>List table</h1>
      <div class="input-group input-group-sm mb-3 ">
        <span class="input-group-text">Search any item by name</span>
        <input
          type="text"
          onChange={handleChange}
          placeholder="search list item by name"
        ></input>
        <p class = " bd-highligh  text-sm-start px-3 ">Searched Item Length = {search.length || 0}</p>
        <p class = " bd-highligh  text-sm-start px-3">Found Item = {itemSearch.length}</p>
      </div>
      <table class="table table-primary ">
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
      </table>
    </div>
  );
};

export default List;
