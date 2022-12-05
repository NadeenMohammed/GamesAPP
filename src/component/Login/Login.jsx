import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Joi, { valid } from 'joi'
import { Link, useNavigate } from 'react-router-dom';
import loginImg from "../image/login.jpeg"
import logo from "../image/logo.png"
import './Login.modules.scss'

const Login = (saveUserData) => {

    let [user, setUser] = useState({
       
        email: '',
        password: ''

    })

    let [vError, setVError] = useState([])
    let [apiError, setApiError] = useState(null)
    let [loading, setLoading] = useState(false)
    let navigate = useNavigate()

    function Validate() {

        let scheme = Joi.object({
           
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,10}$')).messages({ 'string.pattern.base': 'invalid password' }),
            
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

    async function Login(e) {
        e.preventDefault()
        if (Validate()) {
            setLoading(true)
            let { data } = await axios.post('https://route-egypt-api.herokuapp.com/signup', user)
            console.log(data);
            if (data.message == "success") {
                localStorage.setItem("token",data.token)
                saveUserData()
                navigate('/Home')
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
        <section className='LoginPage shadow-lg'>
            <div className="container ">
                <div className="row mt-5">
                    <div className=" col-lg-6 col-md-4 ">
                        <img src={loginImg} alt="" className='w-100' />
                    </div>
                    <div className="col-lg-6 col-md-9 pt-4 text-center ">

                        <img src={logo} alt=""  className='w-50 '/>
                        {apiError && <div className='alert alert-danger'>{apiError}</div>}
                        <form className="row text-danger">


                            <div className="col-12">
                                <label for="inputEmail" className="form-label"></label>
                                <input type="email" name='email' onChange={(e) => getUserData(e)} className="form-control" id="inputEmail" placeholder="Email" />
                                {vError.filter(ele => ele.context.label == 'email')[0]?.message}

                            </div>

                            <div className="col-12">
                                <label for="inputpassword" className="form-label"></label>
                                <input type="password" name='password' onChange={(e) => getUserData(e)} className="form-control" id="inputpassword" placeholder="New Password" />

                                {vError.filter(ele => ele.context.label == 'password')[0]?.message}
                            </div>

                            <div class="col-12 mt-3 creat text-black">
                                <button onClick={(e) => Login(e)} type="submit" className="btn text-info w-100">{loading ? <i className='fa fas-spinner fa-spin text-danger'></i> : "Signin"}</button>
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


export default Login;