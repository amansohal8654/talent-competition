import React from 'react';


export default class FollowingSuggestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {

            }
        }
    }
    user(id) {
        const user = this.props.user.find((l) => l.id === id);
        
        this.props.details(user)
    }
    
    render() {
        return (

            <div styles={{ height: '500px', overflowY: 'scroll' }}>
                <div className="content">
                    <div className="center aligned header">Follow Talent</div>

                    <div className="ui items following-suggestion">
                        < div className="item"   >
                            <div className="ui image">
                                <img className="ui circular image" src="http://semantic-ui.com/images/avatar/small/jenny.jpg" />
                            </div>
                            <div className="content">
                                <a className="">amandeep singh</a><br></br>
                                <span> </span>
                                <button className="ui primary basic button"><i className="icon user"></i>Follow</button>
                            </div>
                        </div >
                        < div className="item"   >
                            <div className="ui image">
                                <img className="ui circular image" src="http://semantic-ui.com/images/avatar/small/jenny.jpg" />
                            </div>
                            <div className="content">
                                <a className="">Mapreet Kaur</a><br></br>
                                <span> </span>
                                <button className="ui primary basic button"><i className="icon user"></i>Follow</button>
                            </div>
                        </div >
                    </div>
                </div>
                 </div>   
               
        )
    }
}