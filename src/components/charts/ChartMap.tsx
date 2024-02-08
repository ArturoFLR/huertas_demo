import { ResponsiveChoropleth } from "@nivo/geo";
import { mapChartMapCoordinates } from "../../data/mapChartMapCoordinates";
import { MapChartDataType } from "./ChartBarTypes";


type ChartMapType = {
	mapChartData: MapChartDataType
}

function ChartMap({ mapChartData }: ChartMapType) {


	return (
		<>
			<ResponsiveChoropleth
				data={mapChartData}
				features={mapChartMapCoordinates.features}
				margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
				colors="BuGn"
				domain={[0, 1000000]}
				unknownColor="#666666"
				label="properties.name"
				valueFormat=".2s"
				projectionScale={153}
				projectionTranslation={[0.5, 0.5]}
				projectionRotation={[0, 0, 0]}
				enableGraticule={true}
				graticuleLineColor="#dddddd"
				borderWidth={1}
				borderColor="#152538"
				// @ts-expect-error  "the next line has a typescript error but is caused by the nivo lib (it has no types for 'defs'"
				defs={[
					{
						id: "dots",
						type: "patternDots",
						background: "inherit",
						color: "#38bcb2",
						size: 4,
						padding: 1,
						stagger: true
					},
					{
						id: "lines",
						type: "patternLines",
						background: "inherit",
						color: "#eed312",
						rotation: -45,
						lineWidth: 6,
						spacing: 10
					},
					{
						id: "gradient",
						type: "linearGradient",
						colors: [
							{
								offset: 0,
								color: "#000"
							},
							{
								offset: 100,
								color: "inherit"
							}
						]
					}
				]}
				fill={[
					{
						match: {
							id: "CAN"
						},
						id: "dots"
					},
					{
						match: {
							id: "CHN"
						},
						id: "lines"
					},
					{
						match: {
							id: "ATA"
						},
						id: "gradient"
					}
				]}
				legends={[
					{
						anchor: "bottom-left",
						direction: "column",
						justify: true,
						translateX: 20,
						translateY: -100,
						itemsSpacing: 0,
						itemWidth: 94,
						itemHeight: 18,
						itemDirection: "left-to-right",
						itemTextColor: "#444444",
						itemOpacity: 0.85,
						symbolSize: 18,
						effects: [
							{
								on: "hover",
								style: {
									itemTextColor: "#000000",
									itemOpacity: 1
								}
							}
						]
					}
				]}
			/>
		</>
	);
}

export default ChartMap;
