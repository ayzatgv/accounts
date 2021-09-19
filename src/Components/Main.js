import React, { Component } from 'react';
import { connect } from 'react-redux';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }

    componentDidMount() {
        
    }

    render() {

        return (
           <div>
               Main Page
           </div>
        );
    }
}

const mapStateToProps = state => ({
    
});

export default connect(mapStateToProps)(Main);