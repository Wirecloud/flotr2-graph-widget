/*
 *     Copyright (c) 2014 CoNWeT Lab., Universidad Politécnica de Madrid
 *
 *     This file is part of the flotr2-graph widget.
 *
 *     flotr2-graph is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU Affero General Public License as published
 *     by the Free Software Foundation, either version 3 of the License, or (at
 *     your option) any later version.
 *
 *     flotr2-graph is distributed in the hope that it will be useful, but
 *     WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero
 *     General Public License for more details.
 *
 *     You should have received a copy of the GNU Affero General Public License
 *     along with flotr2-graph. If not, see <http://www.gnu.org/licenses/>.
 *
 *     Linking this library statically or dynamically with other modules is
 *     making a combined work based on this library.  Thus, the terms and
 *     conditions of the GNU Affero General Public License cover the whole
 *     combination.
 *
 *     As a special exception, the copyright holders of this library give you
 *     permission to link this library with independent modules to produce an
 *     executable, regardless of the license terms of these independent
 *     modules, and to copy and distribute the resulting executable under
 *     terms of your choice, provided that you also meet, for each linked
 *     independent module, the terms and conditions of the license of that
 *     module.  An independent module is a module which is not derived from
 *     or based on this library.  If you modify this library, you may extend
 *     this exception to your version of the library, but you are not
 *     obligated to do so.  If you do not wish to do so, delete this
 *     exception statement from your version.
 *
 */

/*global Flotr, MashupPlatform*/


window.Widget = (function () {

    "use strict";

    /**
     * Create a new instance of class Widget.
     * @class
     */
    var Widget = function Widget() {
        this.data = [];
        this.graphContainer = null;
        this.loadLayer = null;
        this.original_config = null;
        this.current_config = null;

        MashupPlatform.widget.context.registerCallback(function (new_values) {
            var hasChanged;

            if ('heightInPixels' in new_values) {
                document.getElementById('linearGraphContainer').style.height = (document.body.getBoundingClientRect().height - 16) + "px";
                hasChanged = true;
            }

            if ('widthInPixels' in new_values) {
                document.getElementById('linearGraphContainer').style.width = (document.body.getBoundingClientRect().width - 10) + "px";
                hasChanged = true;
            }

            if (hasChanged) {
                this.draw_graph();
            }
        }.bind(this));

        MashupPlatform.wiring.registerCallback('input', this.handler_onreceiveGraphInfo.bind(this));
    };

    /* ==================================================================================
     *  PUBLIC METHODS
     * ================================================================================== */

    Widget.prototype.init = function init() {
        // Resize the linearGraphContainer
        document.getElementById('linearGraphContainer').style.height = (document.body.getBoundingClientRect().height - 16) + "px";
        document.getElementById('linearGraphContainer').style.width = (document.body.getBoundingClientRect().width - 10) + "px";
        this.loadLayer = document.getElementById('loadLayer');
        this.graphContainer = document.getElementById('linearGraphContainer');

        this.draw_graph();
        Flotr.EventAdapter.observe(this.graphContainer, 'flotr:select', function (area) {
            // Draw graph with new area
            this.current_config = Flotr._.extend(this.current_config, {
                xaxis: {min: area.x1, max: area.x2},
                yaxis: {min: area.y1, max: area.y2}
            });
            this.draw_graph();
        }.bind(this));

        Flotr.EventAdapter.observe(this.graphContainer, 'flotr:click', function () {
            // When graph is clicked, draw the graph with default area.
            this.current_config = Flotr._.clone(this.original_config);
            this.draw_graph();
        }.bind(this));
    };

    Widget.prototype.handler_onreceiveGraphInfo = function handler_onreceiveGraphInfo(graphInfoString) {
        var graphInfo = JSON.parse(graphInfoString);

        if (typeof graphInfo == 'string') {
            // Loading msg
            switch (graphInfo) {
            case 'START':
                // init loading mode
                this.loadLayer.classList.add('on');
                break;
            case 'END':
                // exit loading mode
                this.loadLayer.classList.remove('on');
                break;
            case 'RESET':
                this.data = [];
                break;
            }
            return;
        }

        if ('config' in graphInfo) {
            if (graphInfo.config.lines || graphInfo.config.radar || graphInfo.config.bars || graphInfo.config.bubbles || graphInfo.config.pie) {
                this.handler_config(graphInfo.config);

                if ('datasets' in graphInfo) {
                    this.handler_new_datasets(graphInfo.datasets);
                }

                if ('data' in graphInfo) {
                    this.handler_new_data(graphInfo.data);
                }

            } else {
                this.data = [];

                /*var div = document.createElement('div');
                this.graphContainer.appendChild(div);
                var p = document.createElement('p');
                div.appendChild(p);
                var message = document.createTextNode("Prueba");
                p.appendChild(message);*/
            }
        }
    };

    Widget.prototype.handler_config = function handler_config(new_config) {
        this.original_config = new_config;
        this.current_config = Flotr._.clone(new_config);
        this.data = [];
    };

    Widget.prototype.handler_new_datasets = function handler_new_datasets(new_datasets) {
        for (var key in new_datasets) {
            this.data[key] = new_datasets[key];
            this.data[key].data = [];
        }
    };

    Widget.prototype.handler_new_data = function handler_new_data(new_data) {
        for (var key in new_data) {
            if (!(key in this.data)) {
                this.data[key] = {data: new_data[key]};
            } else {
                this.data[key].data = this.data[key].data.concat(new_data[key]);
            }
        }

        this.draw_graph();
    };

    Widget.prototype.draw_graph = function draw_graph() {
        Flotr.draw(this.graphContainer, this.data, this.current_config);
    };

    return Widget;

})();
