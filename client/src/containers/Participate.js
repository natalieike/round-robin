import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import EventSearch from "../components/EventSearch";
//import EventResults from "../components/EventResults";
import { selectCategory, fetchCategories } from '../actions';
import reduxThunk from "redux-thunk";
import { bindActionCreators } from 'redux'

class Participate extends Component {
  componentDidMount() {
    this.props.dispatch(fetchCategories());
    console.log(this.props);
  };

  handleChange = selectedCategory => {
  	console.log(selectedCategory);
    this.props.dispatch(selectCategory(selectedCategory))
  };

/*
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedReddit !== this.props.selectedReddit) {
      const { dispatch, selectedReddit } = nextProps
      dispatch(fetchPostsIfNeeded(selectedReddit))
    }
  }


  handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch, selectedReddit } = this.props
    dispatch(invalidateReddit(selectedReddit))
    dispatch(fetchPostsIfNeeded(selectedReddit))
  }

  render() {
    const { selectedReddit, posts, isFetching, lastUpdated } = this.props
    const isEmpty = posts.length === 0
    return (
      <div>
        <Picker value={selectedReddit}
                onChange={this.handleChange}
                options={[ 'reactjs', 'frontend' ]} />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <button onClick={this.handleRefreshClick}>
              Refresh
            </button>
          }
        </p>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Posts posts={posts} />
            </div>
        }
      </div>
    )
  }
}
*/

	render() {
    const { category, categories } = this.props
		return(
		  <div>
		    <div className="jumbotron">
		      <h1>Participate</h1>
		      <h3>Search for Events and Manage your Current Events</h3>
		    </div>
		    <EventSearch value={parseInt(category)}
                options={categories} 
                onChange={this.handleChange}/>
			</div>);
  };

 }

const mapDispatchToProps = dispatch => {
  let actions = bindActionCreators({ selectCategory, fetchCategories });
  return { ...actions, dispatch };
}

const mapStateToProps = state => {
	return{
		categories: state.allCategories.categories,
		category: state.selectCategories.category,
		isFetching: state.allCategories.isFetching
	 };
	};

export default connect(mapStateToProps, mapDispatchToProps)(Participate);
