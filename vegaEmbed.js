var yourVlSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  description: "Radial chart showing top consoles in Japan by sales",
  data: {
    url: "./dataset/videogames_wide.csv"
  },
  transform: [
    {
      aggregate: [{ op: "sum", field: "JP_Sales", as: "Total_JP_Sales" }],
      groupby: ["Platform"]
    },
    {
      window: [{ op: "rank", as: "rank" }],
      sort: [{ field: "Total_JP_Sales", order: "descending" }]
    },
    { filter: "datum.rank <= 10" }
  ],
  layer: [
    {
      mark: { type: "arc", innerRadius: 50, stroke: "#fff" }
    },
    {
      mark: { type: "text", radiusOffset: 15, fontSize: 11, fontWeight: "bold" },
      encoding: {
        text: { field: "Platform", type: "nominal" }
      }
    }
  ],
  encoding: {
    theta: { field: "Total_JP_Sales", type: "quantitative", stack: true },
    radius: { 
      field: "Total_JP_Sales", 
      type: "quantitative",
      scale: { type: "sqrt", zero: true, rangeMin: 20 }
    },
    color: { 
      field: "Platform", 
      type: "nominal",
      scale: { scheme: "tableau20" },
      legend: { title: "Top Consoles in Japan" }
    },
    tooltip: [
      { field: "Platform", type: "nominal", title: "Console" },
      { field: "Total_JP_Sales", type: "quantitative", title: "Total Sales (Millions)", format: ".2f" }
    ]
  },
  width: 400,
  height: 400
};
vegaEmbed("#view", yourVlSpec);
