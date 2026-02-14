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

var yourVlSpec2 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  description: "Radial chart showing top consoles in North America by sales",
  data: {
    url: "./dataset/videogames_wide.csv"
  },
  transform: [
    {
      aggregate: [{ op: "sum", field: "NA_Sales", as: "Total_NA_Sales" }],
      groupby: ["Platform"]
    },
    {
      window: [{ op: "rank", as: "rank" }],
      sort: [{ field: "Total_NA_Sales", order: "descending" }]
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
    theta: { field: "Total_NA_Sales", type: "quantitative", stack: true },
    radius: { 
      field: "Total_NA_Sales", 
      type: "quantitative",
      scale: { type: "sqrt", zero: true, rangeMin: 20 }
    },
    color: { 
      field: "Platform", 
      type: "nominal",
      scale: { scheme: "tableau20" },
      legend: { title: "Top Consoles in North America" }
    },
    tooltip: [
      { field: "Platform", type: "nominal", title: "Console" },
      { field: "Total_NA_Sales", type: "quantitative", title: "Total Sales (Millions)", format: ".2f" }
    ]
  },
  width: 400,
  height: 400
};



var yourVlSpec3 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  title: "Platform Lifespan in Japan (Active Years Range)",
  data: { url: "./dataset/videogames_wide.csv" },
  transform: [
    { filter: "datum.Year > 1980 && datum.JP_Sales > 0" },
    {
      aggregate: [
        { op: "min", field: "Year", as: "Start_Year" },
        { op: "max", field: "Year", as: "End_Year" },
        { op: "count", as: "Game_Count" }
      ],
      groupby: ["Platform"]
    },
    { filter: "datum.Game_Count > 10" }
  ],
  mark: { type: "rule", size: 10 },
  encoding: {
    y: { field: "Platform", type: "nominal", sort: "x" },
    x: { 
      field: "Start_Year", 
      type: "temporal", 
      axis: { title: "Active Years in Japan" }
    },
    x2: { field: "End_Year" },
    color: { field: "Platform", type: "nominal", legend: { title: "Platform" } },
    tooltip: [
      { field: "Platform", type: "nominal" },
      { field: "Start_Year", type: "temporal", timeUnit: "year" },
      { field: "End_Year", type: "temporal", timeUnit: "year" },
      { field: "Game_Count", type: "quantitative", title: "Games Released" }
    ]
  },
  width: "container",
  height: 400
};

var yourVlSpec4 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  title: "Platform Lifespan in Europe (Active Years Range)",
  data: { url: "./dataset/videogames_wide.csv" },
  transform: [
    { filter: "datum.Year > 1980 && datum.EU_Sales > 0" },
    {
      aggregate: [
        { op: "min", field: "Year", as: "Start_Year" },
        { op: "max", field: "Year", as: "End_Year" },
        { op: "count", as: "Game_Count" }
      ],
      groupby: ["Platform"]
    },
    { filter: "datum.Game_Count > 10" }
  ],
  mark: { type: "rule", size: 10 },
  encoding: {
    y: { field: "Platform", type: "nominal", sort: "x" },
    x: { 
      field: "Start_Year", 
      type: "temporal", 
      axis: { title: "Active Years in Europe" }
    },
    x2: { field: "End_Year" },
    color: { field: "Platform", type: "nominal", legend: { title: "Platform" } },
    tooltip: [
      { field: "Platform", type: "nominal" },
      { field: "Start_Year", type: "temporal", timeUnit: "year" },
      { field: "End_Year", type: "temporal", timeUnit: "year" },
      { field: "Game_Count", type: "quantitative", title: "Games Released" }
    ]
  },
  width: "container",
  height: 400
};

vegaEmbed("#view", yourVlSpec);
vegaEmbed("#view5", yourVlSpec2);
vegaEmbed("#viewLifespan", yourVlSpec3);
vegaEmbed("#viewSalesVar", yourVlSpec4);
