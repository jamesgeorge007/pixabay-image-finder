import React, { Component, Fragment } from "react";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import axios from "axios";
import ImageResults from "../image-results/ImageResults";

const proxyurl = "https://cors-anywhere.herokuapp.com";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      amount: 15,
      apiUrl: `${proxyurl}/https://pixabay.com/api`,
      apiKey: process.env.REACT_APP_API_KEY,
      images: [],
    };
  }

  sendNetworkRequest = () => {
    const { apiUrl, apiKey, searchText, amount } = this.state;
    const url = `${apiUrl}/?key=${apiKey}&q=${searchText}&image_type=photo&per_page=${amount}&safesearch=true`;
    return axios.get(url);
  };

  async componentDidUpdate(prevState) {
    const { amount, searchText } = this.state;
    if (prevState.searchText !== searchText || prevState.amount !== amount) {
      try {
        const { data } = await this.sendNetworkRequest();
        this.setState({ images: data.hits });
      } catch (err) {
        console.error(err);
      }
    }
  }

  onTextChange = (e) => {
    const val = e.target.value;
    this.setState({ [e.target.name]: val }, async () => {
      if (val === "") {
        this.setState({ images: [] });
      }
    });
  };

  onAmountChange = (event, index, value) => this.setState({ amount: value });

  render() {
    return (
      <div>
        <TextField
          name="searchText"
          value={this.state.searchText}
          floatingLabelText="Search For Images"
          fullWidth={true}
          onChange={this.onTextChange}
        />
        <br />
        <SelectField
          name="amount"
          floatingLabelText="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
        >
          <MenuItem value={5} primaryText="5" />
          <MenuItem value={10} primaryText="10" />
          <MenuItem value={15} primaryText="15" />
          <MenuItem value={30} primaryText="30" />
          <MenuItem value={50} primaryText="50" />
        </SelectField>
        <br />
        {this.state.images.length > 0 ? (
          <ImageResults images={this.state.images} />
        ) : (
          <Fragment>
            <br />
            <p>No results found</p>
          </Fragment>
        )}
      </div>
    );
  }
}

export default Search;
