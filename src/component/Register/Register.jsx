import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Joi, { valid } from 'joi'
import { Link, useNavigate } from 'react-router-dom';
import loginImg from "../image/login.jpeg"
import './Register.modules.scss'
import Loging from '../Login/Login'

const Register = () => {

    let [user, setUser] = useState({
        first_name: '',
        last_name: '',
        age: 0,
        email: '',
        password: ''

    })

    let [vError, setVError] = useState([])
    let [apiError, setApiError] = useState(null)
    let [loading, setLoading] = useState(false)
    let navigate = useNavigate()

    function Validate() {

        let scheme = Joi.object({
            first_name: Joi.string().min(3).max(10).required(),
            last_name: Joi.string().min(3).max(10).required(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,10}$')).messages({ 'string.pattern.base': 'invalid password' }),
            age: Joi.number().min(16).max(35).required()
        })
        let validation = scheme.validate(user)
        let res = scheme.validate(user, { abortEarly: false });
        console.log(res);
        if (res.error) {
            setVError(res.error.details)
            return false
        } else {
            return true
        }

    }
    function getUserData(e) {
        let currentUser = { ...user };
        currentUser[e.target.name] = e.target.value;
        setUser(currentUser)
    }

    async function register(e) {
        e.preventDefault()
        if (Validate()) {
            setLoading(true)
            let { data } = await axios.post('https://route-egypt-api.herokuapp.com/signup', user)
            console.log(data);
            if (data.message == "success") {
                navigate('/Login')
                setLoading(false)
                setApiError(null)
            } else {
                setApiError(data.message)
                setLoading(false)
            }
        }

    }
    useEffect(() => {
        console.log(user);
    }, [user])
    return <>
        <section className='registerPage shadow-lg'>
            <div className="container ">
                <div className="row ">
                    <div className=" col-md-6">
                        <img src={loginImg} alt="" className='w-100' />
                    </div>
                    <div className="col-md-6 pt-4 ">
                        <h4 className='text-white'>Creat my account</h4>

                        {apiError && <div className='alert alert-danger'>{apiError}</div>}
                        <form className="row text-danger">
                            <div className="col-md-6">
                                <label for="inputFName4" className="form-label"></label>
                                <input type="text" name='first_name' onChange={(e) => getUserData(e)} className="form-control" id="inputFName4" placeholder='First Name' />

                                {vError.filter(ele => ele.context.label == 'first_name')[0]?.message}
                            </div>
                            <div className="col-md-6">
                                <label for="inputSName4" className="form-label"></label>
                                <input type="text" name='last_name' onChange={(e) => getUserData(e)} className="form-control" id="inputSName4" placeholder='Last Name' />
                                {vError.filter(ele => ele.context.label == 'last_name')[0]?.message}
                            </div>
                            <div className="col-12">
                                <label for="inputEmail" className="form-label"></label>
                                <input type="email" name='email' onChange={(e) => getUserData(e)} className="form-control" id="inputEmail" placeholder="Email" />
                                {vError.filter(ele => ele.context.label == 'email')[0]?.message}

                            </div>
                            <div className="col-12">
                                <label for="inputAge" className="form-label"></label>
                                <input type="number" name='age' onChange={(e) => getUserData(e)} className="form-control" id="inputAge" placeholder="Age  " />

                                {vError.filter(ele => ele.context.label == 'age')[0]?.message}
                            </div>
                            <div className="col-12">
                                <label for="inputpassword" className="form-label"></label>
                                <input type="password" name='password' onChange={(e) => getUserData(e)} className="form-control" id="inputpassword" placeholder="New Password" />

                                {vError.filter(ele => ele.context.label == 'password')[0]?.message}
                            </div>

                            <div class="col-12 mt-3 creat text-black">
                                <button onClick={(e) => register(e)} type="submit" className="btn text-info w-100">{loading ? <i className='fa fas-spinner fa-spin text-danger'></i> : "Signup"}</button>
                            </div>

                            <p className='line'>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>
                            <p className='mb-4'>already login? <Link>login</Link></p>
                        </form>

                    </div>
                </div>
            </div>
        </section>


    </>;
}


export default Register;