Flotr2 Graph Widget
===================

This widget allows you to create any graph supported by flotr2.

For more information about flotr2 and what kind of graphics you can obtain using this widget, see [the flotr2 examples page](http://www.humblesoftware.com/flotr2/index).

## Configurations

### Preferences

This widget has not preferences.

### Wiring

#### Input Endpoints:

* **Data in**: Gets the data and settings graph (linear, bar, pie, ...) to draw with the widget.

#### Output Endpoints:

* This widget has not output endpoint.

## Examples

* Linear Graph (with selection support):

    :::json
    {
        "config": {
            "selection": {
                "mode": "x",
                "fps": 30
            },
            "yaxis": {
                "min": 0,
                "autoscaleMargin": 1
            }
        },
        "data": {
            "0": [[0, 6], [1, 10], [2, 3], [3, 9]],
            "1": [[0.5, 8], [1.5, 10], [2.5, 2], [3.5, 10]]
        }
    }

* Vertical Bars Graph:

    :::json
    {
        "config": {
            "bars": {
                "show": true,
                "horizontal": false,
                "shadowSize": 0,
                "barWidth": 0.5
            },
            "mouse": {
                "track": true,
                "relative": true
            },
            "yaxis": {
                "min": 0,
                "autoscaleMargin": 1
            }
        },
        "datasets": {
            "0": {"label": "Dataset 1"},
            "1": {"label": "Dataset 2"}
        },
        "data": {
            "0": [[0, 6], [1, 10], [2, 3], [3, 9]],
            "1": [[0.5, 8], [1.5, 10], [2.5, 2], [3.5, 10]]
        }
    }

* Horizontal Bars Graph (with legend and custom colors):

    :::json
    {
        "config": {
            "bars": {
                "show": true,
                "horizontal": true,
                "shadowSize": 0,
                "barWidth": 0.5,
                "fillOpacity": 0.8
            },
            "mouse": {
                "track": true,
                "relative": true
            },
            "xaxis": {
                "min": 0,
                "autoscaleMargin": 1
            },
            "legend": {
                "position": "se",
                "backgroundColor": "#D2E8FF"
            }
        },
        "datasets": {
            "0": {"label": "Dataset 1", "color": "rgb(40, 94, 142)", "bars": {"fillColor": "rgb(50, 118, 177)"}},
            "1": {"label": "Dataset 2", "color": "rgb(76, 174, 76)", "bars": {"fillColor": "rgb(92, 184, 92)"}}
        },
        "data": {
            "0": [[6, 0], [10, 1], [3, 2], [9, 3]],
            "1": [[8, 0.5], [10, 1.5], [2, 2.5], [10, 3.5]]
        }
    }

* Area Graph:

    [
        ["Year",    "Sales",    "Expenses"],
        ["2013",    1000,           400],
        ["2014",    1170,           460],
        ["2015",    660,            1120],
        ["2016",    1030,           540]
    ]

    :::json
    {
        "structure": [
            {"id": "Year", "type": "string"},
            {"id": "Sales", "type": "number"},
            {"id": "Expenses", "type": "number"}
        ],
        "data": [
            {"Year": "2013", "Sales": 1000, "Expenses": 400},
            {"Year": "2014", "Sales": 1170, "Expenses": 460},
            {"Year": "2015", "Sales": 660,  "Expenses": 1120},
            {"Year": "2016", "Sales": 1030, "Expenses": 540}
        ]
    }

* Bubble Graph:

    [
        ["ID",  "Life Expectancy", "Fertility Rate", "Region",        "Population" ],
        ["CAN",        80.66,           1.67,        "North America", 33739900],
        ["DEU",        79.84,           1.36,        "Europe",        81902307],
        ["DNK",        78.6,            1.84,        "Europe",        5523095],
        ["EGY",        72.73,           2.78,        "Middle East",   79716203],
        ["GBR",        80.05,           2,           "Europe",        61801570],
        ["IRN",        72.49,           1.7,         "Middle East",   73137148],
        ["IRQ",        68.09,           4.77,        "Middle East",   31090763],
        ["ISR",        81.55,           2.96,        "Middle East",   7485600],
        ["RUS",        68.6,            1.54,        "Europe",        141850000],
        ["USA",        78.09,           2.05,        "North America", 307007000]
    ]

    :::json
    {
        "structure": [
            {"id": "ID", "type": "string"},
            {"id": "Life Expectancy", "type": "number"},
            {"id": "Fertility Rate", "type": "number"},
            {"id": "Region", "type": "string"},
            {"id": "Population", "type": "number"}
        ],
        "data": [
            {"ID": "CAN", "Life Expectancy": 80.66, "Fertility Rate": 1.67, "Region": "North America", "Population": 33739900},
            {"ID": "DEU", "Life Expectancy": 79.84, "Fertility Rate": 1.36, "Region": "Europe", "Population": 81902307},
            {"ID": "DNK", "Life Expectancy": 78.6,  "Fertility Rate": 1.84, "Region": "Europe", "Population": 5523095},
            {"ID": "EGY", "Life Expectancy": 72.73, "Fertility Rate": 2.78, "Region": "Middle East", "Population": 79716203},
            {"ID": "GBR", "Life Expectancy": 80.05, "Fertility Rate": 2, "Region": "Europe", "Population": 61801570},
            {"ID": "IRN", "Life Expectancy": 72.49, "Fertility Rate": 1.7, "Region": "Middle East", "Population": 73137148},
            {"ID": "IRQ", "Life Expectancy": 68.09, "Fertility Rate": 4.77, "Region": "Middle East", "Population": 31090763},
            {"ID": "ISR", "Life Expectancy": 81.55, "Fertility Rate": 2.96, "Region": "Middle East", "Population": 7485600},
            {"ID": "RUS", "Life Expectancy": 68.6,  "Fertility Rate": 1.54, "Region": "Europe", "Population": 141850000},
            {"ID": "USA", "Life Expectancy": 78.09, "Fertility Rate": 2.05, "Region": "North America", "Population": 307007000}
        ]
    }

    // Lineas
    {
        "data": [
            {"City": "Alicante", "Day": "01/04/15", "Count": "1", ...},
            {"City": "Alicante", "Day": "02/04/15", "Count": "0", ...},
            {"City": "Alicante", "Day": "03/04/15", "Count": "2", ...},
            ...
            {"City": "Cáceres",  "Day": "01/04/15", "Count": "79", ...},
            {"City": "Cáceres",  "Day": "02/04/15", "Count": "57", ...},
            {"City": "Cáceres",  "Day": "03/04/15", "Count": "70", ...},
            ...
        ]
    }

* Combo Graph (with bars and lines):

    [
        ["Month",   "Bolivia",      "Ecuador",    "Madagascar",   "Papua New Guinea", "Rwanda",   "Average"],
        ["2004/05",     165,            938,            522,            998,            450,        614.6],
        ["2005/06",     135,            1120,           599,            1268,           288,        682],
        ["2006/07",     157,            1167,           587,            807,            397,        623],
        ["2007/08",     139,            1110,           615,            968,            215,        609.4],
        ["2008/09",     136,            691,            629,            1026,           366,        569.6]
    ]

    :::json
    {
        "structure": [
            {"id": "Month", "type": "string"},
            {"id": "Bolivia", "type": "number"},
            {"id": "Ecuador", "type": "number"},
            {"id": "Madagascar", "type": "number"},
            {"id": "Papua New Guinea", "type": "number"},
            {"id": "Rwanda", "type": "number"},
            {"id": "Average", "type": "number"}
        ],
        "data": [
            {"Month": "2004/05","Bolivia": 165, "Ecuador": 938, "Madagascar": 522, "Papua New Guinea": 998, "Rwanda": 450, "Average": 614.6},
            {"Month": "2005/06","Bolivia": 135, "Ecuador": 1120, "Madagascar": 599, "Papua New Guinea": 1268, "Rwanda": 288, "Average": 682},
            {"Month": "2006/07","Bolivia": 157, "Ecuador": 1167, "Madagascar": 587, "Papua New Guinea": 807, "Rwanda": 397, "Average": 623},
            {"Month": "2007/08","Bolivia": 139, "Ecuador": 1110, "Madagascar": 615, "Papua New Guinea": 968, "Rwanda": 215, "Average": 609.4},
            {"Month": "2008/09","Bolivia": 136, "Ecuador": 691, "Madagascar": 629, "Papua New Guinea": 1026, "Rwanda": 366, "Average": 569.6}
        ]
    }

* Pie Graph:

    [
        ["Task",    "Hours per Day"],
        ["Work",           11],
        ["Eat",             2],
        ["Commute",         2],
        ["Watch TV",        2],
        ["Sleep",           7]
    ]

    :::json
    {
        "structure": [
            {"id": "Task", "type": "string"},
            {"id": "Hours per Day", "type": "number"}
        ],
        "data": [
            {"Task": "Work", "Hours per Day": 11},
            {"Task": "Eat", "Hours per Day": 2},
            {"Task": "Commute", "Hours per Day": 2},
            {"Task": "Watch TV", "Hours per Day": 2},
            {"Task": "Sleep", "Hours per Day": 7}
        ]
    }

{
    "structure": [
        {"id": "Galaxy", "type": "string"},
        {"id": "Distance", "type": "number"},
        {"id": "Brightness", "type": "number"}
    ],
    "data": [
        {"Galaxy": "Canis Major Dwarf", "Distance": 8000, "Brightness": 23.3},
        {"Galaxy": "Sagittarius Dwarf", "Distance": 24000, "Brightness": 4.5},
        {"Galaxy": "Ursa Major II Dwarf", "Distance": 30000, "Brightness": 14.3},
        {"Galaxy": "Lg. Magellanic Cloud", "Distance": 50000, "Brightness": 0.9},
        {"Galaxy": "Bootes I", "Distance": 60000, "Brightness": 13.1}
    ]
}