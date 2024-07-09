import { useEffect, useState } from "react"
import Navbar from "./components/Navbar/Navbar"
import axios from 'axios'
import './Page2.css'

const Page2 = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {

        axios.get('https://projectform-dqcx.onrender.com/getData')
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
            const response = await axios.get(`https://projectform-dqcx.onrender.com/fetchData/${i}`)
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

    const hello = (ageee) => {
        let data = ageee;
        let dob = new Date(data);
        let day = dob.getDate();
        let month = dob.getMonth();
        let year = dob.getFullYear();

        let now = new Date();
        console.log(now);
        let yearDiff = now.getFullYear() - year;
        let monthDiff = now.getMonth() - month;
        let dateDiff = now.getDate() - day;

        if (yearDiff < 0) console.log("invalid date");
        else if (monthDiff > 0) {
            console.log(yearDiff);
        } else if (monthDiff === 0 && dateDiff >= 0) {
            console.log(yearDiff);
        } else {
            yearDiff = yearDiff - 1;
            if (monthDiff <= 0)
                if (dateDiff > 0) monthDiff = 12 + monthDiff;
                else monthDiff = 11 - monthDiff;
        }
        if (dateDiff < 0) {
            dateDiff = 30 + dateDiff;
            monthDiff -= 1;
        }

        if (yearDiff < 0)
            return (<p className="text2">Invalid DOB</p>)
        else
            return <p className="text2">Age: {yearDiff}</p>

        // document.getElementById("currentAge").innerHTML =
        //     "Your current Age is " + yearDiff + " years "
        //     + monthDiff + " months " + dateDiff + " days";



    }


    return (
        <div>
            <Navbar />
            <div className="container1">

                <h3>Name</h3>
                {
                    users.map((user, pos) => {
                        return (
                            <div className="contents"><p onClick={() => toggleModal(user._id)}>{pos + 1} {user.name}</p></div>

                        )
                    })
                }

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
                            {data.length > 0 && hello(data[0].dob)}
                            {/* {data.length > 0 && <p className="text2">Age: {2024 - parseInt((data[0].dob).substr(0, 4))}</p>} */}
                            {data.length > 0 && <p className="text2">DOB: {data[0].dob}</p>}
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