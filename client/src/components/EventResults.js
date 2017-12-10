import React from "react";
 

const EventResult = props => {

  let resultTable = props.results.map((result, i) => {
    let button = "";
    if(!props.myEvents.find(x => x.event.id == result.id)){
      button =           
        <button 
          onClick={props.onClick} 
          className="btn btn-primary" 
          value={result.id}
        >
          Join
        </button>
    }else{
      button = <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
    }
    return(
      <tr key={result.id}>
        <td>{result.id}</td>
        <td>{result.eventName}</td>
        <td>{result.organizer}</td>
        <td>{result.shipDeadline}</td>
        <td>{button}</td>
      </tr>
  )});

  return(  
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">Search Results</h3>
      </div>
      <div className="panel-body">
        <label>Click Join to Participate in an Event:</label>
        <table className="table">
          <tbody>
            <tr>
              <th>Event ID</th>
              <th>Event Name</th>
              <th>Organizer</th>
              <th>Shipping Deadline</th>
              <th>Participate</th>
            </tr>
            {resultTable}
          </tbody>
        </table>
        <hr/>
      </div>
    </div>);
};

export default EventResult;