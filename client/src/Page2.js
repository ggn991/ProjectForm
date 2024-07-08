import { useEffect, useState } from "react"
import Navbar from "./components/Navbar/Navbar"
import axios from 'axios'
import './Page2.css'
import { set } from "mongoose"

const Page2 = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {

        axios.get('http://localhost:4000/getData')
            .then(users => setUsers(users.data))
            .catch(err => console.log(err))

    }, [])

    const [modal, setModal] = useState(false);
    const [id, setId] = useState("");
    const [age, setAge] = useState("");

    const [data, setData] = useState([])

    const toggleModal = async (i) => {
        setModal(!modal);
        setId(i)
        try {
            const response = await axios.get(`http://localhost:4000/fetchData/${i}`)
            setData(response.data)
            console.log(data)
        }



        catch (err) {
            console.log(err)
        }
    };


    // useEffect(() => {
    //     if (data) {
    //         setData(data);
    //         const a=data[0].date
    //         console.log(a)
    //     }


    // }, [data]);

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }



    return (
        <div>
            <Navbar />
            <div className="container1">
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                Name
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            users.map(user => {
                                return (
                                    <tr>
                                        <td onClick={() => toggleModal(user._id)}>{user.name}</td>
                                    </tr>)
                            })
                        }
                    </tbody>
                </table>
            </div>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        {/* <h5>Form Submitted Successfully</h5> */}
                        {/* <p>{id}</p> */}
                        {data.length > 0 && <img className="image" src={data[0].pic} />}
                        {data.length > 0 && <p className="text">{data[0].name}</p>}
                        <div className="divv1">

                            {data.length > 0 && <p  className="text2">Age: {2024 - parseInt((data[0].dob).substr(0, 4))}</p>}
                            {data.length > 0 && <p  className="text2">DOB: {data[0].dob}</p>}
                        </div>

                        {data.length > 0 && <p className="text2">Address: {data[0].ad} {data[0].add}</p>}

                        {data.length > 0 && <p className="text3">City: {data[0].city}</p>}
                        <div className="divv1">
                            {data.length > 0 && <p className="text2">State: {data[0].state}</p>}
                            {data.length > 0 && <p className="text2">Pin Code: {data[0].pin}</p>}
                        </div>

                    </div>
                </div>
            )}

        </div>


    )
}

export default Page2