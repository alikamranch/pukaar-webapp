import React from "react";
import { Helmet } from "react-helmet";
import "./Home.css";
import firebase from "../../firebase";
import { MDBContainer, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
    };
  }

  componentDidMount() {
    const db = firebase.firestore();
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
  }

  render() {
    const people = this.state.people;
    return (
      <div>
        <div className="background img-fluid">
          <Helmet>
            <title>Home</title>
          </Helmet>
        </div>
        <div className="mt-5">
          <MDBContainer>
            <MDBTable responsive>
              <MDBTableHead color="default-color" textWhite>
                <tr>
                  <th>
                    <b>#</b>
                  </th>
                  <th>
                    <b>Name</b>
                  </th>
                  <th>
                    <b>Contact</b>
                  </th>
                  <th>
                    <b>Status</b>
                  </th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {people.map((person) => (
                  <tr>
                    <td>{person.id}</td>
                    <td>{person.name}</td>
                    <td>{person.contact}</td>
                    <td>{person.status}</td>
                  </tr>
                ))}
              </MDBTableBody>
            </MDBTable>
          </MDBContainer>
        </div>
      </div>
    );
  }
}

export default Home;
