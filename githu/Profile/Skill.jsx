/* Skill section */
import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';

const intialSkills = {
    Id: "",
    name: "",
    level: "",
    IsDeleted: false

};
    
export default class Skill extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           skills: intialSkills
        }
        this.addNew = this.addNew.bind(this)
        this.edit = this.edit.bind(this)

        this.closeAddNew = this.closeAddNew.bind(this)

        this.handleChange = this.handleChange.bind(this)
        this.saveSkill = this.saveSkill.bind(this)
        this.deleteLanguage = this.deleteLanguage.bind(this);

        this.renderEdit = this.renderEdit.bind(this);
        this.renderAdd = this.renderAdd.bind(this);
    };

    addNew() {
        //debugger;
        this.setState({
            showAddSection: true,
            showEditSection: false,
            skills: intialSkills,
        })
    }

    closeAddNew() {
        this.setState({
            showEditSection: false,
            showAddSection: false,
            skills: intialSkills,
        })
    }

    edit(id) {
        const skills = this.props.skillData.find((l) => l.id === id);
        this.setState({ skills: skills, showEditSection: true });
    }

    handleChange({ target }) {
        const { name, value } = target;
        this.setState((state) => ({ skills: { ...state.skills, [name]: value } }));
    }
    deleteLanguage(id) {
        const newSkills = this.props.skillData.filter((l) => l.id !== id);
        this.props.updateProfileData("skills", newSkills);
    }
    saveSkill() {
        const skill = this.state.skills;

        //if there is no id add the concat the language to the array
        const skills = this.state.skills.id ? this.props.skillData : this.props.skillData.concat(skill);
        const newSkills = skills.reduce((curr, acc) => {
            if (acc.id === skill.id) {
                curr.push(skill);
            } else {
                curr.push(acc);
            }
            return curr;
        }, []);

        this.props.updateProfileData("skills", newSkills)
        this.closeAddNew()
    }

    renderAdd() {
        const skills = this.state.skills;
        return (
            <div className="ui equal width grid">
                <div className="row" >
                    <div className="column">
                        <ChildSingleInput
                            inputType="text"
                            name="name"
                            value={skills.name || ""}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            placeholder="Add Language"
                            errorMessage="Please enter a valid Language"
                        />
                    </div>
                    <div className="column">
                        <span>
                            <select
                                style={{ top: "3px" }}
                                className="ui dropdown"
                                placeholder=" Skill level"
                                value={skills.level || ""}
                                onChange={this.handleChange}
                                name="level">
                                <option value="0">Enter Your skill Level</option>
                                <option value="Beginner"> Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Expert"> Expert</option>
                            </select>
                        </span>
                    </div>

                </div>
                <div className="column">
                    <div style={{ "padding-top": "3.5px" }}>
                        <button type="button" className="ui teal button" onClick={this.saveSkill}>Add</button>
                        <button type="button" className="ui button" onClick={this.closeAddNew}>Cancel</button>
                    </div>
                </div>
            </div>


        )
    }
    renderEdit() {

        const skills = this.state.skills;

        return (
            <div className="ui equal width grid">
                <div className="row" >
                    <div className="column">
                        <ChildSingleInput
                            //id={language.id}
                            inputType="text"
                            name="name"
                            value={skills.name || ""}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            placeholder="Add Language"
                            errorMessage="Please enter a valid Language"
                        />
                    </div>
                    <div className="column">
                        <span>
                            <select
                                //id={Skills.id}
                                style={{ top: "3px" }}
                                className="ui dropdown"
                                placeholder="Language Level"
                                value={skills.level || ""}
                                onChange={this.handleChange}
                                name="level">
                                <option value="0">Enter Your skill Level</option>
                                <option value="Beginner"> Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Expert"> Expert</option>
                            </select>
                        </span>
                    </div>
                    <div className="column">
                        <div style={{ "paddingtop": "3.5px" }}>
                            <button class="ui primary basic button" onClick={this.saveSkill}>Update</button>
                            <button class="ui negative basic button" onClick={this.closeAddNew}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
    render() {
        debugger;
       let skills = this.props.skillData || [];
       const add = this.state.showAddSection ? this.renderAdd() : null;
       const edit = this.state.showEditSection ? this.renderEdit() : null;
       let skillsData = skills.map((skill) => (

           <tr key={skill.id}>
               <td>{skill.name}</td>
               <td>{skill.level}</td>
               <td>
                   <i className="close icon" style={{ float: "right" }} onClick={() => this.deleteLanguage(skill.id)}></i>
                   <i className="pencil alternate icon" style={{ float: "right" }} onClick={() => this.edit(skill.id)}></i>
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
                                   <th>Languages</th>
                                   <th>Level</th>
                                   <th><button type="button" className="ui teal button" style={{ float: "right" }} onClick={this.addNew}><i className="plus icon"></i>Add New</button></th>
                               </tr>
                           </thead>
                           <tbody>
                               {edit && (
                                   <tbody>
                                       <tr>
                                           <td>{edit}</td>
                                       </tr>
                                   </tbody>
                               )}
                           </tbody>
                           <tbody>
                               {skillsData}
                           </tbody>
                       </table>
                   </React.Fragment>
               </div>
           </div>
       )
    }
}

