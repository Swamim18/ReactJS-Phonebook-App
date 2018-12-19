import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/navbar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "React Phonebook Application",
      act: 0,
      index: "",
      datas: []
    };
  }

  componentDidMount() {
    this.refs.name.focus();
  }

  fSubmit = e => {
    e.preventDefault();
    console.log("try");

    let datas = this.state.datas;
    let name = this.refs.name.value;
    let number = this.refs.number.value;

    if (this.state.act === 0) {
      //New data
      let data = {
        name,
        number
      };
      datas.push(data);
    } else {
      //Update data
      let index = this.state.index;
      datas[index].name = name;
      datas[index].number = number;
    }

    this.setState({
      datas: datas,
      act: 0
    });

    this.refs.myForm.reset();
    this.refs.name.focus();
  };

  fRemove = i => {
    let datas = this.state.datas;
    datas.splice(i, 1);
    this.setState({
      datas: datas
    });

    this.refs.myForm.reset();
    this.refs.name.focus();
  };

  fEdit = i => {
    let data = this.state.datas[i];
    this.refs.name.value = data.name;
    this.refs.number.value = data.number;

    this.setState({
      act: 1,
      index: i
    });

    this.refs.name.focus();
  };

  render() {
    let datas = this.state.datas;
    return (
      <React.Fragment>
        <Navbar />
        <hr />
        <main className="container">
          <div className="App">
            <div className="jumbotron p-4">
              <form ref="myForm">
                <div className="form-group">
                  <label for="InputName">Name</label>
                  <input
                    type="text"
                    ref="name"
                    className="form-control"
                    id="InputName"
                    placeholder="Your name"
                  />
                </div>
                <div className="form-group">
                  <label for="InputNumber">Phone Number</label>
                  <input
                    type="text"
                    ref="number"
                    className="form-control"
                    id="InputNumber"
                    placeholder="Your Phone Number"
                  />
                </div>
                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-success btn-block"
                    onClick={e => this.fSubmit(e)}
                  >
                    submit{" "}
                  </button>
                </div>
              </form>
            </div>
            {this.state.datas.length > 0 && (
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Number</th>
                    <th scope="col">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {datas.map((data, i) => (
                    <tr key={i}>
                      <th scope="row">{i + 1}</th>
                      <td>{data.name}</td>
                      <td>{data.number}</td>

                      <td>
                        <div className="btn-group">
                          <button
                            onClick={() => this.fEdit(i)}
                            className="btn btn-info"
                          >
                            edit{" "}
                          </button>

                          <button
                            onClick={() => this.fRemove(i)}
                            className="btn btn-danger"
                          >
                            remove{" "}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
