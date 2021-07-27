import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import './cowin.css'
import axios from 'axios'
var crypto = require('crypto');
function CoWin() {
    // const [isLoading, setLoading] = useState(true);
    // const [Datas, setDatas] = useState({})
    const MINUTE_MS = 600000;
    const [MobileNO, setMobileNO] = useState("")
    const [Otp, setOtp] = useState("")
    const [Token, setToken] = useState("")
    var history =useHistory()
    
    const OnMobileNoChange = (ev) => {
        setMobileNO(ev.target.value)
    }
    const OnOtpChange = (ev) => {
        setOtp(ev.target.value)
    }
    const getOtp = (ev) => {
        ev.preventDefault()
        axios.post("https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP", {
            "mobile": MobileNO
        })
            .then((res) => {
                setToken(res.data.txnId)
                // localStorage.setItem("token", res.data.txnId)
            }, (err) => {
                console.log(err.response)
            })
    }
    const confirmOtp = (ev) => {
        ev.preventDefault()
        // let token = localStorage.getItem("token")
        var hash = crypto.createHash('sha256').update(Otp).digest('hex');
        console.log(Token)
        console.log(hash.toString())
        axios.post("https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP", {
            "otp": hash,
            "txnId": Token
        }).then((res) => {
            if(res.status===200){
                alert("verified sucessfully")
                // history.push(`/appoinments/${res.data.Token}`)
                history.push('/vaccine')
                console.log(res.data)
            }
            else{
                alert("invalid credentials")
            }
           

        }, (err) => {
            alert(err.response.data)
            console.log(err.response.data)
        })
    }
    useEffect(() => {
        const interval = setInterval(() => {
            // console.log('Logs every minute');
            // axios.get("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=680005&date=31-07-2021")
            // .then((res) => {
            //     setDatas(res.data)
            // setLoading(false);
            //     console.log(res)
            // })

        }, [MINUTE_MS]);
        return () => {
            clearInterval(interval);
        }
    }, [])


    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }
    return (
        <div>
            <div className="wraper">
                <Form className="form">
                    <Form.Group className="mb-3">
                        <Form.Label>Mobile number</Form.Label>
                        <Form.Control type="text" onChange={OnMobileNoChange} placeholder="Enter mobile number" />
                    </Form.Group>
                    <Button variant="primary" onClick={getOtp} type="submit">
                        get otp
                    </Button>
                    <Form.Group className="mb-3">
                        <Form.Label>OTP</Form.Label>
                        <Form.Control type="text" onChange={OnOtpChange} placeholder="enter otp" />
                    </Form.Group>

                    <Button variant="secondary" onClick={confirmOtp} type="submit">
                        confirm otp
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default CoWin
