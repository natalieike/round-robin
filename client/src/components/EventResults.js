import React from "react";
 

const EventResult = props => {

  let resultTable = props.results.map((result, i) => {
    return(
      <tr key={result.id}>
        <td><input type="checkbox" id={result.id} value={result.id}></input></td>
        <td>{result.id}</td>
        <td>{result.eventName}</td>
        <td>{result.organizer}</td>
        <td>{result.shipDeadline}</td>
      </tr>
  )});

  return(  
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">Search Results</h3>
      </div>
      <div className="panel-body">
        <label>Select an Event and Click Join:</label>
        <table className="table">
          <tbody>
            <tr>
              <th>Select</th>
              <th>Event ID</th>
              <th>Event Name</th>
              <th>Organizer</th>
              <th>Shipping Deadline</th>
            </tr>
            {resultTable}
          </tbody>
        </table>
        <hr/>
        <button onClick={props.onSubmit} className="btn btn-primary">
          Join
        </button>
      </div>
    </div>);
};

export default EventResult;