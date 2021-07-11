import React, { Component, useState, useEffect } from 'react';
import constants from "../constants";
import "../global.css"

const UserDetails = (props) => {

    const [eventDetails, setEventDetails] = useState([]);
    const [isError, setError] = useState(null);
    useEffect(() => {
        let headers = new Headers();
        headers.set('Authorization', 'Basic ' + Buffer.from(constants.USERNAME + ":" + constants.PASSWORD).toString('base64'));

        fetch((constants.URL + constants.GET_EVENTS + '/' + props.eventId), {
            method: 'GET',
            headers: headers
        }).then(response => response.json())
            .then(json => {
                setEventDetails([json]);

            }).catch(err => {
                setError(true);
            })
    }, [])

    return (
        <div>
            {isError && (
                <div>
                    Oops! Seems this event does not exist. Please try selecting another one.
                    <br />
                    <button className="btn btn-success m-4" onClick={() => goBackToHome(props)}>Show List of Events</button>
                </div>
            )}

            {!isError && (
                <div>
                    <h2 className="align-center">More Information About The Position:</h2>
                    {
                        eventDetails.map((event, index) => (
                            <div key={index} className="row details-container">
                                <div className="col-3 details-sidebar">
                                    <p>Position name: {event.position.name}</p>
                                    <p>Start Time: {formatTime(event.startsAt)}</p>
                                    <p>End Time: {formatTime(event.endsAt)}</p>
                                    <p>Emplyees for the associated position <span className="arrow right"></span></p>
                                    <button className="btn btn-success" onClick={() => goBackToHome(props)}>Show List of Events</button>
                                </div>
                                <div className="col row">
                                    {
                                        event.employees.map((emp, ind) => (
                                            <div key={ind} className="card details-card-parent col-4">
                                                <img className="card-img-top details-card-image" src={emp.image} alt="Card image cap" />
                                                <div className="card-body">
                                                    <h5 className="card-title">{emp.firstName} {emp.lastName}</h5>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>


                            </div>
                        ))

                    }
                </div>
            )}
        </div>
    )

    // return (
    //     <div>
    //         <h2 className="align-center">More Information About The Position:</h2>
    //         {
    //             eventDetails.map(event => (
    //                 <div className="row details-container">
    //                     <div className="col-3 details-sidebar">
    //                         <p>Position name: {event.position.name}</p>
    //                         <p>Start Time: {formatTime(event.startsAt)}</p>
    //                         <p>End Time: {formatTime(event.endsAt)}</p>
    //                         <p>Emplyees for the associated position <span className="arrow right"></span></p>
    //                         <button className="btn btn-success" onClick={() => goBackToHome(props)}>Show List of Events</button>
    //                     </div>
    //                     <div className="col row">
    //                         {
    //                             event.employees.map(emp => (
    //                                 <div className="card details-card-parent col-4">
    //                                     <img className="card-img-top details-card-image" src={emp.image} alt="Card image cap" />
    //                                     <div className="card-body">
    //                                         <h5 className="card-title">{emp.firstName} {emp.lastName}</h5>
    //                                     </div>
    //                                 </div>
    //                             ))
    //                         }
    //                     </div>


    //                 </div>
    //             ))

    //         }
    //     </div>
    // );
}

const formatTime = (eventTime) => {
    const time = new Date(eventTime);
    const hours = time.getHours().toString();
    let mins = time.getMinutes();
    mins = mins < 10 ? '0' + mins : mins.toString();
    const date = time.getDate().toString();
    let month = time.getMonth() + 1 // month starts with 0
    month = month < 10 ? '0' + month : month.toString();
    const year = time.getFullYear().toString();

    return `${date}/${month}/${year} ${hours}:${mins}`;
}

const goBackToHome = (props) => {
    props.history.push('/');
}

export default UserDetails;