import { h, ComponentProps } from "preact";
import { useState, useCallback } from "preact/hooks";

// Select Single
import "ojs/ojlabel";
import "ojs/ojselectsingle";
import { ojSelectSingle } from "ojs/ojselectsingle";
// Chart
import "ojs/ojchart";
import { ojChart } from "ojs/ojchart";
// List View - JSON File
import * as storeData from "text!../store_data.json";
import "ojs/ojlistview";
import { ojListView } from "ojs/ojlistview";
import "ojs/ojlistitemlayout";

import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");


// Lista
type ChartType = {
  id: number;
  value: string;
  label: string;
}

const chartTypeData = [
  {value: "bar", label: "Bar"},
  {value: "pie", label: "Pie"},
  {value: "funnel", label: "Funnel"}
]

const chartTypesDP: MutableArrayDataProvider<ChartType["value"], ChartType>
  = new MutableArrayDataProvider(chartTypeData, {keyAttributes: "value"});


// Gráfico
type ChartItem = {
  id: number;
  series: string;
  group: string;
  value: number;
}

const chartData = [
  { "id": 0, "series": "Baseball", "group": "Group A", "value": 42 },
  { "id": 1, "series": "Baseball", "group": "Group B", "value": 34 },
  { "id": 2, "series": "Bycicling", "group": "Group A", "value": 55 },
  { "id": 3, "series": "Bycicling", "group": "Group B", "value": 30 },
  { "id": 4, "series": "Skiing", "group": "Group A", "value": 36 },
  { "id": 5, "series": "Skiing", "group": "Group B", "value": 50 },
  { "id": 6, "series": "Soccer", "group": "Group A", "value": 22 },
  { "id": 7, "series": "Soccer", "group": "Group B", "value": 46 },
]

const chartDataProvider: MutableArrayDataProvider<ChartItem["id"], ChartItem>
  = new MutableArrayDataProvider(chartData, { keyAttributes: "id"});

type ChartProps = ComponentProps<"oj-chart">;

// List View - JSON File
type Activity = {
  id: number;
  name: string;
}

const activityDataProvider = new MutableArrayDataProvider<Activity["id"], Activity>(
  JSON.parse(storeData),
  {
    keyAttributes: "id"
  }
);

type ListViewProps = ComponentProps<"oj-list-view">;
const gridlinesItemVisible: ListViewProps["gridlines"] = { item: "visible"};

const ItemDetailContainer = () => {
  const [val, setVal] = useState("pie" as ChartProps["type"]);

  const valChangeHandler = useCallback(
    (event: ojSelectSingle.valueChanged<ChartType["value"], ChartType>) => {
      setVal(event.detail.value as ChartProps["type"]);
    },
    [val, setVal]
  )

  // Gráfico
  const chartItem = (
    item: ojChart.ItemTemplateContext<ChartItem["id"], ChartItem>
  ) => {
    return (
      <oj-chart-item
        value={item.data.value}
        groupId={[item.data.group]}
        seriesId={item.data.series}>
      </oj-chart-item>
    );
  };


  return (
    <div id="itemDetailsContainer" class="oj-flex-item oj-bg-neutral-30 oj-sm-padding-4x-start oj-md-6 oj-sm-12">
      <h3>Item Details</h3>
      <oj-label for="basicSelect">Select chart:</oj-label>
      <oj-select-single
        id="basicSelect"
        value={val}
        onvalueChanged={valChangeHandler}
        class="selectSingleStyle"
        data={chartTypesDP}
      >
      </oj-select-single>
      <oj-chart 
        id="barChart"
        type={val}
        data={chartDataProvider}
        animationOnDisplay="auto"
        animationOnDataChange="auto"
        hoverBehavior="dim"
        class="chartStyle"
        >
        <template slot="itemTemplate" render={chartItem}></template>
      </oj-chart>
    </div>
  );
};

export default ItemDetailContainer;