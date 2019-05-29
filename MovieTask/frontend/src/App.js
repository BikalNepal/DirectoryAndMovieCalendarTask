import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import _ from "lodash";
import "react-big-calendar/lib/css/react-big-calendar.css";

import axios from "axios";

import logo from "./logo.svg";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./App.css";

// moment.locale("en-GB");
let localizer = BigCalendar.momentLocalizer(moment);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cal_events: []
    };
  }

  formatDate = date => {
    return moment(date).toDate();
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/shows", { crossdomain: true })
      .then(response => {
        let movies = response.data.shows;

        //sorted and grouped movie list for calculation of end time of a movie
        let sortedMoviesList = _.sortBy(movies, ["ShowDateTime"]);
        let groupedMoviesList = _.orderBy(sortedMoviesList, [
          "Auditorium.AuditoriumName"
        ]);
        groupedMoviesList.forEach((movie, index, array) => {
          let formattedStartTime = this.formatDate(movie.ShowDateTime);
          //since the api doesn't provide a duration or an end time, had to calculate and approx end time in this way for calendar
          let areSameDay = array[index + 1]
            ? moment(movie.ShowDateTime).day() ===
              moment(array[index + 1].ShowDateTime).day()
              ? true
              : false
            : false;
          let formattedEndTime = array[index + 1]
            ? array[index + 1].Auditorium.AuditoriumName ===
                movie.Auditorium.AuditoriumName && areSameDay
              ? this.formatDate(array[index + 1].ShowDateTime)
              : moment(formattedStartTime).add(3, "hours")._d
            : moment(formattedStartTime).add(3, "hours")._d; //as last movie's [index+1] doesn't exist-> added approx time for a full movie!
          movie.start = formattedStartTime;
          movie.end = formattedEndTime;
          movie.title = `${movie.Movie.MovieName} (${
            movie.Auditorium.AuditoriumName
          })`;
          movie.allDay = false;
          return movie;
        });
        console.log("SORTED", groupedMoviesList);

        this.setState({
          cal_events: sortedMoviesList
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const { cal_events } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Movies Calendar</h1>
        </header>
        <div style={{ height: 700 }}>
          <BigCalendar
            localizer={localizer}
            events={cal_events}
            views={{
              day: true,
              week: true,
              month: true
            }}
            defaultView="day"
          />
        </div>
      </div>
    );
  }
}

export default App;
