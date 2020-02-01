import React, { Component } from 'react';
import Table1 from './components/Table1'
import './custom.css'

import data from './data/names.json'

class App extends Component {
    render() {
        return (
            <div className="Border1">
                <div className="Table1">
                    <Table1 data={data} />
                </div>
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
