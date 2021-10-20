import "./App.css";
import React, { Component, useState, useEffect } from "react";
import Card from "./Components/Card";
import Map from "./Components/Map";
import Graph from './Components/Graph'

function App() {
  const [statsdata, setStatsData] = useState([])
  const [statsname, setStatsName] = useState(['cases', 'deaths', 'recovered'])
  
  const [graphdata, setGraphData] = useState([])
  const [graphname, setGraphName] = useState(['cases', 'deaths', 'recovered'])
  
  const getGlobalData = () => {
    fetch("https://disease.sh/v3/covid-19/all", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
    )
      .then(res => res.json())
      .then(function (data) {
        setStatsData(data)
      })
  }

  const getHistoricalData = (name) => {
    dict = {}
    fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=30', {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
    )
      .then(res => res.json())
      .then(data => {
        Object.keys(data[name]).map((key, i) => 
        {
          dict[key] = data["cases"][key]
        })
      })
      .catch(err => {
        console.log(err)
      })
    return dict
  }

  useEffect(() => {
    getGlobalData()
    getHistoricalData()
  }, [])

  return (
    <div>
      <section className="map">
        <Map />
      </section>
      <section className="stats grid">
        {
          statsname.map((key) => {
            return (
              <Card
                name={key}
                data={statsdata[key]}
              />
            )
          })
        }
      </section>
      <section className="graph grid">
        {
          graphname.map((key) => {
            return (
              <Graph
                name={key}
                chartType={}
                data={graphData[key]}
              />
            )
          })
        }
      </section>
    </div>
  );
}

export default App;
