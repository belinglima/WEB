import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

class Tabs extends Component {
  componentDidMount() {
    M.Tabs.init(this.Tabs);
  }
  render() {
    return (
      <div>
        <ul
          ref={Tabs => {
            this.Tabs = Tabs;
          }}
          id="tabs-swipe-demo"
          className="tabs"
        >
          <li className="tab col s3">
            <a href="#test-swipe-1">Test 1</a>
          </li>
          <li className="tab col s3">
            <a href="#test-swipe-2">Test 2</a>
          </li>
          <li className="tab col s3">
            <a href="#test-swipe-3">Test 3</a>
          </li>
        </ul>

        <div id="test-swipe-1" className="col s12 blue">
          Test 1
        </div>
        <div id="test-swipe-2" className="col s12 red">
          Test 2
        </div>
        <div id="test-swipe-3" className="col s12 green">
          Test 3
        </div>
      </div>
    );
  }
}

export default Tabs;
