import React from "react";
 

const EventResult = props => 
  let resultTable = props.results.map((result, i) => {
    return(
      <tr key={result.id}>
        <td><input type="checkbox" id={result.id} value={result.id}></td>
        <td>{result.id}</td>
        <td>{result.eventName}</td>
        <td>{result.organizer}</td>
        <td>{result.shipDeadline}</td>
      </tr>
  )};

  return(  
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">Search Results</h3>
      </div>
      <div className="panel-body">
        <p>Select an Event and Click Join</p>
        <button onClick={props.onSubmit} className="btn btn-primary">
          Join
        </button>
      </div>
      <table className="table">
        <tr>
          <th>Select</th>
          <th>Event ID</th>
          <th>Event Name</th>
          <th>Organizer</th>
          <th>Shipping Deadline</th>
        </tr>
        {resultTable}
      </table>
    </div>);
}

export default EventResult;