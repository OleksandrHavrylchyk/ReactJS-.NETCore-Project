import React, { Component } from 'react';
import ItsTable from './components/ItsTable'
import './custom.css'

import data from './data/names.json'

class App extends Component {
    render() {
        return (
            <div className="all">
                <ItsTable className="tablete" data={data} />
            </div>
        );
    }
}

export default App;



/*
import data from './data/names.json'

import './custom.css'

export default function App() {


    return (
        <div className="all">
            <div className="tablete">
                <ItsTable data={data} />
            </div>
        </div>
    )
}
*/
