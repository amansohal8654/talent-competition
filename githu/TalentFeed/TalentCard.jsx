import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types'
import { Popup, Icon, Embed, Card, } from 'semantic-ui-react'

export default class TalentCard extends React.Component {
    constructor(props) {
        super(props);
        const talent = props.data ?
            Object.assign([], props.data)
            : []
        const showProfile = props.showProfileInfo ?
            Object.assign([], props.showProfileInfo)
            : []
        this.state = {
            data: talent,
            showProfileInfo: showProfile
        }
        this.openProfile = this.openProfile.bind(this)
        this.openVideo = this.openVideo.bind(this)
        this.linkedin = this.linkedin.bind(this)
        this.github = this.github.bind(this)
        this.cvName = this.cvName.bind(this)
    };
    openProfile(index) {
        this.props.controlShowProfile(this.props.setShowProfile, index);
    }
    openVideo(index) {
        this.props.controlShowProfile(this.props.resetShowProfile, index);
    }
    linkedin() {
        let data = this.props.data || null
        let linkedAccounts = data.linkedAccounts || null
        let linkedin = linkedAccounts ? linkedAccounts.linkedIn : ""
       // let linkedin = "https://www.w3schools.com/howto/howto_css_icon_buttons.asp"
      
        if (linkedin == "" || null) {
            TalentUtil.notification.show(
                "linkedin profile is not Found", "error", null, null)
        }
        if (linkedin != "" || null) {
            window.open(linkedin);
        }
    }
    github() {
        let data = this.props.data || null
        let linkedAccounts = data.linkedAccounts || null
        let github = linkedAccounts ? linkedAccounts.github : ""
       // let linkedin = "https://www.w3schools.com/howto/howto_css_icon_buttons.asp"
      
        if (github == "" || null) {
            TalentUtil.notification.show(
                "github profile is not Found", "error", null, null)
        }
        if (github != "" || null) {
            window.open(github);
        }
    }
    cvName() {
        let data = this.props.data || null
        let cvName = data.cvName || null
        //let cvName = "https://www.w3schools.com/howto/howto_css_icon_buttons.asp"

        if (cvName === null || "" || undefined) {
            TalentUtil.notification.show(
                "CV not Found", "error", null, null)
        }
        if (cvName != null || "" || undefined) {
            window.open(cvName);
        }
    }

    render() {
        //
        //const user = this.props.data.find((l) => l.id === id);
        let dataList = this.props.data || null
       // let profile = null
        let user = dataList.map((data, index) =>(
            < div className="ui raised link job card" key={index} >
                <div className="content">
                    <div className="header" style={{ paddingBottom: "20px" }}> {data.firstName} {data.lastName}
                        <i className="star icon" style={{ float: "right" }} ></i>
                    </div>
                    {this.props.showProfileInfo[index] ?
                          <Embed
                            id='O6Xo21L0ybE'
                            placeholder='https://react.semantic-ui.com/images/image-16by9.png'
                            // iframe= "https://www.youtube.com/embed/Tiff_FpOm6E"
                            url={data.videoName}
                        />:
                        <div className="ui grid">
                            <div className="eight wide column">
                                <div className="ui link cards">
                                    <div className="card">
                                        <div className="image">
                                            <img src="https://semantic-ui.com/images/avatar2/large/matthew.png" />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="eight wide column">
                                <div className="content">
                                    <h4 className="ui sub header">Talent SnapShot</h4>
                                    <div className="ui small feed">
                                        <div className="event">
                                            <div className="content">
                                                <div className="summary">
                                                    <a>Currnet Employer</a><br />: Aics
          </div>
                                            </div>
                                        </div>
                                        <div className="event">
                                            <div className="content">
                                                <div className="summary">
                                                    <a>Visa status</a><br /> :Citzen
                                            </div>
                                            </div>
                                        </div>
                                        <div className="event">
                                            <div className="content">
                                                <div className="summary">
                                                    <a>Postion</a><br /> : Software Devloper

          </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        }


                    <div className="ui grid" style={{ paddingTop: "20px", paddingLeft: "20px" }}>
                        {this.props.showProfileInfo[index] ?
                            <div className="four wide column"><i className="user icon" onClick={() => this.openProfile(index)} ></i></div>:
                            <div className="four wide column"><i className="video icon" onClick={() => this.openVideo(index)} ></i></div>}
                            
                        <div className="four wide column"><i className="file pdf outline icon" onClick={this.cvName}></i></div>
                        <div className="four wide column"><i className="linkedin icon" onClick={this.linkedin}></i></div>
                        <div className="four wide column"> <i className="github icon" onClick={this.github}></i></div>
                    </div>
                    <div className="ui grid" style={{ paddingTop: "20px", paddingLeft: "20px", paddingBottom: "30px" }}>
                        {data.skills.length ? 
                         data.skills.map((skill) => (
                            <div className="ui blue basic label">
                                {skill}
                                </div>
                         )) :
                            <div>
                            <div className="ui blue basic label">
                               <p>c#</p>
                            </div>
                            <div className="ui blue basic label">
                                <p>c</p>
                            </div>
                            <div className="ui blue basic label">
                                <p>react</p>
                                </div>
                                </div>
                            }
                            
                        </div>
                </div>

                    </div >
        ));
        
        let newUser = this.props.data && this.props.showProfileInfo ? user : 'There is no talents found for your recuritment company.'
        return (

            <div>
                {newUser}
            </div>
        );
    }

  
}

