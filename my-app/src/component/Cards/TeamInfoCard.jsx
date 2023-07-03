import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { StatisticsCall } from '../../utils/GitLabUtils'
import "../../main.css"

//from https://gitlab.com/jacksonnakos/cs373-idb/-/blob/7cc34c00f4149980fcb34364119151cba6fad1ea/front-end/src/components/IndividualAbout.tsx
//Name, photo, bio, major responsibilities (ex: frontend vs backend team), # of commits, issues, and unit tests contributed of each team member


const TeamInfoCard = (props) => {
    let commitsCount = props.CommitsCount
    let name = props.name
    let gitlab_username = props.gitlab_username
    let image = props.image
    let bio = props.bio
    let role = props.role
    let unitTestsCount = props.unitTestsCount
    console.log("props", props)

    const [issuesCount, setIssuesCount] = useState(0)
    useEffect(() => {
        fetch('https://gitlab.com/api/v4/projects/43437415/issues_statistics?assignee_username=' + gitlab_username).then(function (response) {
            return response.text();
        })
            .then(function (myJson) {
                let stats = JSON.parse(myJson)
                let result = stats.statistics.counts.all
                setIssuesCount(result)
            });
    }, [])

    return (
        <div
            class="container-team-info"  style={{ width: '18rem' }} >
            <div class='box-team-info'>
                <div class="image-container">
                <img class="holder" src={image}></img>
                </div>
                <div>
                    <strong>{name} </strong>
                    <p> Bio: {bio}  </p>
                    <p> Role: {role} </p>
                    <p>CommitsCount: {commitsCount}</p>
                    <p>IssuesCount: {issuesCount} </p>
                    <p>UnitTestsCount: {unitTestsCount}</p>
                    <p>GitLabUserName: {gitlab_username}</p>

                </div>
            </div>
        </div>
    )
}

export default TeamInfoCard