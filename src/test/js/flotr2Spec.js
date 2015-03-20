/*
 * Copyright (c) 2014-2015 CoNWeT Lab., Universidad Politécnica de Madrid
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*global $, test_methods*/

(function () {

    "use strict";

    jasmine.getFixtures().fixturesPath = 'src/test/fixtures/';

    var dependencyList = [
        'script',
        'div#jasmine-fixtures',
        'div.jasmine_html-reporter'
    ];

    var clearDocument = function clearDocument() {
        $('body > *:not(' + dependencyList.join(', ') + ')').remove();
    };

    var getWiringCallback = function getWiringCallback(endpoint) {
        var calls = MashupPlatform.wiring.registerCallback.calls;
        var count = calls.count();
        for (var i = count - 1; i >= 0; i--) {
            var args = calls.argsFor(i);
            if (args[0] === endpoint) {
                return args[1];
            }
        }
        return null;
    };

    describe("Flotr2 widget", function () {

        var widget = null;

        beforeEach(function () {
            loadFixtures('index.html');
            MashupPlatform.widget.context.registerCallback.calls.reset();
            MashupPlatform.wiring.registerCallback.calls.reset();

            widget = new Widget();
            widget.init();

            spyOn(Flotr, 'draw').and.callThrough();
        });

        afterEach(function () {
            clearDocument();
        });

        it("registers a callback for the input endpoint", function () {
            expect(MashupPlatform.wiring.registerCallback).toHaveBeenCalledWith('input', jasmine.any(Function));
        });

        it("registers a widget context callback", function () {
            expect(MashupPlatform.widget.context.registerCallback).toHaveBeenCalledWith(jasmine.any(Function));
        });

        it("redraw on vertical resizes", function () {
            var pref_callback = MashupPlatform.widget.context.registerCallback.calls.argsFor(0)[0];
            pref_callback({"heightInPixels": 100});
            expect(Flotr.draw).toHaveBeenCalled();
        });

        it("redraw on horizontal resizes", function () {
            var pref_callback = MashupPlatform.widget.context.registerCallback.calls.argsFor(0)[0];
            pref_callback({"widthInPixels": 100});
            expect(Flotr.draw).toHaveBeenCalled();
        });

        it("does nothing on eventual context changes", function() {
            var pref_callback = MashupPlatform.widget.context.registerCallback.calls.argsFor(0)[0];
            pref_callback({"name": "new name"});
            expect(Flotr.draw).not.toHaveBeenCalled();
        });

        it("handles correctly events comming from the input endpoint (basic data)", function() {
            var callback = getWiringCallback('input');
            callback('{"config":{"selection":{"mode":"x","fps":30},"yaxis":{"min":0,"autoscaleMargin":1}},"data":{"0":[[0,6],[1,10],[2,3],[3,9]],"1":[[0.5,8],[1.5,10],[2.5,2],[3.5,10]]}}');
            expect(Flotr.draw).toHaveBeenCalled();
        });

        it("handles correctly events comming from the input endpoint (using datasets)", function() {
            var callback = getWiringCallback('input');
            callback('{"config":{"bars":{"show":true,"horizontal":false,"shadowSize":0,"barWidth":0.5},"mouse":{"track":true,"relative":true},"yaxis":{"min":0,"autoscaleMargin":1}},"datasets":{"0":{"label":"Dataset 1"},"1":{"label":"Dataset 2"}},"data":{"0":[[0,6],[1,10],[2,3],[3,9]],"1":[[0.5,8],[1.5,10],[2.5,2],[3.5,10]]}}');
            expect(Flotr.draw).toHaveBeenCalled();
        });

        it("", function() {
            var callback = getWiringCallback('input');
            callback('{"config":{"bars":{"show":true,"horizontal":false,"shadowSize":0,"barWidth":0.5},"mouse":{"track":true,"relative":true},"yaxis":{"min":0,"autoscaleMargin":1}}}');
            callback('{"datasets":{"0":{"label":"Dataset 1"},"1":{"label":"Dataset 2"}}}');
            callback('{"data":{"0":[[0,6],[1,10],[2,3],[3,9]],"1":[[0.5,8],[1.5,10],[2.5,2],[3.5,10]]}}');
            expect(Flotr.draw).toHaveBeenCalled();
        });

        it("checks init loading mode", function() {
            var callback = getWiringCallback('input');
            callback('"START"');
            expect(widget.loadLayer.classList.contains('on')).toBe(true);
        });

        it("checks exit loading mode", function() {
            var callback = getWiringCallback('input');
            callback('"END"');
            expect(widget.loadLayer.classList.contains('on')).toBe(false);
        });

        it("checks that reset the data", function() {
            widget.data = [1,2];
            var callback = getWiringCallback('input');
            callback('"RESET"');
            expect(widget.data.length).toEqual(0);
        });

    });

})();
