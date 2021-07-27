import React, { useState, useEffect } from 'react'
import './vaccine.css'
// import Dropdown from 'react-dropdown';
import { Button, Card } from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import 'react-dropdown/style.css';
import { Container, Row, Col } from 'react-grid-system';
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import CheckboxesGroup from './checkbox'
function Vaccine() {
    // const [StateId, setStateId] = useState("")
    const [DistrictId, setDistrictId] = useState("")
    const [StateData, setStateData] = useState([{}])
    const [DistrictData, setDistrictData] = useState([{}])
    const [DataSet, setDataSet] = useState([{}])
    const [isTrue, setisTrue] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [tempdate, settempdate] = useState('')
    const history =useHistory()

    // const [Color, setColor] = useState(false)
    const [isLoading, setLoading] = useState(true);
    const MINUTE_MS = 5000;

    const [CheckBoxData, setCheckBoxData] = useState({})
    // console.log(CheckBoxData)
    useEffect(() => {
        const interval = setInterval(() => {
            axios.get("https://cdn-api.co-vin.in/api/v2/admin/location/states")
                .then((res) => {
                    setStateData(res.data.states)
                    // console.log(StateData)
                })
            setLoading(false);
        }, [MINUTE_MS]);
        return () => {
            clearInterval(interval);
        }

    }, [])
    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleDateChange = (date) => {
        // console.log(date)
        // console.log(moment(date).format("DD-MM-yyyy"))
        settempdate(moment(date).format("DD-MM-yyyy"))
        setSelectedDate(date);
    };

    // const defaultOption = options[0];
    const selectState = (ev, val) => {
        // console.log(ev)
        axios.get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${val}`)
            .then((res) => {
                // console.log(res.data.districts)
                setDistrictData(res.data.districts)
            })
    }
    const selectDistrict = (ev) => {
        // alert(ev)
        setDistrictId(ev)
    }
    const onHandleSubmit = (ev) => {
        ev.preventDefault()
        axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${DistrictId}&date=${tempdate}`)
            .then((res) => {
                // console.log(res.data.sessions)
                setDataSet(res.data.sessions)
                setisTrue(true)
            })
    }
    // const onFilter18Blow=()=>{
    //     return DataSet.sort((a, b) => b.available_capacity - a.available_capacity)
    // }
    // const onFilter18to44=()=>{
    //     return DataSet.sort((a, b) => b.available_capacity - a.available_capacity)
    // }
    // const onFilter45Above=()=>{
    //     return DataSet.sort((a, b) => b.available_capacity - a.available_capacity)
    // }

    // const sortData = () => {
    //     return DataSet.sort((a, b) => b.available_capacity - a.available_capacity)
    // }
    const updateCheckBox=(checkBox)=>{
        setCheckBoxData(checkBox)
    }
    const filterData=()=>{

        if(CheckBoxData.below18===false &&CheckBoxData.between18and44===false && CheckBoxData.above45===false )
       {
        return DataSet;
       }
       else if(CheckBoxData.below18===true && CheckBoxData.between18and44===false && CheckBoxData.above45===false ){
        return DataSet.filter((itm) => (itm.min_age_limit === 17))
       }
       else if(CheckBoxData.below18===false && CheckBoxData.between18and44===true && CheckBoxData.above45===false ){
        return DataSet.filter((itm) => (itm.min_age_limit === 18))
       }
       else if(CheckBoxData.below18===false && CheckBoxData.between18and44===false && CheckBoxData.above45===true ){
        return DataSet.filter((itm) => (itm.min_age_limit === 45))
       }
       else if(CheckBoxData.below18===false && CheckBoxData.between18and44===true && CheckBoxData.above45===true ){
        let Datas={}  
        Datas= DataSet.filter((itm) => (itm.min_age_limit === 18))
        return Datas.concat(DataSet.filter((itm) => (itm.min_age_limit === 45))) 
       }
       else{
           return DataSet
       }
    }
    const onNotifyClick=()=>{
        history.push('/notification')
    }
    // console.log(StateData)
    return (
        <div>
            <Container className="form">
                <Row>
                    <Col sm={6}>

                        <Autocomplete
                            id="combo-box-demo1"
                            options={StateData}
                            getOptionLabel={(option) => option.state_name ? option.state_name : ''}
                            style={{ width: 300 }}
                            onChange={(event, value) => selectState(event, value?.state_id)}
                            renderInput={(params) => <TextField {...params} label="select state" variant="outlined" />}

                        />

                    </Col>
                    <Col sm={6}>
                        <Autocomplete
                            id="combo-box-demo2"
                            options={DistrictData}
                            getOptionLabel={(option) => option.district_name ? option.district_name : ''}
                            style={{ width: 300 }}
                            onChange={(event, value) => selectDistrict(value?.district_id)}
                            renderInput={(params) => <TextField {...params} label=" select district" variant="outlined" />}
                        />
                    </Col>
                </Row>
                <Row className="submit-button">
                    <Col sm={4}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Date picker dialog"
                                format="MM/dd/yyyy"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Col>

                    <Col sm={4} className="d-flex align-items-center justify-content-center">
                        <Button variant="primary" onClick={onHandleSubmit} type="submit" style={{marginRight:"10px"}}>
                            check
                        </Button>
                        <Button onClick={onNotifyClick} variant="danger">notify me</Button>
                    </Col>
                    <Col sm={4} className="d-flex ">

                        <CheckboxesGroup
                            onCheckBoxChecked={updateCheckBox}
                        ></CheckboxesGroup> 
                        {/* <CheckboxesGroup
                            onCheckBoxChecked={updateCheckBox}
                        ></CheckboxesGroup>      */}

                    </Col>
                </Row>

                <Row className="cards">
                    <Col sm={12}>
                        {
                           filterData().sort((a, b) => b.available_capacity - a.available_capacity)
                                .map((item, index) => {
                                    // console.log(item)
                                    if (isTrue === false) {
                                        return (<h1 style={{ position: "relative", top: "5rem" }}>no data</h1>)
                                    }
                                    else {
                                        var Color="";
                                        if(item.available_capacity==0){
                                            // setColor(!Color)
                                            Color="red";
                                        }
                                        else if(item.available_capacity<=10){
                                            Color="yellow";
                                        }
                                        else{
                                            Color="green";
                                        }
                                      
                                        return (

                                            <Card>
                                                <Card.Header>{item.vaccine}</Card.Header>
                                                <Card.Body>
                                                    <Card.Title>{item.name}</Card.Title>
                                                    <Card.Text>
                                                        {item.block_name} {item.name} {item.address} {item.district_name} {item.state_name}
                                                        {item.pincode}
                                                    </Card.Text>
                                                    <Card.Text>
                                                        fee :{item.fee_type} <br></br>
                                                        age limit :{item.min_age_limit}<br></br>
                                                        dose 1:{item.available_capacity_dose1}<br></br>
                                                        dose 2:{item.available_capacity_dose2}
                                                    </Card.Text>
                                                    <Card.Text style={{color:Color}}>
                                                        {item.available_capacity} slots available
                                                    </Card.Text>
                                                    <Button variant="primary">book now</Button>
                                                    
                                                </Card.Body>
                                            </Card>

                                        )
                                    }

                                })
                        }
                    </Col>
                </Row>





            </Container>
        </div>
    )
}

export default Vaccine
{/* <DropdownButton id="dropdown-basic-button" title="select state">
                            {
                                StateData.map((item) => {
                                    return (
                                        <Dropdown.Item key={item.state_id} href="#" onClick={()=>selectState(item.state_id)}>{item.state_name}</Dropdown.Item>
                                    )
                                })
                            }
                        </DropdownButton> */}


//     <Card>
//     <Card.Header>COVISHIELD</Card.Header>
//     <Card.Body>
//         <Card.Title>Meloor PHC WP</Card.Title>
//         <Card.Text>
//             Meloor PHC WP Kuruppam Kerala Elinjipra CHC Thrissur Kerala  680311
//         </Card.Text>
//         <Card.Text style={{ color: 'green' }}>
//             20 slots available
//         </Card.Text>
//         <Button variant="primary">book now</Button>
//     </Card.Body>
// </Card>