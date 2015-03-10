Flotr2 Graph Widget - Programmer's Manual
=========================================

Description
------------
This widget allows you to create any graph supported by flotr2.

For more information about flotr2 and what kind of graphics you can obtain using this widget, see [the flotr2 examples page](http://www.humblesoftware.com/flotr2/index).


Configurations
--------------

#### **Preferences**
This widget has not preferences.

#### **Wiring**

Input Endpoints:

* **Data in**: Gets the data and settings graph (linear, bar, pie, ...) to draw with the widget.

Output Endpoints:

* This widget has not output endpoint.


Examples
--------

Linear Graph (with selection support):

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

Vertical Bars Graph:

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

Horizontal Bars Graph (with legend and custom colors):

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

