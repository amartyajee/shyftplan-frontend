import React, { Component } from 'react';
import UserDetails from "./details";
import constants from "../constants";
import "../global.css"

class UserList extends Component {
    state = {
        positions: [],
        pagination: {},
        elementCount: 10
    }

    componentDidMount() {
        let headers = new Headers();
        headers.set('Authorization', 'Basic ' + Buffer.from(constants.USERNAME + ":" + constants.PASSWORD).toString('base64'));

        fetch((constants.URL + constants.GET_EVENTS), {
            method: 'GET',
            headers: headers
        }).then(response => response.json())
            .then(json => {
                this.setState(
                    {
                        positions: json.items,
                        pagination: json.pagination
                    }
                )
            });
    }

    render() {
        return (<div className="list-container text-center w-100">
            <h2>List of All Events</h2>
            <br />
            <div className="list-group w-50 list-container-group">
                {
                    this.state.positions.slice((this.state.elementCount - 10), this.state.elementCount).map((event, index) => (
                        <a
                            onClick={(e) => { onListItemClick(e, event, this) }}
                            key={index}
                            className="list-group-item w-100 list-group-item-action"
                        >
                            <div className="row">
                                <div className="col-1" style={{ background: event.position.color }}></div>
                                <div className="col"><h4>{event.position.name}</h4></div>
                                <div className="col-6">
                                    Start Time: {formatTime(event.startsAt)}<br />
                                    End Time: {formatTime(event.endsAt)}
                                </div>
                            </div>

                        </a>
                    ))
                }
            </div>
            <br />
            <button className="btn btn-primary mt-4" onClick={() => { loadMoreItems(this) }}>Load More...</button>

        </div>);
    }
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

const loadMoreItems = (me) => {
    me.setState({
        elementCount: me.state.elementCount + 10
    })
}

const onListItemClick = (e, event, me) => {
    e.preventDefault();
    me.props.onItemClick(event);
    me.props.history.push('/details');
}

export default UserList;