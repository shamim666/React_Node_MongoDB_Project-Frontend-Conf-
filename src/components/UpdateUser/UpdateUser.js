import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const UpdateUser = () => {


    const [user, setUser] = useState({});
    const { id } = useParams();



    // this useEffect() is used to get the specific user's info by id  
    useEffect(() => {

        fetch(`http://localhost:8000/users/${id}`)
            .then(res => res.json())
            .then(data => setUser(data))
    }, [])



 // to make the name field editable
    const handleUpdateName = (event) => {

        const updatedName = event.target.value
        const updatedUser = { name: updatedName, email: user.email }
        setUser(updatedUser);

    }

// to make the email field editable
    const handleUpdateEmail = (event) => {

        const updatedEmail = event.target.value
        // const updatedUser = {...user}
        // updatedUser.email = updatedEmail 
        const updatedUser = { name: user.name, email: updatedEmail }
        setUser(updatedUser);

    }




    // this section is used to update the loaded user 
    const handleUpdateUser = (event) => {
        const url = `http://localhost:8000/users/${id}`
        fetch(url , {
            method:'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                alert('updated successfully')
                setUser({})
            }
        })

        event.preventDefault();

    }





    return (
        <div>
            <h2>user:{user.name}</h2>
            <small>{id}</small>
            <form onSubmit={handleUpdateUser}>
                <input type="text" onChange={handleUpdateName} value={user.name || ''} />
                <input type="email" onChange={handleUpdateEmail} value={user.email || ''} />
                <input type="submit" value="Update" />
            </form>
        </div>
    );
};

export default UpdateUser;