import React, { Component, useState, useEffect } from 'react';
import UserDetails from "./components/details";
import UserList from "./components/list";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from 'react-router-dom';

const App = () => {
    const [eventId, setEventId] = useState('');
    const handleItemClick = (item) => {
        setEventId(item.id);
    }

    return (
        <Router>
            <div>
                <main>
                    <Switch>
                        <Route exact path="/" render={(props) => <UserList {...props} onItemClick={handleItemClick} />} />
                        <Route path="/details" render={(props) => <UserDetails {...props} eventId={eventId} />} />
                    </Switch>
                </main>
            </div>
        </Router>
    );

};

export default App;