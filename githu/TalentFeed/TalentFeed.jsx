import React, { Children } from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'
import TalentCard from '../TalentFeed/TalentCard.jsx';
import { Loader, Visibility, } from 'semantic-ui-react';
import CompanyProfile from '../TalentFeed/CompanyProfile.jsx';
import FollowingSuggestion from '../TalentFeed/FollowingSuggestion.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';
import { Popup, Icon, Embed, Card } from 'semantic-ui-react'
import InfiniteScroll from "react-infinite-scroll-component";

export default class TalentFeed extends React.Component {
    constructor(props) {
        super(props);

        let loader = loaderData
        loader.allowedUsers.push("Employer")
        loader.allowedUsers.push("Recruiter")

        this.state = {
            details: { 

            },
            showProfileInfo: [],
            loadNumber: 5,
            loadPosition: 0,
            feedData: [],
            watchlist: [],
            scroll:false,
            loaderData: loader,
            activeFeed: 1,
            loadingFeedData: false,
            companyDetails: null,
            result : {
            location: { country: "", city: "" },
        }
        }

       
        this.loadData = this.loadData.bind(this);
        this.handleObserver = this.handleObserver.bind(this);
        this.updateWithoutSave = this.updateWithoutSave.bind(this);
        this.init = this.init.bind(this);
        this.controlShowProfile = this.controlShowProfile.bind(this);
        
    };

    init() {
        let loaderData = this.state.loaderData;
        loaderData.allowedUsers.push("Employer");
        loaderData.isLoading = true;
        this.setState({ loaderData, })
    }

    componentDidMount() {
        //this.scrollListener = window.addEventListener('scroll', (e) =>  { this.handleScroll(e)});
        this.loadData()
    };


    loadData() {

        debugger;
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'https://talentservicesprofile20200522134254.azurewebsites.net/profile/profile/GetTalentSnapshots',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            data: {
                activeFeed: this.state.activeFeed,
            },
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                console.log(res);
                let feedData = null;
                let result = null;
                if (res.data) {
                    feedData = res.data
                    result = res.result
                    this.updateWithoutSave(result, feedData);
                    this.setState((state) => ({ loaderData: { ...state.loaderData, isLoading: false } }));
                    console.log("feedData", feedData)
                }
            }.bind(this),
            error: function (error) {
                console.log(error);
                this.setState((state) => ({ loaderData: { ...state.loaderData, isLoading: false } }));
            }.bind(this),
        });
    }
   
    handleObserver() {
        this.setState(prevState => ({
            activeFeed: prevState.activeFeed + 1,
            //scroll: true,
        }), this.loadData)
    }

   
   
    //updates component's state without saving data
    updateWithoutSave(newValue, newArray) {
        let result = Object.assign({}, this.state.result, newValue)
        let feedData = Object.assign([], newArray)
        let arr = []
        let showProfileArray = this.props.feedData ? newArray.map((x, index) => (arr[index] = false)) : []
        this.setState({
            feedData: [...this.state.feedData, ...feedData],
            showProfileInfo: [
                ...this.state.showProfileInfo,
                ...showProfileArray
            ],
            result: result
        })
    }
    controlShowProfile(showProfileFlag, index) {
        let newshowProfileInfo = Object.assign([], this.state.showProfileInfo)
        switch (showProfileFlag) {
            case 'showProfile':
                newshowProfileInfo[index] = false
                break;
            case 'hideProfile':
                newshowProfileInfo[index] = true
                break;
            default:
                break;
        }
        this.setState({
            showProfileInfo: newshowProfileInfo
        })
    }
    render() {
       
        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                    <div className="ui grid talent-feed container">
                        <div className="four wide column">
                        <CompanyProfile
                            Name={this.state.result.name}
                            email={this.state.result.email}
                            phone={this.state.result.phone}
                            country={this.state.result.location.country}
                            city={this.state.result.location.city}
                        />
                        </div>
                    <div className="eight wide column">
                        <Visibility onBottomVisible={this.handleObserver} once={false} >
                        <TalentCard
                            data={this.state.feedData}
                            showProfileInfo={this.state.showProfileInfo}// this is array of profile info
                            controlShowProfile={this.controlShowProfile}
                            setShowProfile='showProfile'
                            resetShowProfile='hideProfile'
                            />
                            </Visibility>
                            <p id="load-more-loading">
                            <img src="/images/rolling.gif" alt="Loading…" />
                        </p>
                        
                        </div>
                        <div className="four wide column">
                        <div className="ui card">
                            <FollowingSuggestion
                                />
                            
                        </div>

                        
                        </div>
                    </div>
            </BodyWrapper>
        )
    }
}