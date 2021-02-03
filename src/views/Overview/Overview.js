import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import Legend from "./components/Legend";
import { Spin } from "antd";

import Blocks from "./components/Blocks";
import { ChartContainer } from "./styles";
import "./overview.css";
import { requests, getUrl } from "../../globals/requests";
import { helpers, userUtil } from "../../utils";

function Overview() {
  const [chartData, setChartData] = useState([]);
  const [loadingChartData, setLoadingChartData] = useState(false);

  useEffect(() => {
    async function getChartData() {
      const organisation = userUtil.getOrganisation();

      try {
        const url = `${getUrl("organisations")}/${
          organisation._id
        }/summaryChart`;
        setLoadingChartData(true);
        const response = await requests.getWithAuth(url);
        console.log(response);
        setLoadingChartData(false);
        setChartData(response.data);
      } catch (e) {
        console.log(e);
        setLoadingChartData(false);
        helpers.displayMessage(e.message);
      }
    }

    getChartData();
  }, []);

  function renderChart() {
    if (loadingChartData) {
      return (
        <div className="spin-contain">
          <Spin delay={100} size="large" tip="Loading Chart... " />
        </div>
      );
    }
    return (
      <>
        <div className="ovv-chart-detail">
          <p>Chart showing trips and users onboarded for a 6 months period</p>
        </div>
        <Legend />
        <LineChart
          width={1150}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid
            // horizontal={false}
            vertical={false}
            strokeDasharray="3 3"
          />
          <XAxis axisLine={false} dataKey="name" />
          <YAxis axisLine={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="trips"
            isAnimationActive={true}
            animationBegin={500}
            // stroke="#8884d8"
            stroke="rgb(215, 154, 233)"
            strokeWidth={3}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            strokeWidth={3}
            animationBegin={5000}
            stroke="rgb(106, 233, 148)"
            dataKey="users"
            // stroke="#82ca9d"
          />
        </LineChart>
      </>
    );
  }
  return (
    <div>
      <Blocks />
      <ChartContainer>{renderChart()}</ChartContainer>
    </div>
  );
}

export default Overview;
