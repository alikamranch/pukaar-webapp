import React, { Component } from "react";
import { Helmet } from "react-helmet";
import firebase from "../../firebase";
import "./Stats.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdbreact";

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      weeklyStats: {},
      overallStats: {},
    };
  }

  componentDidMount() {
    const db = firebase.firestore();
    //for families document
    var docRef = db.collection("pukaar").doc("families");
    docRef
      .get()
      .then((doc) => {
        const data = doc.data().people;
        this.setState({
          people: data,
        });
        console.log(this.state.people);
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });

    //for weekly stats document
    var docRef2 = db.collection("pukaar").doc("weekly_stats");
    docRef2
      .get()
      .then((doc) => {
        const data = doc.data().stats;
        this.setState({
          weeklyStats: data,
        });
        console.log(this.state.weeklyStats);
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });

    //for overall stats document
    var docRef3 = db.collection("pukaar").doc("overall_stats");
    docRef3
      .get()
      .then((doc) => {
        const data = doc.data().stats;
        this.setState({
          overallStats: data,
        });
        console.log(this.state.overallStats);
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }

  render() {
    const stateData = this.state.people;
    const weekly = this.state.weeklyStats;
    const overall = this.state.overallStats;
    const served = [];
    const queue = [];
    const newPeople = [];
    for (var person of stateData) {
      if (person.status === "Served") {
        served.push(person);
      } else if (person.status === "In Queue") {
        queue.push(person);
      } else if (person.status === "New") {
        newPeople.push(person);
      }
    }

    console.log(served, "Served");
    console.log(queue, "In Queue");
    console.log(newPeople, "New");

    return (
      <div>
        <Helmet>
          <title>Stats</title>
        </Helmet>
        <div className="mt-5">
          <MDBContainer>
            <MDBRow>
              <MDBCol md="4">
                <h4 className="text-left">Served</h4>
                <hr></hr>
                <MDBTable responsive>
                  <MDBTableHead color="success-color" textWhite>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Contact</th>
                      <th>Status</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {served.map((person) => (
                      <tr>
                        <td>{person.id}</td>
                        <td>{person.name}</td>
                        <td>{person.contact}</td>
                        <td>{person.status}</td>
                      </tr>
                    ))}
                  </MDBTableBody>
                </MDBTable>
              </MDBCol>
              <MDBCol md="4">
                <h4 className="text-left">In Queue</h4>
                <hr></hr>
                <MDBTable responsive>
                  <MDBTableHead color="warning-color" textWhite>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Contact</th>
                      <th>Status</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {queue.map((person) => (
                      <tr>
                        <td>{person.id}</td>
                        <td>{person.name}</td>
                        <td>{person.contact}</td>
                        <td>{person.status}</td>
                      </tr>
                    ))}
                  </MDBTableBody>
                </MDBTable>
              </MDBCol>
              <MDBCol md="4">
                <h4 className="text-left">New</h4>
                <hr></hr>
                <MDBTable responsive>
                  <MDBTableHead color="danger-color" textWhite>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Contact</th>
                      <th>Status</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {newPeople.map((person) => (
                      <tr>
                        <td>{person.id}</td>
                        <td>{person.name}</td>
                        <td>{person.contact}</td>
                        <td>{person.status}</td>
                      </tr>
                    ))}
                  </MDBTableBody>
                </MDBTable>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>

        <div className="mt-5 mb-5">
          <MDBContainer>
            <MDBRow>
              <MDBCol md="6">
                <h4 className="text-left">Weekly Stats</h4>
                <hr></hr>
                <MDBTable responsive>
                  <MDBTableHead color="primary-color" textWhite>
                    <tr>
                      <th>Total Families Served</th>
                      <th>Total Donations Collected</th>
                      <th>Total Bags Dispatched</th>
                      <th>Total Donation Collected (RS)</th>
                      <th>New Cases</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>{weekly.totalFamiliesServed}</td>
                      <td>{weekly.totalDonationsCollected}</td>
                      <td>{weekly.totalBagsDispatched}</td>
                      <td>{weekly.totalDonationsRs}</td>
                      <td>{weekly.newCases}</td>
                    </tr>
                  </MDBTableBody>
                </MDBTable>
              </MDBCol>
              <MDBCol md="6">
                <h4 className="text-left">Overall Stats</h4>
                <hr></hr>
                <MDBTable responsive>
                  <MDBTableHead color="secondary-color" textWhite>
                    <tr>
                      <th>Total Families Served</th>
                      <th>Total Donations Collected</th>
                      <th>Total Bags Dispatched</th>
                      <th>Total Donation Collected (RS)</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>{overall.totalFamiliesServed}</td>
                      <td>{overall.totalDonationsCollected}</td>
                      <td>{overall.totalBagsDispatched}</td>
                      <td>{overall.totalDonationsRs}</td>
                    </tr>
                  </MDBTableBody>
                </MDBTable>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
    );
  }
}

export default Stats;
