import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchStreams} from '../../actions';
import {Link} from 'react-router-dom';

class StreamList extends Component{
    componentDidMount(){
        this.props.fetchStreams()
    }

    renderAdminButtons = (stream) =>{
        if(this.props.currentUserId === stream.userId){
            return (
                <div className="right floated content">
                    <Link to={`/stream/edit/${stream._id}`} className="ui button primary">Edit</Link>
                    <Link to={`/stream/delete/${stream._id}`} className="ui button negative">Delete</Link>
                </div>
            )
        }
    }
    renderList = () =>{
        return this.props.streams.map(stream =>{
            return(
                <div className="item stream" key={stream._id}>
                    {this.renderAdminButtons(stream)}
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        <Link to={`/stream/${stream._id}`} className='header'>{stream.title}</Link>
                    </div>
                    <div className="description">
                        {stream.description}
                    </div>
                </div>
            )
        })
    }
    renderCreateButton = () => {
        if(this.props.isSignedIn){
            return (
                <div style={{textAlign: 'right'}}>
                    <Link to="/stream/new" className="ui button primary create-stream">Create Stream</Link>
                </div>  
            )
        }
    }
    render(){
        return(
            <React.Fragment>
                <h2>Streams</h2>
                <div className="ui celled list">
                {this.renderList()}
                {this.renderCreateButton()}
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state)=> {
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    }
}
export default connect(mapStateToProps, {fetchStreams})(StreamList);