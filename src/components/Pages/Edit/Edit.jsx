import React from "react";
import { Helmet } from "react-helmet";
import firebase from "../../firebase";
import {
  MDBContainer,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdbreact";
import "./Edit.css";

class Edit extends React.Component {
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

  deletePerson = (e) => {
    const id = parseInt(e.target.id, 10);
    console.log(id);
    const people = this.state.people;
    const updatedPeople = [];

    for (let index = 0; index < people.length; index++) {
      if (people[index].id === id) {
        people.splice(index, 1);
      }
      if (people[index]) {
        updatedPeople.push(people[index]);
      }
    }

    console.log(updatedPeople);
    const db = firebase.firestore();
    db.collection("pukaar")
      .doc("families")
      .set({ people: updatedPeople })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
    alert("Deleted!");
    e.preventDefault();

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
  };

  updateStatus = (e) => {
    const id = parseInt(e.target.id, 10);
    const text = e.target.value;
    console.log(text);
    console.log(id);
    const people = this.state.people;
    const updatedPeople = [];
    for (let index = 0; index < people.length; index++) {
      if (people[index].id === id) {
        people[index].status = text;
      }
      updatedPeople.push(people[index]);
    }
    console.log(updatedPeople);
    const db = firebase.firestore();
    db.collection("pukaar")
      .doc("families")
      .set({ people: updatedPeople })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
    alert("Updated!");
    e.preventDefault();

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
  };

  render() {
    const people = this.state.people;
    return (
      <div className="mb-5">
        <Helmet>
          <title>Edit</title>
        </Helmet>

        <div className="mt-5">
          <MDBContainer>
            <h3 className="text-left">Edit Status</h3>
            <hr></hr>
            <MDBTable responsive striped>
              <MDBTableHead color="cyan" textWhite>
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
                  <th>
                    <b>Edit</b>
                  </th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {people.map((person) => (
                  <tr>
                    <td>{person.id}</td>
                    <td>{person.name}</td>
                    <td>{person.contact}</td>
                    <td
                      className={
                        person.status === "Served"
                          ? "served"
                          : person.status === "In Queue"
                          ? "queue"
                          : person.status === "New"
                          ? "new"
                          : ""
                      }
                    >
                      {person.status}
                    </td>
                    <td>
                      {person.status === "Served" ? (
                        <MDBBtn
                          color="danger"
                          size="sm"
                          id={person.id}
                          onClick={this.deletePerson}
                          type="submit"
                        >
                          Delete
                        </MDBBtn>
                      ) : person.status === "In Queue" ? (
                        <React.Fragment>
                          <MDBBtn
                            color="success"
                            size="sm"
                            id={person.id}
                            value="Served"
                            onClick={this.updateStatus}
                            type="submit"
                          >
                            Served
                          </MDBBtn>{" "}
                          <br />
                          <MDBBtn
                            color="danger"
                            size="sm"
                            id={person.id}
                            onClick={this.deletePerson}
                            type="submit"
                          >
                            Delete
                          </MDBBtn>{" "}
                        </React.Fragment>
                      ) : person.status === "New" ? (
                        <React.Fragment>
                          <MDBBtn
                            color="success"
                            size="sm"
                            id={person.id}
                            value="Served"
                            onClick={this.updateStatus}
                            type="submit"
                          >
                            Served
                          </MDBBtn>{" "}
                          <br />
                          <MDBBtn
                            color="warning"
                            size="sm"
                            id={person.id}
                            value="In Queue"
                            onClick={this.updateStatus}
                            type="submit"
                          >
                            In Queue
                          </MDBBtn>{" "}
                          <br />
                          <MDBBtn
                            color="danger"
                            size="sm"
                            id={person.id}
                            onClick={this.deletePerson}
                            type="submit"
                          >
                            Delete
                          </MDBBtn>{" "}
                        </React.Fragment>
                      ) : (
                        ""
                      )}
                    </td>
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

export default Edit;
