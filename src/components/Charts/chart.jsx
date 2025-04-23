import React from "react";
import { Line, Pie } from "@ant-design/charts";
const Chart = ({ sortedTransactions }) => {
  const data = sortedTransactions.map((item) => {
    return { date: item.date, amount: item.amount };
  });
  const config = {
    data: data,
    xField: "date",
    yField: "amount",
    autoFit: true,
    width: 500,
    height: 500,
    smooth: true,

    // Line style
    lineStyle: {
      stroke: "#1890ff", // Line color
      lineWidth: 3,
    },
  
    // Point style
    point: {
      size: 5,
      shape: "circle",
      style: {
        fill: "#ffffff",
        stroke: "#1890ff",
        lineWidth: 2,
      },
    },
  
    // Tooltip customization
    tooltip: {
      showMarkers: true,
      formatter: (datum) => ({
        name: "Amount",
        value: `₹${datum.amount}`,
      }),
    },
  
    // Axis style
    xAxis: {
      label: {
        style: {
          fontSize: 12,
          fill: "#666",
        },
      },
      title: {
        text: "Date",
        style: {
          fontSize: 14,
          fill: "#333",
        },
      },
    },
    yAxis: {
      label: {
        style: {
          fontSize: 12,
          fill: "#666",
        },
      },
      title: {
        text: "Amount",
        style: {
          fontSize: 14,
          fill: "#333",
        },
      },
    },
  
    // Add area under the line (optional)
    area: {
      style: {
        fill: "l(270) 0:#bae7ff 1:#e6f7ff",
        fillOpacity: 0.4,
      },
    },
  
    animation: {
      appear: {
        animation: "path-in",
        duration: 1000,
      },
    },
  };
  const modifiedData=new Map();
  sortedTransactions.forEach((item)=>{
       if(item.type==="expense"){
           modifiedData.set(item.tag, (modifiedData.get(item.tag) || 0)+item.amount);
       }
  })
  const spendingData= Array.from(modifiedData, ([tag, amount]) => ({ tag, amount }));
  

  const spendingConfig={
     data: spendingData,
     angleField: "amount",
     colorField: "tag",
     autoFit: true,
     width: 500,
  
     
  }
  let chart;
  let pieChart;
  return (
    <div className="charts-wrapper">
      <div className="line-graph">
        <h2>Analytics</h2>
        <Line {...config} onReady={(charInstance) => (chart = charInstance)} />
      </div>
      <div className="pieChart">
        <h2>Spendings</h2>
        <Pie
          {...spendingConfig}
          onReady={(charInstance) => (pieChart = charInstance)}
        />
        
      </div>
    </div>
  );
};

export default Chart;
