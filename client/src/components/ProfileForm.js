import React from 'react'
import { Field, Fields, reduxForm } from 'redux-form'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

let ProfileForm = props => {
  const { handleSubmit, country, stateProvince, stateProvinceChange, countryChange } = props
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">My Profile</h3>
      </div>
      <div className="panel-body">
			  <form 
			  	onSubmit={handleSubmit}
			  >
			  	<div className="form-horizontal">
					  <div className="form-group">
					    <label htmlFor="firstName" className="col-sm-2 control-label">First Name</label>
			  	    <div className="col-sm-4">
					    	<Field name="firstName" component="input" type="text" className="form-control"/>
					    </div>
					    <label htmlFor="lastName" className="col-sm-2 control-label">Last Name</label>
			  	    <div className="col-sm-4">
					    	<Field name="lastName" component="input" type="text" className="form-control"/>
					    </div>
					  </div>
					  <div className="form-group">
					    <label htmlFor="email" className="col-sm-2 control-label">Email</label>
			  	    <div className="col-sm-4">
					    	<Field name="email" component="input" type="email" className="form-control"/>
					    </div>
					    <label htmlFor="shippingPref" className="col-sm-2 control-label">Shipping Preferences</label>	    
			  	    <div className="col-sm-4">
					    	<Field name="shippingPref" component="select" type="select" className="form-control">
									<option value="">Select an option...</option>
					    	</Field>
					    </div>
					  </div>
					  <div className="form-group">
					    <label htmlFor="address" className="col-sm-2 control-label">Address</label>
			  	    <div className="col-sm-10">
					    	<Field name="address" component="input" type="text" className="form-control"/>
					    </div>
					  </div>
					  <div className="form-group">
					    <label htmlFor="city" className="col-sm-2 control-label">City</label>
			  	    <div className="col-sm-4">
					    	<Field name="city" component="input" type="text" className="form-control"/>
					    </div>
					    <label htmlFor="postalCode" className="col-sm-2 control-label">Zip/Postal Code</label>
			  	    <div className="col-sm-4">
					    	<Field name="postalCode" component="input" type="text" className="form-control"/>
					    </div>
					  </div>
					  <div className="form-group">
					    <label htmlFor="country" className="col-sm-2 control-label">Country</label>
			  	    <div className="col-sm-4">
					    	<Field
					    		name="country" 
					    		component={CountryDropdown} 
					    		className="form-control"
					    		value={country}
					    		onChange={countryChange}
					    		classes="form-control"				
				    		/>
					    </div>
					    <label htmlFor="stateProvince" className="col-sm-2 control-label">State/Province</label>
			  	    <div className="col-sm-4">
					    	<Field
					    		name="stateProvince" 
					    		component={RegionDropdown} 
					    		className="form-control"
					    		country={country}
					    		value={stateProvince}
					    		onChange={stateProvinceChange}
					    		classes="form-control"
				    		/>
					    </div>
					  </div>
					  <div className="form-group">
					    <label htmlFor="aboutMe" className="col-sm-2 control-label">About Me</label>
			  	    <div className="col-sm-10">
					    	<Field name="aboutMe" component="textarea" type="text" className="form-control"/>
					    </div>
					  </div>
					  <div className="form-group">
              <div className="col-sm-offset-1 col-sm-3">
				  			<button type="submit" className="btn btn-success">Submit</button>
				  		</div>
				  	</div>
					</div>
				</form>
			</div>
		</div>
)};

ProfileForm = reduxForm({
  form: 'profile'
})(ProfileForm)

export default ProfileForm