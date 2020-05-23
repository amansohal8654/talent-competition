/* Social media JSX */
import React from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Popup } from 'semantic-ui-react';

export default class SocialMediaLinkedAccount extends React.Component {
    constructor(props) {
        super(props);
        const linkedAccounts = props.linkedAccounts ?
            Object.assign({}, props.linkedAccounts)
            : {
                github: "",
                linkedln: "",
                
            }
        this.state = {
            showEditSection: false,
            newAccounts: linkedAccounts,
           
        }
        console.log(this.state.newAccounts);
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveContact = this.saveContact.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
    }
    openEdit() {
        const linkedAccounts = Object.assign({}, this.props.linkedAccounts)
        this.setState({
            showEditSection: true,
            newAccounts: linkedAccounts
        })
    }


    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange(event) {
        debugger;
        const data = Object.assign({}, this.state.newAccounts)
        data[event.target.name] = event.target.value
        this.setState({
            newAccounts: data
        })
    }

    saveContact() {
        //console.log(this.props.componentId)
        //console.log(this.state.newAccounts)
        const data = Object.assign({}, this.state.newAccounts)
        this.props.saveProfileData(this.props.Id, data)
        this.closeEdit()
    }
    componentDidMount() {
        $('.ui.button.social-media')
            .popup();
    }

    renderEdit() {
        return (
            <div className='ui sixteen wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="linkedln Account"
                    name="linkedIn"
                    value={this.state.newAccounts.linkedIn}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your linkedIn Url"
                    errorMessage="Please enter a valid linkedIn Account"
                />

                <ChildSingleInput
                    inputType="text"
                    label="Github Account"
                    name="github"
                    value={this.state.newAccounts.github}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your first github url"
                    errorMessage="Please enter a valid linkedIn Account"
                />

                <button type="button" className="ui teal button" onClick={this.saveContact}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }
    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderDisplay() {
        let linkedin = this.props.linkedAccounts ? this.props.linkedAccounts.linkedIn  : ""
        let github = this.props.linkedAccounts ? this.props.linkedAccounts.github : ""
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <div>

                            <a href= {linkedin} className="ui primary button">linkedin</a>
                            <a href={github} className="ui secondary button">github</a>
                        </div>
                       
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit} >Edit</button>
                </div>
            </div>
        )
       

    }

}