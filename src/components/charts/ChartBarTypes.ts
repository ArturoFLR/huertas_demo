type BarChartCountry = {
	"country": string,
	"hot dog": number,
	"hot dogColor": string,
	"burger": number,
	"burgerColor": string,
	"sandwich": number,
	"sandwichColor": string,
	"kebab": number,
	"kebabColor": string,
	"fries": number,
	"friesColor": string,
	"donut": number,
	"donutColor": string
};

export type BarChartDataType = BarChartCountry[];








type LineChartCountryDataType = {
	"x": string,
	"y": string 
}

type LineChartCountryType = {
	"id": string,
	"color": string,
	"data": LineChartCountryDataType[]
}

export type LineChartDataType = LineChartCountryType[];






type MapChartCountryType = {
	"id": string,
	"value": string
}

export type MapChartDataType = MapChartCountryType[];