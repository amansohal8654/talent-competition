import React from 'react';
import Cookies from 'js-cookie';

export default class Description extends React.Component {

    constructor(props) {
        super(props);
        const descriptionData = props.descriptionData ?
            Object.assign({}, props.descriptionData)
            : {
                summary: null,
                description: null,

            }
        this.state = {
            characters: 0,
            newDescription: descriptionData
            
        };
        this.update = this.update.bind(this);
        this.saveDescription = this.saveDescription.bind(this);
    };

    update(event) {
        const data = Object.assign({}, this.state.newDescription)
        data[event.target.name] = event.target.value;
       // this.props.updateStateData(data);
        //let description = event.target.value;
        this.setState({
           // characters: description.length,
            newDescription: data
        })
    }
    saveDescription() {
        //console.log(this.props.componentId)
        console.log(this.state.newDescription)
        const data = Object.assign({}, this.state.newDescription)
        this.props.controlFunc(this.props.Id, data)
    }
    render() {
        const characterLimit = 600;
        let summary = this.props.descriptionData.summary ? this.props.descriptionData.summary.length : 150;
        let description = this.props.descriptionData.description ? this.props.descriptionData.description.length : 0;
        
        return (
            <React.Fragment>
                <div className="four wide column">
                    <h3>Description</h3>
                    <div className="tooltip">Write a description of your company.</div>
                </div>
                <div className="ten wide column">
                    <div className="field" >
                        <input maxLength={characterLimit} name="summary" placeholder="Please Provide a short summary about your self" value={this.state.newDescription.summary} onChange={this.update} />
                    </div>
                    <p>Summary must be no more then 150 characters</p>
                    <div className="field" >
                        <textarea maxLength={characterLimit} name="description" placeholder="Please tell us about any hobbies, additional expertise, or anything else you’d like to add." value={this.state.newDescription.description} onChange={this.update} ></textarea>
                    </div>
                    <p>Characters remaining : {description} / {characterLimit}</p>
                   
                </div>
                <div className='ui sixteen wide column'>
                    <button type="button" className="ui right floated teal button" onClick={this.saveDescription}>Save</button>
                    </div>
            </React.Fragment>
        )
    }
}
