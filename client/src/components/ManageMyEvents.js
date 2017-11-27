import React from "react";
 

const ManageMyEvents = props => {

  let resultTable = props.results.map((result, i) => {
    return(
      <tr key={result.id}>
        <td>{result.id}</td>
        <td>{result.shipDeadline}</td>
        <td>{result.eventName}</td>
        <td>{result.status.statusName}</td>
        <td><button className="btn btn-primary">
              View Details
            </button></td>
      </tr>
  )});

  return(  
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">Manage My Events</h3>
      </div>
      <div className="panel-body">
        <table className="table">
          <tbody>
            <tr>
              <th>Event ID</th>
              <th>Shipping Deadline</th>
              <th>Event Name</th>
              <th>Status</th>
              <th>More</th>
            </tr>
            {resultTable}
          </tbody>
        </table>
        <hr/>
      </div>
    </div>);
};

export default ManageMyEvents;