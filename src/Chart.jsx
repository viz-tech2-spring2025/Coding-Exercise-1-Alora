import * as d3 from "d3";

export function Chart({ data }) {
  const marginLeft = 200;
  const width = 800;
  const height = 800;
  const marginRight = 40;
  const marginTop = 20;
  const marginBottom = 20;

  const heightBound = height - marginTop - marginBottom;
  const widthBound = width - marginLeft - marginRight;

  const numericData = data
    .filter((d) => d["2022"] != null)
    .map((d) => ({
      country: d["Country Name"],
      value: +d["2022"],
    })).sort((a,b) => b.value - a.value).slice(0,30);

  const max = d3.max(numericData, (d) => d.value);
  const min = d3.min (numericData, (d) => d.value)

  // Scales
  const xScale = d3
    .scaleLinear()
    .domain([0, max])
    .range([0, widthBound]);

  const yScale = d3
    .scaleBand()
    .domain(numericData.map((d) => d.country))
    .range([marginTop, height - marginBottom])
    .padding(0.3);


  const xTicks = xScale.ticks(10).map((tick) => (
    <g key={tick} transform={`translate(${marginLeft + xScale(tick)},${height - marginBottom})`}>
      <line y2="6" stroke="white" />
      <text dy="2em" textAnchor="middle" fontSize="10" fill="white">
        {tick}
      </text>
    </g>
  ));

  const yTicks = yScale.domain().map((tick) => {
    return(
    <g key={tick} transform={`translate(${marginLeft},${yScale(tick) + yScale.bandwidth() / 2})`}>
      <line x2="-6" stroke="white" />
      <text dx="-10" dy="0.3em" textAnchor="end" fontSize="10" fill="white">
        {tick}
      </text>
    </g>)
  });

  return (
    <div>
      <p>Top 30 Countries with Most Urban Population</p>
      <svg style={{border:"0px solid black"}} width={width} height={height}>
        {/* Bars */}
        {numericData.map((d) => (
          <rect
            key={d.country}
            x={marginLeft}
            y={yScale(d.country)}
            width={xScale(d.value)}
            height={yScale.bandwidth()}
            opacity={0.7}
            fill="#FEE41F"
            fillOpacity={0.9}
            strokeWidth={1}
          />
        ))}

        {/* Inner Chart area for understanding margins*/}
        <rect
          x={marginLeft}
          y={marginTop}
          width={widthBound}
          height={heightBound}
          stroke="none"
          fill="none"
          strokeWidth={2}
        />


        {/* X-Axis */}
        <line
          x1={marginLeft}
          x2={marginLeft + widthBound}
          y1={height - marginBottom}
          y2={height - marginBottom}
          stroke="white"
        />
        {xTicks}

        {/* Y-Axis */}
        <line
          x1={marginLeft}
          x2={marginLeft}
          y1={marginTop}
          y2={height - marginBottom}
          stroke="white"
        />
        {yTicks}
      </svg>
    </div>
  );
}
