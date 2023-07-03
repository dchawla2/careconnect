import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from 'react-bootstrap/ListGroup';
import { teamInfo } from "../../data/TeamInfo"
import TeamInfoCard from './TeamInfoCard';
import { ContributorInfo, findContributorInfoWithName } from '../../utils/GitLabUtils';
import { Container } from 'react-bootstrap';

//inspired from https://gitlab.com/jacksonnakos/cs373-idb/-/blob/7cc34c00f4149980fcb34364119151cba6fad1ea/front-end/src/components/ListOfIndividualAbout.tsx
const ListOfTeamInfoCards = (props: any) => {
  let listOfContributorInfo: ContributorInfo[] = props.listOfContributorInfo

  const teamInfoRows = [
    teamInfo.slice(0, Math.ceil(teamInfo.length / 2)),
    teamInfo.slice(Math.ceil(teamInfo.length / 2), teamInfo.length)
  ];

  return (
    <div>
      {teamInfoRows.map((teamInfoRow, rowIndex) => (
        <div style={{ display: "flex", justifyContent: "center" }} key={rowIndex}>
          <ListGroup horizontal>
            {teamInfoRow.map((data, index) => {
              console.log("teamInfodata", data)
              let contributorInfo = findContributorInfoWithName(listOfContributorInfo, data.name)
              let commitsCount = 0
              console.log("contributorInfo at List of info cards", contributorInfo)
              if (contributorInfo != null) {
                commitsCount = (contributorInfo as ContributorInfo).commits
                console.log("commitsCount", commitsCount)
              }
              return (
                <Container style={{ display: "flex" }} className="teamInfo" key={index}>

                  <Row>
                    <Col>
                      <TeamInfoCard
                        name={data.name}
                        gitlab_username={data.gitlab_username}
                        email={data.email}
                        image={data.image}
                        role={data.role}
                        bio={data.bio}
                        unitTestsCount={data.unitTestsCount}
                        CommitsCount={commitsCount}
                      />
                    </Col>
                  </Row>
                </Container>
              );
            })}
          </ListGroup>
        </div>
      ))}
    </div>
  )
}
export default ListOfTeamInfoCards;
