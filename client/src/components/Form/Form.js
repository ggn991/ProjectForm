import React, { useState } from 'react'
import './Form.css'
import './Modal.css'

const Navbar = () => {
    const [valid, setValid] = useState(true)
    const [modal, setModal] = useState(false);
    const [name, setName] = useState("");
    const [dob, setDob] = useState("");
    const [ad, setAd] = useState("");
    const [add, setAdd] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pin, setPin] = useState("");
    const [pic, setPic] = useState("");

    const toggleModal = () => {
        setModal(!modal);
        setName("");
        setDob("");
        setAd("");
        setAdd("");
        setCity("");
        setState("");
        setPin("");
        setPic("");
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    const collectData = async (e) => {
        e.preventDefault();
        if (valid) {

            try {
                toggleModal();
                const response = await fetch('https://projectform-dqcx.onrender.com/', {
                    method: 'post',
                    body: JSON.stringify({ name, dob, ad, add, city, state, pin, pic }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const result = await response.json();
                console.log(result);
            }
            catch (error) {
                console.error(error);
                console.log(error)
            }
        }
    }

    function convertToBase64(e) {
        const reader = new FileReader()

        reader.readAsDataURL(e.target.files[0]);

        reader.onload = () => {
            console.log(reader.result)
            setPic(reader.result)
            console.log(reader.result)
        }
    }

    return (
        <div className="container">
            <form onSubmit={(e) => { collectData(e) }}>

                <div className="row">
                    <h4>Full Name</h4>
                    <div className="input-group input-group-icon">
                        <input type="text" placeholder="" value={name} required onChange={(e) => setName(e.target.value)} />
                    </div>
                </div>

                <div className="row">
                    <h4>Date of Birth</h4>
                    <div className="input-group">
                        <div className="input-group input-group-icon">
                            <input type="date" placeholder="" value={dob} required onChange={(e) => setDob(e.target.value)} />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <h4>Address</h4>
                    <div className="input-group input-group-icon">
                        <input type="text" placeholder="Address Line 1" value={ad} required onChange={(e) => setAd(e.target.value)} />
                    </div>
                    <div className="input-group input-group-icon">
                        <input type="text" placeholder="Address Line 2" value={add} required onChange={(e) => setAdd(e.target.value)} />
                    </div>
                </div>

                <div className="row">
                    <h4>City</h4>
                    <div className="input-group input-group-icon">
                        <input type="text" placeholder="" value={city} required onChange={(e) => setCity(e.target.value)} />
                    </div>
                </div>

                <div className="row">
                    <h4>State</h4>
                    <div className="input-group input-group-icon">
                        <input type="text" placeholder=" " value={state} required onChange={(e) => setState(e.target.value)} />
                    </div>
                </div>

                <div className="row">
                    <h4>Pin Code</h4>
                    <div className="input-group input-group-icon">
                        <input type="text" placeholder=" " required value={pin} onChange={(e) => setPin(e.target.value)} />
                    </div>
                </div>

                <div className="row">
                    <h4>Upload Image</h4>
                    {!valid && <p className='valid'>Max Size is 1MB & Type jpg/jpeg/png</p>}
                    <div className="input-group input-group-icon">
                        <input
                            type='file'
                            accept='.jpg, .png, .jpeg'
                            id='image'
                            required
                            name='Upload image'
                            onChange={(e) => {
                                if (
                                    e.target.files[0].size < 1048576 &&
                                    (e.target.files[0].type === "image/jpeg" ||
                                        e.target.files[0].type === "image/jpg" ||
                                        e.target.files[0].type === "image/png")
                                ) {
                                    setValid(true);
                                    convertToBase64(e);
                                } else {
                                    setValid(false);
                                }
                            }}

                        />
                    </div>
                </div>

                <div className='row'><input className="btn" type='submit' /></div>

                {modal && (
                    <div className="modal">
                        <div onClick={toggleModal} className="overlay"></div>
                        <div className="modal-content">
                            <h5>Form Submitted Successfully</h5>
                        </div>
                    </div>
                )}

            </form>
        </div>
    )
}

export default Navbar