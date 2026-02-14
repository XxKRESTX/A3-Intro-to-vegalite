// Load data from datasets/videogames_wide.csv using d3.csv and then make visualizations
async function fetchData() {
  const data = await d3.csv("./dataset/videogames_wide.csv");
  return data;
}

async function fetchDataLong() {
  const data = await d3.csv("./dataset/videogames_long.csv");
  return data;
}

async function main() {
  const dataWide = await fetchData();
  const dataLong = await fetchDataLong();

  const vlSpec = vl
    .markBar()
    .data(dataWide)
    .encode(
      vl.y().fieldN("Platform").sort("-x"),
      vl.x().fieldQ("Global_Sales").aggregate("sum"),
      vl.color().fieldN("Genre")
    )
    .width("container")
    .height(400)
    .toSpec();
    

  const vlSpec2 = vl
    .markLine()
    .data(dataWide)
    .encode(
      vl.x().fieldT("Year"),
      vl.y().fieldQ("Global_Sales").aggregate("sum"),
      vl.color().fieldN("Genre"),
      vl.detail().fieldN("Platform")
    )
    .width("container")
    .height(400)
    .toSpec();

  const vlSpec3 = vl
    .markBar()
    .data(dataWide)
    .encode(
      vl.x().fieldN("Platform"),
      vl.y().fieldQ("Global_Sales").aggregate("sum"),
      vl.color().fieldN("Genre")
    )
    .width("container")
    .height(400)
    .toSpec();

  // Top Genres in North America
  const vlSpecGenresNA = vl
    .markBar()
    .data(dataWide)
    .encode(
      vl.y().fieldN("Genre").sort("-x"),
      vl.x().fieldQ("NA_Sales").aggregate("sum"),
      vl.color().fieldN("Genre")
    )
    .width("container")
    .height(300)
    .toSpec();

  // Top Genres in Europe
  const vlSpecGenresEU = vl
    .markBar()
    .data(dataWide)
    .encode(
      vl.y().fieldN("Genre").sort("-x"),
      vl.x().fieldQ("EU_Sales").aggregate("sum"),
      vl.color().fieldN("Genre")
    )
    .width("container")
    .height(300)
    .toSpec();

    render("#view4", vlSpec);
    render("#view2", vlSpec2);
    render("#view3", vlSpec3);
    render("#view6", vlSpecGenresNA);
    render("#view7", vlSpecGenresEU);
  }

main();

async function render(viewID, spec) {
  const result = await vegaEmbed(viewID, spec);
  result.view.run();
}
