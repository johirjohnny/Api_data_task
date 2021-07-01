import React from "react";

const ListRow = ({ list }) => {
  const { id, name, message, created_at } = list;

  
  return (
      
        <tr>
          <td>{id}</td>
          <td>{name}</td>
          <td>{message}</td>
          <td>{created_at}</td>
        </tr>
      
      
   
  );
};

export default ListRow;
