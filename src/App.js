import React, { Component } from "react";
import NavBar from "./components/navbar/NavBar";
import Search from "./components/search/Search";
import MUiThemeProvider from "material-ui/styles/MuiThemeProvider";
import "./App.css";

class App extends Component {
  render() {
    return (
      <MUiThemeProvider>
        <div>
          <NavBar />
          <Search />
        </div>
      </MUiThemeProvider>
    );
  }
}

export default App;
