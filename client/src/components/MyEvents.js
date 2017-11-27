import React from "react";
 

const MyEvents = props => {

  let resultTable = props.results.map((result, i) => {
    return(
      <tr key={result.id}>
        <td>{result.event.id}</td>
        <td>{result.event.eventName}</td>
        <td>{result.event.organizer}</td>
        <td>{result.event.shipDeadline}</td>
        <td><button className="btn btn-primary">
          View Details
        </button></td>
      </tr>
  )});

  return(  
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">My Events</h3>
      </div>
      <div className="panel-body">
        <table className="table">
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
    </div>);
};

export default MyEvents;