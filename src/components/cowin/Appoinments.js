import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import {useParams} from 'react-router-dom'
import {  Card } from 'react-bootstrap'
function Appoinments() {
    
    var token=useParams()
    useEffect(() => {
        axios.get(`https://cdndemo-api.co-vin.in/api/v2/appointment/beneficiaries`,{
            token
        })
        .then((res) => {
          console.log(res.data)
        })
        return () => {
            
        }
    }, [])
    return (
        <div>
            <div className=" vw-100 vh-100 d-flex flex-column align-items-center" style={{backgroundColor:"#e0e3c3"}}>
                <Card border="secondary" style={{ width: '18rem' ,position:"relative", top:"10vh" }}>
                    <Card.Header>Header</Card.Header>
                    <Card.Body>
                        <Card.Title>Secondary Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk
                            of the card's content.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>

        </div>
    )
}

export default Appoinments
