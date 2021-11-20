import React , {useRef} from 'react';

const AddUser = () => {

const nameRef = useRef();
const emailRef = useRef();
const handleAddUser = event =>{

    const name = nameRef.current.value 
    const email = emailRef.current.value

    const newUser = {name , email}

    fetch('http://localhost:8000/users',{
        method:'POST',
        headers: {'content-type':'application/json'},
        body:JSON.stringify(newUser)
    })
    .then(res => res.json())
    .then(data =>{

        if(data.insertedId){
            alert('new user has been inserted')
            event.target.reset()
        }
    })

    event.preventDefault();
}


    return (
        <div>
            <h2>Please Add a User</h2>
            <form onSubmit={handleAddUser}>
                <input type='text' ref={nameRef} />
                <input type='email' ref={emailRef} />
                <input type='submit' value='Add User' />
            </form>
        </div>
    );
};

export default AddUser;