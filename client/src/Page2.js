import { useEffect, useState } from "react"
import Navbar from "./components/Navbar/Navbar"
import axios from 'axios'

const Page2 = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {

        axios.get('http://localhost:4000/getData')
            .then(users => setUsers(users.data))
            .catch(err => console.log(err))

    }, [])
    return (
        <div>
            {/* <Navbar /> */}
            <div>
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
                                    <td>{user.name}</td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>


    )
}

export default Page2