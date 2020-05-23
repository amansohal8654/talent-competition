import React from 'react'
import { Form, Checkbox, Radio } from 'semantic-ui-react';
import { SingleInput } from '../Form/SingleInput.jsx';

export default class TalentStatus extends React.Component {
    constructor(props) {
        super(props);
        const status = props.status ?
            Object.assign({}, props.status)
            : {
                status: "",
                availableDate: null

            }
        this.state = {
            newStatus:status
        }
        this.handleChange = this.handleChange.bind(this)
      
    }
    handleChange(event, {name,value}) {
        debugger
        const data = Object.assign({}, this.state.newStatus)
        data[name] = value
        
       // const statusData = Object.assign({}, this.state.newStatus)
        this.props.saveProfileData("jobSeekingStatus", data)
    }
    render() {
        let status = this.props.status ? this.props.status.status : ""
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <Form>
                            <Form.Field>
                                Selected value: <b>{status}</b>
                            </Form.Field>
                            <Form.Field>
                                <Radio
                                    label='Actively looking for job'
                                    name='status'
                                    value='Actively looking for job'
                                    checked={status === 'Actively looking for job'}
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Radio
                                    label='not looking for job at this moment'
                                    name='status'
                                    value='not looking for job at this moment'
                                    checked={status === 'not looking for job at this moment'}
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Radio
                                    label='Currently employed but open to offers'
                                    name='status'
                                    value='Currently employed but open to offers'
                                    checked={status === 'Currently employed but open to offers'}
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Radio
                                    label='Will be avaliable on late date'
                                    name='status'
                                    value='Will be avaliable on late date'
                                    checked={status === 'Will be avaliable on late date'}
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                        </Form>
                    </React.Fragment>
                   
                </div>
            </div>
        )
    }
}