import React from 'react';
import { Loader } from 'semantic-ui-react';

export default class CompanyProfile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        
        let Name = this.props.Name || null;
        let email = this.props.email || null;
        let phone = this.props.phone || null;
        let country = this.props.country || null;
        let city = this.props.city || null;
        return (
            <div className="ui card">
                <div className="content">
                    <div className="center aligned author">
                        <img className="ui avatar image" src="http://semantic-ui.com/images/avatar/small/jenny.jpg" />
                    </div>
                    <div className="center aligned header">{Name}</div>
                    <div className="center aligned header">{city}/{country}</div>
                    <div className="center aligned description">
                        <div class="ui card">
                            <div class="content">
                                <div class="description">
                                    We currently do not have specific skills that we desire.
      </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="extra content">
                    <div className="center aligned author">
                        <div className="center aligned header"><i class="mail outline big icon"></i>{email}</div>
                        <div className="center aligned header"><i class="call big icon"></i>{phone}</div>
                    </div>
                </div>
            </div>
        )
    }
}