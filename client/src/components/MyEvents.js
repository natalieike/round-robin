import React,{Component} from 'react';
import {connect} from 'react-redux';
import DetailsModal from "./DetailsModal";
import Modal from 'react-modal';

class MyEvents extends Component{
  constructor(props){
    super(props);
  }

  render(){
    let resultTable = this.props.results.map((result, i) => {
      console.log(result);
      return(
        <tr key={result.id}>
          <td>{result.event.id}</td>
          <td>{result.event.eventName}</td>
          <td>{result.event.organizer}</td>
          <td>{result.event.shipDeadline}</td>
          <td><DetailsModal 
            data={
              <p>Body</p>
            }
            title={result.event.eventName}
            label={result.event.eventName}
          /></td>
        </tr>
    )});

    return(  
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">My Events</h3>
        </div>
        <div className="panel-body">
          <table className="table" id="eventTable">
            <tbody>
              <tr>
                <th>Event ID</th>
                <th>Event Name</th>
                <th>Organizer</th>
                <th>Shipping Deadline</th>
                <th>More</th>
              </tr>
              {resultTable}
            </tbody>
          </table>
          <hr/>
        </div>
      </div>
    );
  };  
};


export default MyEvents;