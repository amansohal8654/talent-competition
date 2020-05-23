import React from 'react'
import Cookies from 'js-cookie'
import { default as Countries } from '../../../../util/jsonFiles/countries.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Select } from '../Form/Select.jsx';

export class Address extends React.Component {
    constructor(props) {
        super(props)
        const addressData = props.addressData ?
            Object.assign({}, props.addressData) : {
                address: {
                    number: "",
                    street: "",
                    suburb: "",
                    postCode: 0,
                    city: "",
                    country: ""
                }
            }
        this.state = {
            newAddress: addressData,
            showEditSection: false,
        }
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveAddress = this.saveAddress.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
    }
    openEdit() {
        const addressData = Object.assign({}, this.props.addressData)
        this.setState({
            showEditSection: true,
            newAddress: addressData
        })
    }


    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.newAddress)
        data[event.target.name] = event.target.value
        this.setState({
            newAddress: data
        })
    }

    saveAddress() {

        debugger;
        //console.log(this.props.componentId)
        //console.log(this.state.newAccounts)
        const data = Object.assign({}, this.state.newAddress)
        this.props.saveProfileData(this.props.Id, data)
        this.closeEdit()
    }
    renderEdit() {
        let countriesOptions = [];
        let citiesOptions = [];
        const selectedCountry = this.state.newAddress.country;
        const selectedCity = this.state.newAddress.city;

        countriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);

        if (selectedCountry != "" && selectedCountry != null) {

            citiesOptions = Countries[selectedCountry].map((x) => <option key={x} value={x}> {x}</option>);

           
        }
        return (
            <div className="ui equal width grid">
                <div className='row'>
                    <div className="column">
                        <span> <div><p>Number</p></div></span>
                <ChildSingleInput
                    inputType="text"
                    name="number"
                    value={this.state.newAddress.number}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your home number"
                    errorMessage="Please enter a valid home number"
                />
                    </div>
                    <div className="column">
                        <span> <div><p>Street Name</p></div></span>
                    <ChildSingleInput
                    inputType="text"
                    name="street"
                    value={this.state.newAddress.street}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your street Name"
                    errorMessage="Please enter a valid street Name"
                />
                    </div>
                    <div className="column">
                        <span> <div><p>Suburb</p></div></span>
                <ChildSingleInput
                    inputType="text"
                    name="suburb"
                    value={this.state.newAddress.suburb}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your suburb Name"
                    errorMessage="Please enter a valid suburb Name"
                            />
                    </div>
                </div>
                <div className='row'>
                  
                <div className="column">
                        <span> <div><p>Country</p></div></span>
                        <select
                            label="Country"
                            placeholder="Country"
                            value={selectedCountry}
                            onChange={this.handleChange}
                            name="country">

                            <option value="">Select a country</option>
                            {countriesOptions}
                        </select>
                    </div>
                    <div className="column">
                        <span> <div><p>City Name</p></div></span>
                        <select
                            className="ui dropdown"
                            placeholder="City"
                            value={selectedCity}
                            onChange={this.handleChange}
                            name="city">
                            <option value="0"> Select a town or city</option>
                            {citiesOptions}
                        </select>
                    </div>
                    <div className="column">
                        <span> <div><p>PostCode Number</p></div></span>
                        <ChildSingleInput
                            inputType="number"
                            name="postCode"
                            value={this.state.newAddress.postCode}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            placeholder="Enter your postCode"
                            errorMessage="Please enter a valid postCode"
                        />
                    </div>
                </div>
                <div className="ui sixteen wide column">
                <span>
                   
                <button type="button" className="ui teal button" onClick={this.saveAddress}>Save</button>
                        <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                       
                </span>
                </div>
            </div>
        )
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit(): this.renderDisplay()
        )
    }
   
    renderDisplay(){
            let number = this.props.addressData ? this.props.addressData.number : ""
        let street = this.props.addressData ? this.props.addressData.street : ""
        let suburb = this.props.addressData ? this.props.addressData.suburb : ""
        let postCode = this.props.addressData ? this.props.addressData.postCode : ""
        let city = this.props.addressData ? this.props.addressData.city : ""
        let country = this.props.addressData ? this.props.addressData.country : ""
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>address: {number} {street} {suburb} {postCode}</p>
                        <p>City: {city}</p>
                        <p>Country: {country}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }

}

export class Nationality extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            nationalityData : props.nationalityData ,
            showEditSection: false,

        }
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
       // this.saveNationality = this.saveNationality.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
    }
    openEdit() {
        this.setState({
            showEditSection: true,
        })
    }


    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }
    handleChange(event) {
        const data = Object.assign({}, this.state.nationalityData)
        data[event.target.name] = event.target.value
        this.setState({
             data
        })
        this.props.saveProfileData(data)
        this.closeEdit()
    }

   
    renderEdit() {
        let countriesOptions = [];

        countriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);
        return (
            
                <div className="ui equal width grid">
                    <div className='row'>
                        <div className="column">
            <select
                label="Nationality"
                placeholder="Nationality"
                value={this.props.nationalityData}
                onChange={this.handleChange}
                name="nationality">

                <option value="">Select Your Nationality</option>
                {countriesOptions}
                            </select>
                        </div>
                        </div>
                <div className="ui sixteen wide column">
                    <span>
                <button type="button" className="ui teal button" onClick={this.saveNationality}>Save</button>
                        <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                        </span>
                    </div>
       </div>
            )
    }
    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }
    renderDisplay() {
        let Nationality = this.props.nationalityData ? this.props.nationalityData : "";
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Nationality: {Nationality} </p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit} >Edit</button>
                </div>
            </div>
        )
    }
}