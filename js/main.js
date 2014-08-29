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

(function () {

    "use strict";

    var data = [];
    var graphContainer;
    var loadLayer;
    var original_config;
    var current_config;

    var process_input = function process_input(input) {
        var info;

        info = JSON.parse(input);

        if (typeof info == 'string') {
            // Loading msg
            switch (info) {
            case 'START':
                // init loading mode
                loadLayer.classList.add('on');
                break;
            case 'END':
                // exit loading mode
                loadLayer.classList.remove('on');
                break;
            case 'RESET':
                data = [];
                break;
            }
            return;
        }

        if ('config' in info) {
            process_config(info.config);
        }

        if ('datasets' in info) {
            process_new_datasets(info.datasets);
        }

        if ('data' in info) {
            process_new_data(info.data);
        }
    };

    var process_config = function process_config(new_config) {
        original_config = new_config;
        current_config = Flotr._.clone(new_config);
        data = [];
    };

    var process_new_datasets = function process_new_datasets(new_datasets) {
        for (var key in new_datasets) {
            data[key] = new_datasets[key];
            data[key].data = [];
        }
    };

    var process_new_data = function process_new_data(new_data) {
        var ds;

        for (var key in new_data) {
            if (!(key in data)) {
                data[key] = {data: new_data[key]};
            } else {
                data[key].data = data[key].data.concat(new_data[key]);
            }
        }

        draw_graph();
    };

    var draw_graph = function draw_graph() {
        Flotr.draw(graphContainer, data, current_config);
    };

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
            draw_graph();
        }
    });

    window.addEventListener('load', function () {
        // Resize the linearGraphContainer
        document.getElementById('linearGraphContainer').style.height = (document.body.getBoundingClientRect().height - 16) + "px";
        document.getElementById('linearGraphContainer').style.width = (document.body.getBoundingClientRect().width - 10) + "px";
        loadLayer = document.getElementById('loadLayer');
        graphContainer = document.getElementById('linearGraphContainer');

        draw_graph();
        Flotr.EventAdapter.observe(graphContainer, 'flotr:select', function (area) {
            // Draw graph with new area
            current_config = Flotr._.extend(current_config, {
                xaxis: {min: area.x1, max: area.x2},
                yaxis: {min: area.y1, max: area.y2}
            });
            draw_graph();
        });

        Flotr.EventAdapter.observe(graphContainer, 'flotr:click', function () {
            // When graph is clicked, draw the graph with default area.
            current_config = Flotr._.clone(original_config);
            draw_graph();
        });
    }, true);

    // Input handler
    MashupPlatform.wiring.registerCallback('input', process_input);

})();
