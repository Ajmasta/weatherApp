import React from "react";
import Plotly from "plotly.js";
import createPlotlyComponent from "react-plotly.js/factory";
import { useSelector, useDispatch } from "react-redux";

const PlotDrawer = ({ dataView, plotName }) => {
  const Plot = createPlotlyComponent(Plotly);
  const dispatch = useDispatch();
  const infos = useSelector((state) => state.infos);
  const mode = useSelector((state) => state.plot.mode);
  const type = useSelector((state) => state.plot.type);
  const marker = useSelector((state) => state.plot.marker);
  const marker1 = useSelector((state) => state.plot.marker1);
  const marker2 = useSelector((state) => state.plot.marker2);
  const barmode = useSelector((state) => state.plot.barmode);
  const markerNames = useSelector((state) => state.markerNames);
  let [dates, temperatureAvg, temperatureMin, temperatureMax] = "";
  let [time, temp, dewpoint, precipitations, snow, rhum] = "";
  let [x, y, y1, y2] = "";
  let title = "";
  let dataset = [];
  if (infos) {
    if (dataView === "daily" && plotName === "Temperature") {
      dates = infos.map((element) => element.date);
      temperatureAvg = infos.map((element) => element.tavg);
      temperatureMin = infos.map((element) => element.tmin);
      temperatureMax = infos.map((element) => element.tmax);
      x = dates;
      y = temperatureAvg;
      y1 = temperatureMin;

      y2 = temperatureMax;

      title = "Daily Temperature";
      dataset = [
        { x, y: y2, type, mode, marker: marker2, name: markerNames.three },
        { x, y, type, mode, marker: marker, name: markerNames.one },
        { x, y: y1, type, mode, marker: marker1, name: markerNames.two },
      ];
    } else if (dataView === "hourly" && plotName === "Temperature") {
      time = infos.map((element) => element.time);
      temp = infos.map((element) => element.temp);
      dewpoint = infos.map((element) => element.dwpt);
      x = time;
      y = temp;
      y1 = dewpoint;
      title = "Hourly Temperature";
      dataset = [
        { x, y, type, mode, marker: marker, name: markerNames.one },
        { x, y: y1, type, mode, marker: marker1, name: markerNames.two },
      ];
    } else if (dataView === "daily" && plotName === "Precipitations") {
      dates = infos.map((element) => element.date);
      precipitations = infos.map((element) => element.prcp);
      snow = infos.map((element) => element.snow);
      x = dates;
      y = precipitations;
      y1 = snow;
      title = "Daily Precipitations";
      dataset = [
        { x, y, type, mode, marker: marker, name: markerNames.one },
        { x, y: y1, type, mode, marker: marker1, name: markerNames.two },
      ];
    } else if (dataView === "hourly" && plotName === "Relative Humidity") {
      time = infos.map((element) => element.time);
      rhum = infos.map((element) => element.rhum);
      x = time;
      y = rhum;
      title = "Hourly Relative Humidity (%)";
      dataset = [{ x, y, type, mode, marker: marker, name: markerNames.one }];
    }
  }

  return (
    <Plot
      className="Plot"
      data={dataset}
      layout={{
        barmode,
        title,
        legend: { x: 1, xanchor: "right", y: 1, bgcolor: "rgba(0,0,0,0)" },
      }}
      config={{ responsive: true }}
    />
  );
};

export default PlotDrawer;
