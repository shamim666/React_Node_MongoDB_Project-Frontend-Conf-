import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {

const [users , setUsers] = useState([])


useEffect( ()=>{

    fetch('http://localhost:8000/users')
    .then(res => res.json())
    .then(data => setUsers(data))


}, [])


const handleDeleteUser = id =>{

    const proceed = window.confirm('Are you sure want to delete ?')

    if(proceed){

        const url = `http://localhost:8000/users/${id}`
        fetch(url,{
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data =>{
            if(data.deletedCount > 0){
                alert('deleted successfully')
                const remainingUsers = users.filter(user => user._id !== id)
                setUsers(remainingUsers);
            }
        })
    }
}



    return (
        <div>
            <h2>Users Available : {users.length} </h2>
            <ul>
                {
                   users.map( user => <li key={user._id}>name:{user.name}; email: {user.email} 
                   
                   {/* it will take to App.js dynamic route section */}
                    <Link to = {`/users/update/${user._id}`} > <button>update</button></Link>
                   <button onClick={() => handleDeleteUser(user._id)}>X</button>
                   
                   </li> ) 
                }
            </ul>
        </div>
    );
};

export default Users;