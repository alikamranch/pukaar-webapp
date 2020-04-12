import React from "react";
import { Helmet } from "react-helmet";
import firebase from "../../firebase";
import "./Add.css";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: [],
      people: {
        id: null,
        contact: "",
        name: "",
        status: "",
      },
      overall_stats: {
        totalBagsDispatched: null,
        totalDonationsCollected: null,
        totalDonationsRs: null,
        totalFamiliesServed: null,
      },
      weekly_stats: {
        newCases: null,
        totalBagsDispatched: null,
        totalDonationsCollected: null,
        totalDonationsRs: null,
        totalFamiliesServed: null,
      },
    };
  }

  //Handles fetching data from firebase
  componentDidMount() {
    const db = firebase.firestore();
    var docRef = db.collection("pukaar").doc("families");

    docRef
      .get()
      .then((doc) => {
        const data = doc.data().people;
        this.setState({
          allData: data,
        });
        console.log(this.state.allData);
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }

  //sets the id of the person in the state object
  setId = () => {
    const arrayData = this.state.allData;
    var personid = null;
    arrayData.map((person) => (personid = person.id));
    console.log(personid);
    personid = personid + 1;
    this.setState({
      people: { ...this.state.people, id: personid },
    });
  };

  //sets the name and contact of the person in the state object
  handlePeople = (e) => {
    this.setState({
      people: { ...this.state.people, [e.target.name]: e.target.value },
    });
  };

  //sets the select dropdown value for the people object in the state
  handlePeopleSelect = (e) => {
    this.setState({
      people: { ...this.state.people, status: e.target.value },
    });
  };

  //submit handler for the Add New People form
  handlePeopleSubmit = (event) => {
    const people = this.state.people;
    console.log(people);
    const db = firebase.firestore();
    var docRef = db.collection("pukaar").doc("families");
    docRef.update({
      people: firebase.firestore.FieldValue.arrayUnion(people),
    });
    alert("Person Added!");
    event.preventDefault();
    this.setState({
      people: {
        id: null,
        contact: "",
        name: "",
        status: "",
      },
    });
  };

  //change handler for weekly stats form
  handleWeeklyStats = (e) => {
    this.setState({
      weekly_stats: {
        ...this.state.weekly_stats,
        [e.target.name]:
          e.target.type === "number"
            ? parseInt(e.target.value, 10)
            : e.target.value,
      },
    });
  };

  //submit handler for the Update Weekly Stats form
  handleWeeklyStatsSubmit = (event) => {
    const weeklyStats = this.state.weekly_stats;
    console.log(weeklyStats);
    const db = firebase.firestore();
    db.collection("pukaar")
      .doc("weekly_stats")
      .set({ stats: weeklyStats })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
    alert("Weekly Stats Updated!");
    event.preventDefault();
    this.setState({
      weekly_stats: {
        newCases: "",
        totalBagsDispatched: "",
        totalDonationsCollected: "",
        totalDonationsRs: "",
        totalFamiliesServed: "",
      },
    });
  };

  //change handler for overall stats form
  handleOverallStats = (e) => {
    this.setState({
      overall_stats: {
        ...this.state.overall_stats,
        [e.target.name]:
          e.target.type === "number"
            ? parseInt(e.target.value, 10)
            : e.target.value,
      },
    });
  };

  //submit handler for the Update Overall Stats form
  handleOverallStatsSubmit = (event) => {
    const overallStats = this.state.overall_stats;
    console.log(overallStats);
    const db = firebase.firestore();
    db.collection("pukaar")
      .doc("overall_stats")
      .set({ stats: overallStats })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
    alert("Overall Stats Updated!");
    event.preventDefault();
    this.setState({
      overall_stats: {
        totalBagsDispatched: "",
        totalDonationsCollected: "",
        totalDonationsRs: "",
        totalFamiliesServed: "",
      },
    });
  };

  render() {
    return (
      <div className="mb-5">
        <Helmet>
          <title>Add</title>
        </Helmet>
        <div className="mt-5">
          <MDBContainer>
            <h3 className="text-left">Add New People</h3>
            <hr></hr>
            <MDBContainer>
              <MDBRow className="justify-content-center">
                <MDBCol md="4">
                  <form onSubmit={this.handlePeopleSubmit}>
                    <div className="grey-text">
                      <MDBInput
                        label="Name"
                        type="text"
                        name="name"
                        value={this.state.people.name}
                        onChange={this.handlePeople}
                      />
                      <MDBInput
                        label="Contact"
                        type="text"
                        name="contact"
                        value={this.state.people.contact}
                        onChange={this.handlePeople}
                      />
                      <select
                        className="browser-default custom-select"
                        value={this.state.people.status}
                        onChange={this.handlePeopleSelect}
                      >
                        <option>Status</option>
                        <option value="Served">Served</option>
                        <option value="In Queue">In Queue</option>
                        <option value="New">New</option>
                      </select>
                    </div>
                    <br />
                    <div className="text-center">
                      <MDBBtn color="cyan" type="submit" onClick={this.setId}>
                        Add
                      </MDBBtn>
                    </div>
                  </form>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBContainer>
        </div>

        <div className="mt-5">
          <MDBContainer>
            <h3 className="text-left">Update Weekly Stats</h3>
            <hr></hr>
            <MDBContainer>
              <MDBRow className="justify-content-center">
                <MDBCol md="4">
                  <form onSubmit={this.handleWeeklyStatsSubmit}>
                    <div className="grey-text">
                      <MDBInput
                        label="Total Families Served"
                        type="number"
                        value={this.state.weekly_stats.totalFamiliesServed}
                        name="totalFamiliesServed"
                        onChange={this.handleWeeklyStats}
                      />
                      <MDBInput
                        label="Total Donations Collected"
                        type="number"
                        value={this.state.weekly_stats.totalDonationsCollected}
                        name="totalDonationsCollected"
                        onChange={this.handleWeeklyStats}
                      />
                      <MDBInput
                        label="Total Bags Dispatched"
                        type="number"
                        value={this.state.weekly_stats.totalBagsDispatched}
                        name="totalBagsDispatched"
                        onChange={this.handleWeeklyStats}
                      />
                      <MDBInput
                        label="Total Donation Collected (Rs)"
                        type="number"
                        value={this.state.weekly_stats.totalDonationsRs}
                        name="totalDonationsRs"
                        onChange={this.handleWeeklyStats}
                      />
                      <MDBInput
                        label="New Cases"
                        type="number"
                        value={this.state.weekly_stats.newCases}
                        name="newCases"
                        onChange={this.handleWeeklyStats}
                      />
                    </div>
                    <div className="text-center">
                      <MDBBtn color="cyan" type="submit">
                        Update
                      </MDBBtn>
                    </div>
                  </form>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBContainer>
        </div>

        <div className="mt-5">
          <MDBContainer>
            <h3 className="text-left">Update Overall Stats</h3>
            <hr></hr>
            <MDBContainer>
              <MDBRow className="justify-content-center">
                <MDBCol md="4">
                  <form onSubmit={this.handleOverallStatsSubmit}>
                    <div className="grey-text">
                      <MDBInput
                        label="Total Families Served"
                        type="number"
                        value={this.state.overall_stats.totalFamiliesServed}
                        name="totalFamiliesServed"
                        onChange={this.handleOverallStats}
                      />
                      <MDBInput
                        label="Total Donations Collected"
                        type="number"
                        value={this.state.overall_stats.totalDonationsCollected}
                        name="totalDonationsCollected"
                        onChange={this.handleOverallStats}
                      />
                      <MDBInput
                        label="Total Bags Dispatched"
                        type="number"
                        value={this.state.overall_stats.totalBagsDispatched}
                        name="totalBagsDispatched"
                        onChange={this.handleOverallStats}
                      />
                      <MDBInput
                        label="Total Donation Collected (Rs)"
                        type="number"
                        value={this.state.overall_stats.totalDonationsRs}
                        name="totalDonationsRs"
                        onChange={this.handleOverallStats}
                      />
                    </div>
                    <div className="text-center">
                      <MDBBtn color="cyan" type="submit">
                        Update
                      </MDBBtn>
                    </div>
                  </form>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBContainer>
        </div>
      </div>
    );
  }
}

export default Add;
