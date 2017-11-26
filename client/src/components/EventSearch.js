import React from "react";
 
const EventSearch = props => {
  console.log(props);
  return(
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">Search for an Event</h3>
      </div>
      <div className="panel-body">
        <form>
          <div className="form-group">
            <label><h4>Search for a Public Event by Category:</h4></label>
            <select 
              className="form-control"
              value={props.category}
              onChange={e => props.onChange(e.target.value)}>
              {props.options.map(category =>
                <option value={category.id} 
                  key={category.id}>
                  {category.categoryName}
                </option>)
              }
            </select>
            <button className="btn btn-primary searchBtn"
              onClick={props.onClick}>
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventSearch;