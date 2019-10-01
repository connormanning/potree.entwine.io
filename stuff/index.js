import React from 'react'
import ReactDom from 'react-dom'
import ReactSelect from 'react-select'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

class Hello extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: null
        }
    }

    render() {
        const {selected} = this.state

        return <div
            style={{
                zIndex: 10000,
                position: 'absolute',
                width: 240,
                height: '100%',
                left: 0,
                top: 0,
                backgroundColor: 'white',
            }}
        >
            <h1 style={{ color: 'green', textAlign: 'center' }}>Hello react</h1>
            <ReactSelect
                value={ selected }
                onChange={ selected => this.setState({ selected }) }
                options={ options }
            />
        </div>
    }
}

ReactDom.render(<Hello/>, document.getElementById('react_container'))

