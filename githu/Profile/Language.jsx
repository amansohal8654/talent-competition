/* Language section */
import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';

const initalLanguage = {
    id: null,
    isDeleted: false,
    name: "",
    level: "",
};

export default class Language extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            language: initalLanguage,
            showEditSection: false,
            showAddSection: false,
        }
        this.addNew = this.addNew.bind(this)
        this.edit = this.edit.bind(this)

        this.closeAddNew = this.closeAddNew.bind(this)

        this.handleChange = this.handleChange.bind(this)
        this.saveLanguage = this.saveLanguage.bind(this)
        this.deleteLanguage = this.deleteLanguage.bind(this);

        this.renderEdit = this.renderEdit.bind(this);
        this.renderAdd = this.renderAdd.bind(this);

    }
    addNew() {
        //debugger;
        this.setState({
            showAddSection: true,
            showEditSection: false,
            language: initalLanguage,
        })
    }

    closeAddNew() {
        this.setState({
            showEditSection: false,
            showAddSection: false,
            language: initalLanguage,
        })
    }
    edit(id) {
        const language = this.props.languageData.find((l) => l.id === id);
        this.setState({ language: language, showEditSection: true });
    }

    handleChange({ target }) {
        const { name, value } = target;
        this.setState((state) => ({ language: { ...state.language, [name]: value } }));
    }
    deleteLanguage(id) {
        const newLanguages = this.props.languageData.filter((l) => l.id !== id);
        this.props.updateProfileData("languages", newLanguages);
    }
    saveLanguage() {
        const language = this.state.language;

        //if there is no id add the concat the language to the array
        const languages = this.state.language.id ? this.props.languageData : this.props.languageData.concat(language);
        const newLanguages = languages.reduce((curr, acc) => {
            if (acc.id === language.id) {
                curr.push(language);
            } else {
                curr.push(acc);
            }
            return curr;
        }, []);

        this.props.updateProfileData(this.props.Id, newLanguages)
        this.closeAddNew()
    }
    renderAdd() {
        const language = this.state.language;
        return (
            <div className="ui equal width grid">
                <div className="row" >
                    <div className="column">
                        <ChildSingleInput
                            inputType="text"
                            name="name"
                            value={language.name || ""}
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
                                placeholder="level"
                                value={language.level || ""}
                                onChange={this.handleChange}
                                name="level">
                                <option value="0">Enter Your Language Level</option>
                                <option value="Basic"> Basic</option>
                                <option value="Conversational"> Conversational</option>
                                <option value="Fluent"> Fluent</option>
                                <option value="Native/Bilingual"> Native/Bilingual</option>
                            </select>
                        </span>
                    </div>
                    
                </div>
                <div className="column">
                    <div style={{ "padding-top": "3.5px" }}>
                        <button type="button" className="ui teal button" onClick={this.saveLanguage}>Add</button>
                        <button type="button" className="ui button" onClick={this.closeAddNew}>Cancel</button>
                    </div>
                </div>
            </div>
            
           
    )
}
    renderEdit() {

        const language = this.state.language;

            return (
                <div className="ui equal width grid">
                    <div className="row" >
                        <div className="column">
                            <ChildSingleInput
                                id={language.id}
                                inputType="text"
                                name="name"
                                value={language.name || ""}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Add Language"
                                errorMessage="Please enter a valid Language"
                            />
                        </div>
                        <div className="column">
                            <span>
                                <select
                                    id={language.id}
                                    style={{ top: "3px" }}
                                    className="ui dropdown"
                                    placeholder="Language Level"
                                    value={language.level || ""}
                                    onChange={ this.handleChange}
                                    name="level">
                                    <option value="0">Enter Your Language Level</option>
                                    <option value="Basic"> Basic</option>
                                    <option value="Conversational"> Conversational</option>
                                    <option value="Fluent"> Fluent</option>
                                    <option value="Native/Bilingual"> Native/Bilingual</option>
                                </select>
                            </span>
                        </div>
                        <div className="column">
                            <div style={{ "padding-top": "3.5px" }}>
                                <button class="ui primary basic button" onClick={this.saveLanguage}>Update</button>
                                <button class="ui negative basic button" onClick={this.closeAddNew}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        
    }

    render (){
        const languages = this.props.languageData || [];
        const add = this.state.showAddSection ? this.renderAdd() : null;
        const edit = this.state.showEditSection ? this.renderEdit() : null;

        let languData = languages.map((language) => (
            <tr key={language.id}>
                <td>{language.name}</td>
                <td>{language.level}</td>
                <td>
                    <i className="close icon" style={{ float: "right" }} onClick={() => this.deleteLanguage(language.id)}></i>
                    <i className="pencil alternate icon" style={{ float: "right" }} onClick={() => this.edit(language.id)}></i>
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
                                    <th><button type="button" className="ui teal button" style={{ float: "right" }} onClick={this.addNew}><i className= "plus icon"></i>Add New</button></th>
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
                                {languData}
                            </tbody>
                        </table>
                    </React.Fragment>
                </div>
            </div>
        )
        
    }
}