import React from 'react'
import { SingleInput } from '../Form/SingleInput.jsx';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import {
    DateInput,
    TimeInput,
    DateTimeInput,
    DatesRangeInput
} from 'semantic-ui-calendar-react';

export default class VisaStatus extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            showEditSection: false,
            newVisa: props.visa,
        }
        this.Edit = this.Edit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeDate = this.handleChangeDate.bind(this)
        this.saveVisa = this.saveVisa.bind(this)
    }
    Edit() {
        let visa = Object.assign({}, this.props.visa)
        this.setState({
            showEditSection: true,
            newVisa: visa,
        });
    }
    closeEdit() {
        this.setState({
            showEditSection: false,
        })
    }
    handleChangeDate(event, { name, value }) {
        const data = Object.assign({}, this.state.newVisa)
        data[name] = value
        this.setState({ newVisa: data  } );
    }
    handleChange(event ) {
        const data = Object.assign({}, this.state.newVisa)
        data[event.target.name] = event.target.value
        this.setState({
            newVisa:  data
        })
    }
    saveVisa() {
        const data = Object.assign({}, this.state.newVisa)
        this.props.saveProfileData(data)
    }
    renderEdit() {
        let visaExpiryDate = "";
        const visa = this.state.newVisa;
        const visaStatus = this.state.newVisa.visaStatus
        //const visaExpiryDate = this.state.newVisa.visaExpiryDate

        if (visaStatus == "Work Visa" || visaStatus == "Student Visa") {

             
                visaExpiryDate = < div className="column" >
                    <DateInput
                        name="visaExpiryDate"
                        value={new Date(visa.visaExpiryDate).toLocaleDateString()}
                        onChange={this.handleChangeDate}
                        maxLength={80}
                        placeholder="Add Visa Expiry Date"
                        errorMessage="Please enter a valid Language"
                        iconPosition="left"
                    />
                </div >
            

        }

        
        

            return (
                <div className="ui equal width grid">
                    <div className="row" >
                        <div className="column">
                            <span>
                                <select
                                    style={{ top: "3px" }}
                                    className="ui dropdown"
                                    placeholder="Language Level"
                                    value={visa.visaStatus}
                                    onChange={this.handleChange}
                                    name="visaStatus">
                                    <option value="0">Enter Your Visa Status</option>
                                    <option value="Citizen"> Citizen</option>
                                    <option value="Permanent Resident">  Permanent Resident</option>
                                    <option value="Work Visa">  Work Visa</option>
                                    <option value="Student Visa"> Student Visa</option>
                                </select>
                            </span>
                        </div>
                         
                            { visaExpiryDate }
                        <div className="column">
                            <div style={{ "padding-top": "3.5px" }}>
                                <button type="button" className="ui teal button" onClick={this.saveVisa}>Add</button>
                                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                            </div>
                        </div>
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
        let visa = this.props.visa ? this.props.visa : ""
        let visaExpiryDate = "";
        //const visaExpiryDate = this.state.newVisa.visaExpiryDate

        if (visa.visaStatus == "Work Visa" || visa.visaStatus == "Student Visa") {
            visaExpiryDate = new Date(visa.visaExpiryDate).toLocaleDateString()
            
        }

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>visaStatus: {visa.visaStatus}</p>
                        <p>visaExpiryDate: {visaExpiryDate}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.Edit}>Edit</button>
                </div>
            </div>
        )
    }
}