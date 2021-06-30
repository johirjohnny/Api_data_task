import React, { useEffect, useState } from 'react';

const List = () => {
    const [header, setHeader] = useState({});      //hooks for call header name
    const [bodyData, setBodyData] = useState({}); // hooks for call the body data
    useEffect (()=>{
        fetch('http://localhost/api/list.php')        // call api to load the header data
        .then(res =>res.json())
        .then (data => setHeader(data.data.headers[0]))
    },[])


    return (
        <div >
            <h1>List table</h1>
            
                <></>
                < striped bordered hove>
                    <thead>
                        <tr>
                        <th>{header.id?.title}</th>
                        <th>{header.name?.title}</th>
                        <th>{header.message?.title}</th>
                        <th>{header.created_at?.title}</th>
                        <th>{header.created_at?.title}</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>{}</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        </tr>
                        <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        </tr>
                        <tr>
                        <td>3</td>
                        <td colSpan="2">Larry the Bird</td>
                        <td>@twitter</td>
                        </tr>
                    </tbody>
                </striped>
            
        </div>
    );
};

export default List;