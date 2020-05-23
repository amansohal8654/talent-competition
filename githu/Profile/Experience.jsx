/* Experience section */
import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import {
  DateInput,
  TimeInput,
  DateTimeInput,
  DatesRangeInput
} from 'semantic-ui-calendar-react';

const intialExperience = {
    Id : "",
    Company : "",
    Position :"",
    Responsibilities : "",
    Start: new Date().toLocaleDateString(),
    End: new Date().toLocaleDateString()
}

export default class Experience extends React.Component {
    constructor(props) {
        super(props);
     
        this.state = {
            experience: intialExperience
        }
        this.addNew = this.addNew.bind(this)
        this.edit = this.edit.bind(this)

        this.closeAddNew = this.closeAddNew.bind(this)

        this.handleChange = this.handleChange.bind(this)
        this.handleChangeDate = this.handleChangeDate.bind(this)
        this.saveExperience = this.saveExperience.bind(this)
        this.deleteLanguage = this.deleteLanguage.bind(this);

        this.renderEdit = this.renderEdit.bind(this);
        this.renderAdd = this.renderAdd.bind(this);
    };
    addNew() {
        //debugger;
        this.setState({
            showAddSection: true,
            showEditSection: false,
            experience: intialExperience
        })
    }

    closeAddNew() {
        this.setState({
            showEditSection: false,
            showAddSection: false,
            experience: intialExperience
        })
    }

    edit(id) {
        const experience = this.props.experienceData.find((l) => l.id === id);
        this.setState({ experience: experience, showEditSection: true });
    }

    handleChangeDate  (event, { name, value })  {
            this.setState((state) => ({ experience: { ...state.experience, [name]: value } }));
    }

    handleChange({ target }) {
        const { name, value } = target;
        this.setState((state) => ({ experience: { ...state.experience, [name]: value } }));
    }
    deleteLanguage(id) {
        const newExperience = this.props.experienceData.filter((l) => l.id !== id);
        this.props.updateProfileData("experience", newExperience);
    }
    saveExperience() {
        const experience = this.state.experience;

        //if there is no id add the concat the language to the array
        const experiences = this.state.experience.id ? this.props.experienceData : this.props.experienceData.concat(experience);
        const newExperiences = experiences.reduce((curr, acc) => {
            if (acc.id === experience.id) {
                curr.push(experience);
            } else {
                curr.push(acc);
            }
            return curr;
        }, []);

        this.props.updateProfileData("experience", newExperiences)
        this.closeAddNew()
    }

    renderAdd() {
        const experience = this.state.experience;
        return (
            <div className="ui equal width grid">
                <div className="row" >
                    <div className="column">
                        <ChildSingleInput
                            inputType="text"
                            name="Company"
                            value={experience.Company || ""}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            placeholder="Company Name"
                            errorMessage="Please enter a valid Language"
                        />
                    </div>
                    <div className="column">
                        <ChildSingleInput
                            inputType="text"
                            name="Position"
                            value={experience.Position || ""}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            placeholder="Add Position"
                            errorMessage="Please enter a valid Language"
                        />
                    </div>
                    </div>
                    <div className="row">
                    <div className="column">
                        <DateInput
                            //inline
                            name='Start'
                            value={experience.Start || ""}
                            maxLength={80}
                            placeholder="Starting Date"
                            iconPosition="left"
                            onChange={this.handleChangeDate}
                            errorMessage="Please enter a valid Language"
                        />
                            </div>
                            <div className="column">
                        <DateInput
                            name="End"
                            value={experience.End || ""}
                            maxLength={80}
                            placeholder="End Date"
                            iconPosition="left"
                            onChange={this.handleChangeDate}
                            errorMessage="Please enter a valid Language"
                        />
                            </div>
                </div>
                <div className="row">
                    <div className="column">
                        <ChildSingleInput
                            inputType="text"
                            name="Responsibilities"
                            value={experience.Responsibilities || ""}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            placeholder="Responsibilities"
                            errorMessage="Please enter a valid Language"
                        />
                    </div>
                    
                </div>
                <div className="column">
                    <div style={{ "padding-top": "3.5px" }}>
                        <button type="button" className="ui teal button" onClick={this.saveExperience}>Add</button>
                        <button type="button" className="ui button" onClick={this.closeAddNew}>Cancel</button>
                    </div>
                </div>
            </div>


        )
    }

    renderEdit() {

        const experience = this.state.experience;
        return (
            <div className="ui equal width grid">
                <div className="row" >
                    <div className="column">
                        <ChildSingleInput
                            inputType="text"
                            name="company"
                            value={experience.company || ""}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            placeholder="Company Name"
                            errorMessage="Please enter a valid Language"
                        />
                    </div>
                    <div className="column">
                        <ChildSingleInput
                            inputType="text"
                            name="position"
                            value={experience.position || ""}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            placeholder="Add Position"
                            errorMessage="Please enter a valid Language"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <DateInput
                            //inline
                            name='start'
                            value={new Date(experience.start).toLocaleDateString() || ""}
                            maxLength={80}
                            placeholder="Starting Date"
                            iconPosition="left"
                            onChange={this.handleChangeDate}
                            errorMessage="Please enter a valid Language"
                        />
                    </div>
                    <div className="column">
                        <DateInput
                            name="end"
                            value={new Date(experience.end).toLocaleDateString() || ""}
                            maxLength={80}
                            placeholder="End Date"
                            iconPosition="left"
                            onChange={this.handleChangeDate}
                            errorMessage="Please enter a valid Language"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <ChildSingleInput
                            inputType="text"
                            name="responsibilities"
                            value={experience.responsibilities || ""}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            placeholder="Responsibilities"
                            errorMessage="Please enter a valid Language"
                        />
                    </div>

                </div>
                <div className="column">
                    <div style={{ "padding-top": "3.5px" }}>
                        <button type="button" className="ui teal button" onClick={this.saveExperience}>Update</button>
                        <button type="button" className="ui button" onClick={this.closeAddNew}>Cancel</button>
                    </div>
                </div>
            </div>
        )

    }

    render() {
        const experience = this.props.experienceData || [];
        const add = this.state.showAddSection ? this.renderAdd() : null;
        const edit = this.state.showEditSection ? this.renderEdit() : null;

        let experData = experience.map((experience) => (
            <tr key={experience.id}>
                <td>{experience.company}</td>
                <td>{experience.position}</td>
                <td>{experience.responsibilities}</td>
                <td>{new Date(experience.start).toLocaleDateString()}</td>
                <td>{new Date(experience.end).toLocaleDateString()}</td>
                <td>
                    <i className="close icon" style={{ float: "right" }} onClick={() => this.deleteLanguage(experience.id)}></i>
                    <i className="pencil alternate icon" style={{ float: "right" }} onClick={() => this.edit(experience.id)}></i>
                </td>
            </tr>
        ));
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        {add}
                        <table className="ui single line table">

                            <thead>
                                <tr>
                                    <th>Company</th>
                                    <th>Position</th>
                                    <th>Responsibilities</th>
                                    <th>Start</th>
                                    <th>End</th>
                                    <th><button type="button" className="ui teal button" style={{ float: "right" }} onClick={this.addNew}><i className="plus icon"></i>Add New</button></th>
                                </tr>
                            </thead>
                            <tbody>
                                {edit && (
                                    <tbody className="col-col">
                                        <tr>
                                            <td>{edit}</td>
                                        </tr>
                                    </tbody>
                                )}
                                    </tbody>
                            <tbody>
                                {experData}
                            </tbody>
                        </table>
                    </React.Fragment>
                </div>
            </div>
        )
        
    }
}
