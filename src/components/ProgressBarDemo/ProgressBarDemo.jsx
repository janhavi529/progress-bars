import React, { Component } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import ProgressBar from './ProgressBar/ProgressBar';
import Button from '../form/Button/Button';
import Dropdown from '../form/Dropdown/Dropdown';
import '../../styles/scss/components/_progress-bar-demo.scss';

class ProgressBarDemo extends Component {
  state = {
    progressBars: [],
    buttons: [],
    limit: 100,
    error: false,
    loading: true,
    selectedBar: 1,
  }

  componentDidMount() {
    let updatedProgressBars = [];

    // Call the API to fetch progress bar data.
    axios.get('/bars').then(({ data }) => {
      if (data) {
        const { bars, buttons, limit } = data;

        // Store Progress Bar objects in state for business logic implementation.
        updatedProgressBars = bars.map((value, index) => ({
          barId: index + 1,
          value,
          label: 'Progress Bar #' + (index + 1),
        }));

        this.setState({
          progressBars: updatedProgressBars,
          buttons,
          limit,
          loading: false
        });
      }
    }).catch((error) => {
      this.setState({ error: error });
    });
  }

  render() {
    let progressBarList = [], buttonList = [], dropdownValues = [];
    const { loading, error, progressBars, buttons, limit, selectedBar } = this.state;

    if (loading) {
      return <Loader type="ThreeDots" color="grey" height={80} width={80} className="center-align"/>;
    } else if (error) {
      return <div className="error">Error occurred while loading API data: {error}</div>;
    } else {
      progressBarList = progressBars && progressBars.map(({ barId, value, label }) => {
        // Create dropdown menu options for progress bars.
        dropdownValues.push({
          id: barId,
          label,
        });

        return <ProgressBar key={barId} value={value} limit={limit} />;
      });

      buttonList = buttons.map((offset) => <Button key={offset} className="btn btn-light m-1" value={parseInt(offset)} onClick={(event) => this.onPercentageChange(event)} />);
    }

    return (
      <section className="bar-progress-wrapper">
        <header className="page-header">
          <h1 className="bar-progress-title">Progress Bar Demo</h1>
        </header>
        <main className="page-main">
          <div className="bar-progress-container">
            {progressBarList}
          </div>
          <div className="bar-progress-controls">
            <Dropdown label="Select Progress Bar" value={selectedBar} options={dropdownValues} onChange={(event) => this.onProgressBarSelect(event)} />
            <div className="mx-2 text-center"><div className="mb-1">Increment/Decrement Percentage</div>{buttonList}</div>
          </div>
        </main>
      </section>
    );
  }

  /* On every selection from the dropdown menu, set the selected progress bar. */
  onProgressBarSelect = (event) => {
    this.setState({ selectedBar: parseInt(event.target.value) });
  }

  /* Update selected progress bar on increasing/decreasing the bar percentage. */
  onPercentageChange = (event) => {
    const { progressBars, selectedBar } = this.state;
    const bars = progressBars && progressBars.reduce((accumulator, progressBar) => {
      if (progressBar.barId === selectedBar)
        progressBar.value = parseInt(progressBar.value) + parseInt(event.target.value);
      accumulator.push(progressBar);
      return accumulator;
    }, []);

    this.setState({
      progressBars: bars
    });
  }
}

export default ProgressBarDemo;
