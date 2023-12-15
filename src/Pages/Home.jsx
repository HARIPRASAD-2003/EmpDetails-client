import React,{useEffect, useState} from 'react'
import './Home.css'
const Home = () => {

    const baseURL = "https://emp-details-server.onrender.com";
    const [userData, setUserData] = useState([]);
    const [create, setCreate] = useState(false);
    const [update, setUpdate] = useState(false);
    const [del, setDel] = useState(false);
    const [updatedEmpname, setUpdatedEmpname] = useState("");
    const [updatedDept, setUpdatedDept] = useState("");
    const [updatedDesignation, setUpdatedDesignation] = useState("");
    const [updatedAddress, setUpdatedAddress] = useState("");
    const [updatedSalary, setUpdatedSalary] = useState("");
    const [updatedDob, setUpdatedDob] = useState("");
    const [delEmpId, setDelEmpId] = useState("");
    const [connect, setConnect] = useState("");


    const handleUpdateClick = (user) => {
        setDelEmpId(user.id);
        setUpdatedSalary(user.sal);
        setUpdatedEmpname(user.emp_name);
        setUpdatedAddress(user.address);
        setUpdatedDept(user.dept);
        setUpdatedDesignation(user.des);
        setUpdatedDob(user.dob);
        setUpdate(true);
    }

    const handleUpdate = async() => {
        try {
            const response = await fetch(baseURL + '/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: delEmpId,
                    name: updatedEmpname,
                    dept: updatedDept,
                    des: updatedDesignation,
                    sal: updatedSalary,
                    dob: updatedDob,
                    address: updatedAddress

                })
            });
            if(!response.ok){
                throw new Error("res not OK!!");
            }
            fetchData();     
            handleCancel(); 
        } catch (Error) {
            console.log(Error);
        }      
    }
    
    const handleCreate = async() => {
        try {
            const response = await fetch(baseURL + '/newEmp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: updatedEmpname,
                    dept: updatedDept,
                    des: updatedDesignation,
                    sal: updatedSalary,
                    dob: updatedDob,
                    address: updatedAddress

                })
            });
            if(!response.ok){
                throw new Error("res not OK!!");
            }
            fetchData();     
            handleCancel();       
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async() => {
        try{
            const response = await fetch(baseURL + "/delEmp", {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: delEmpId,
                })
            });
            if(!response.ok){
                throw new Error("res.not OK");
            }
            fetchData();
            handleCancel();
        } catch(error){
            console.log(error)
        }
    }

    const handleDeleteClick = (user) => {
        setDelEmpId(user.id)
        setDel(true);
    }

    const handleDateChange = (e) => {
        const dateValue = new Date(e.target.value);
        const formattedDate = dateValue.toISOString().split('T')[0]; 
        setUpdatedDob(formattedDate);
    };

    const handleCancel = () => {
        setUpdatedAddress("");
        setUpdatedDept("");
        setUpdatedDesignation("");
        setUpdatedDob("");
        setUpdatedEmpname("");
        setUpdatedSalary("");
        setCreate(false);
        setDelEmpId("");
        setUpdate(false);
        setDel(false);
    }
    const fetchData = async() => {
        try{
            const response = await fetch(baseURL+'/getEmp');
            if(!response.ok)
                throw new Error("res not OK!!!");
            const data = await response.json();
            
            setUserData(data);
            console.log(data);
        } catch(Error){
            console.log(Error);
        }
    }
    const checkConnect = async() => {
        try{
        const response = await fetch(baseURL+"/check");
        if (!response.ok) throw new Error("res not ok!!");
        const text = await response.json();
        setConnect(text.data);
        } catch(Error){
            setConnect("Error: Not Connected")
        }
    }
    useEffect(()=>{
        checkConnect();
        fetchData();
    },[])

  return (
    <div>

        <div className='Main'>
            <div className='Home'>
                <h1>Employee Details</h1>
                <h3>{connect}</h3>
            </div>
            <div className='options'>
                <button onClick={() => setCreate(true)}>Add Employee</button>
            </div>
            {create && (
                <div >
                <div className='ModalOverlay'></div>
                <div style={{width: "50%"}} className='Modal'>
                    <h2>Create Employee</h2>
                    <div style={{width: "100%"}} className='ModalContent'>

                    <label htmlFor="updatedEmpname">Name:</label>
                    <input
                        type='text'
                        id="updatedEmpname"
                        value={updatedEmpname}
                        onChange={(e) => setUpdatedEmpname(e.target.value)}
                    />
                    <label htmlFor="updatedDept">Department:</label>
                    <input
                        type='text'
                        id="updatedDept"
                        value={updatedDept}
                        onChange={(e) => setUpdatedDept(e.target.value)}
                    />
                    <label htmlFor="updatedDesignation">Designation:</label>
                    <input
                        type='text'
                        id="updatedDesignation"
                        value={updatedDesignation}
                        onChange={(e) => setUpdatedDesignation(e.target.value)}
                    />
                    <label htmlFor="updatedSalary">Salary:</label>
                    <input
                        type='text'
                        id="updatedSalary"
                        value={updatedSalary}
                        onChange={(e) => setUpdatedSalary(e.target.value)}
                    />
                    
                    <label htmlFor="updatedAddress">Address:</label>
                    <input
                        type='text'
                        id="updatedAddress"
                        value={updatedAddress}
                        onChange={(e) => setUpdatedAddress(e.target.value)}
                    />

                    <label htmlFor="updatedDOB">Date of Birth</label>
                    <input
                        type='date'
                        id="updatedDOB"
                        value={updatedDob}
                        onChange={(e) => setUpdatedDob(e.target.value)}
                    />

                    </div>
                    <div className='options'>
                        <button style={{backgroundColor: "green"}} onClick={() => handleCreate()}>Create</button>
                        <button style={{backgroundColor: "red"}} onClick={() => handleCancel()}>Cancel</button>
                    </div>
                </div>
                </div>
            )}
            {update && (<div >
                <div className='ModalOverlay'></div>
                <div style={{width: "50%"}} className='Modal'>
                    <h2>Create Employee</h2>
                    <div style={{width: "100%"}} className='ModalContent'>

                    <label htmlFor="updatedEmpname">Name:</label>
                    <input
                        type='text'
                        id="updatedEmpname"
                        value={updatedEmpname}
                        onChange={(e) => setUpdatedEmpname(e.target.value)}
                    />
                    <label htmlFor="updatedDept">Department:</label>
                    <input
                        type='text'
                        id="updatedDept"
                        value={updatedDept}
                        onChange={(e) => setUpdatedDept(e.target.value)}
                    />
                    <label htmlFor="updatedDesignation">Designation:</label>
                    <input
                        type='text'
                        id="updatedDesignation"
                        value={updatedDesignation}
                        onChange={(e) => setUpdatedDesignation(e.target.value)}
                    />
                    <label htmlFor="updatedSalary">Salary:</label>
                    <input
                        type='text'
                        id="updatedSalary"
                        value={updatedSalary}
                        onChange={(e) => setUpdatedSalary(e.target.value)}
                    />
                    
                    <label htmlFor="updatedAddress">Address:</label>
                    <input
                        type='text'
                        id="updatedAddress"
                        value={updatedAddress}
                        onChange={(e) => setUpdatedAddress(e.target.value)}
                    />

                    <label htmlFor="updatedDOB">Date of Birth</label>
                    <input
                        type='date'
                        id="updatedDOB"
                        value={updatedDob}
                        onChange={(e) => handleDateChange(e)}
                    />

                    </div>
                    <div className='options'>
                        <button style={{backgroundColor: "green"}} onClick={() => handleUpdate()}>Update</button>
                        <button style={{backgroundColor: "red"}} onClick={() => handleCancel()}>Cancel</button>
                    </div>
                </div>
                </div>
                )}
            {del && (<div >
                <div className='ModalOverlay'></div>
                <div style={{width: "50%"}} className='Modal'>
                    Are You Sure?? Do you want to Delete the selected Employee??
                    <div className='options'>
                        <button style={{backgroundColor: "green"}} onClick={() => handleDelete()}>Delete</button>
                        <button style={{backgroundColor: "red"}} onClick={() => handleCancel()}>Cancel</button>
                    </div>
                </div>
                </div>)}
            <div className='Table'>
                <table className='Table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Dept</th>
                            <th>Designation</th>
                            <th>Salary</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {(userData.length>0) ?
                    userData?.map((user) => (
                            <tr key={user.id}>
                                <td className='tdcenter'>{user.id}</td>
                                <td>{user.emp_name}</td>
                                <td className='tdcenter'>{user.age}</td>
                                <td className='tdcenter'>{user.dept}</td>
                                <td className='tdcenter'>{user.des}</td>
                                <td className='tdcenter'>{user.sal}</td>
                                <td>{user.address}</td>
                                <td style={{justifyContent: "space-between"}}>
                                    <button style={{backgroundColor: "green"}} onClick={()=>handleUpdateClick(user)}>Edit</button>
                                    <span> </span>
                                    <button style={{backgroundColor: "red"}} onClick={()=>handleDeleteClick(user)}>DELETE</button>
                                </td>
                            </tr> 
                            ))
                            :   
                            <tr>
                                <td>No Data Found!!!</td>
                            </tr>
                        }
                            </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default Home