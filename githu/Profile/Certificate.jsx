/* Certificate section */
import React from 'react';
import Cookies from 'js-cookie';

export default class Certificate extends React.Component {

    constructor(props) {
        super(props)
     /*   const certificateData = props.certificateData ?
            Object.assign({}, props.certificateData) : {
                certifications: []
            }
        this.state = {
            newCertificate: certificateData
        }*/

    };

    render() {
      //  let certifications = this.props.certificateData ? this.props.certificateData.certifications : ""
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>certifications:</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button">Edit</button>
                </div>
            </div>
        )
    }
}

