/* Photo upload section */
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { ImagePicker } from 'react-file-picker'

export default class PhotoUpload extends Component {

    constructor(props) {
        super(props);

        this.state = { imageURL: null, file: '' };
        this.handleChange = this.handleChange.bind(this);
        this.savePhoto = this.savePhoto.bind(this);

    };

    handleChange(event) {
        event.preventDefault();
        let formData = new FormData();
        let file = event.target.files[0]
        formData.append('myImage', file);
        let imageURL = URL.createObjectURL(event.target.files[0]);

        
        this.setState({ imageURL: imageURL, file: formData })
    }

    savePhoto() {
        let photoFile = this.state.file
        var cookies = Cookies.get("talentAuthToken");
        $.ajax({
            url: 'https://talentservicesprofile20200522134254.azurewebsites.net/profile/profile/updateProfilePhoto', 
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + cookies
                /*'Content-Type': 'application/json'*/
            },
            data: photoFile,
            dataType: "json",
            processData: false,
            contentType: false,
            success: function (res) {
                console.log(res)
                if (res.success == true) {
                    TalentUtil.notification.show("Profile updated sucessfully", "success", null, null)
                    window.location.reload();
                } else {
                    TalentUtil.notification.show("Profile did not update successfully", "error", null, null)
                }
            }.bind(this),
            error: function (res, a, b) {
                console.log(res)
                console.log(a)
                console.log(b)
            }
        
            })
        

    }
   

    render() {
        debugger
        let image = "";
        let updateImag = this.state.imageURL;
        
        const profileImage = this.props.imageId || null
       if (profileImage != null) {
            image = (
                <div>
                    
                    <label htmlFor="myInput"><img className="ui medium circular image" src={profileImage} alt="Profile image" />
                        </label>
                    <input
                        id="myInput" 
                        style={{ display: 'none' }}
                        type={"file"}
                        multiple={false}
                        onChange={this.handleChange}
                    />
                </div>
                )

            
        }
        if (updateImag != null) {
            image = (
               
                    <div
                    >
                    <img className="ui medium circular image" src={updateImag} />
                    <span>
                        <button type="button" className="ui teal button" onClick={this.savePhoto}>Uploda</button>
                        </span>
                    </div>
                )

        }
        if (profileImage == null && updateImag == null ) {
            image = ( 
                <div> 
                    <label htmlFor="myInput"><i type="file" aria-hidden="true" className="camera retro big icon" style={{ "fontSize": "200px", "paddingLeft": "640px" }}  >
                    </i></label>
                    <input
                        id="myInput"
                        style={{ display: 'none' }}
                        type={"file"}
                        multiple={false}
                        onChange={this.handleChange}
                    />
                </div>
                )
        }
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        {image}

                    </React.Fragment>
                    
                </div>
            </div>
        )
        
    }
}
