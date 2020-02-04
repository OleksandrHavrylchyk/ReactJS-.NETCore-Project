import React, { Component } from 'react';
import Table2 from './components/Table2'
import './custom.css'

import data from './data/names.json'

class App extends Component {
    render() {
        return (
            <div>
                <div className="Table1">
                    <Table2 data={data} />
                </div>
            </div>
        );
    }
}

export default App;