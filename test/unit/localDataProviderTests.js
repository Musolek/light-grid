﻿/* global beforeEach, describe, it, expect, inject, module */

describe("Local data provider", function () {
	"use strict";

	var $compile;
	var $rootScope;
	var gridService;

	var grid =
		"<light-grid id='testGrid'>" +
			"<lg-local-data-provider model='model'></lg-local-data-provider>" +
			"<lg-column title='\"Column 1\"'>{{rowData.id}}</lg-column>" +
		"</light-grid>";

	var gridWithoutDataProviderMarkup =
		"<light-grid id='testGrid' model='model'>" +
			"<lg-column title='\"Column 1\"'>{{rowData.id}}</lg-column>" +
		"</light-grid>";

	beforeEach(module("light-grid"));

	beforeEach(inject(function(_$compile_, _$rootScope_, _lgGridService_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;
		gridService = _lgGridService_;

		$rootScope.model = [
			{ id: 1 },
			{ id: 2 },
			{ id: 3 }
		];
	}));

	describe("when assigned to a given grid and having 3-element array as a model", function() {
		it("should replace the directive with a table tag", function () {
			var element = $compile(grid)($rootScope);
			$rootScope.$digest();

			expect(element[0].nodeName).toEqual("TABLE");
			expect(element.children("thead").length).toEqual(1);
			expect(element.children("tbody").length).toEqual(1);
			expect(element.hasClass("light-grid")).toBeTruthy();
		});

		it("should render three rows", function() {
			var element = $compile(grid)($rootScope);
			$rootScope.$digest();

			expect(element.find("tbody").children("tr").length).toEqual(3);
			expect(element.find("tbody").children("tr:eq(0)").text()).toEqual("1");
			expect(element.find("tbody").children("tr:eq(1)").text()).toEqual("2");
			expect(element.find("tbody").children("tr:eq(2)").text()).toEqual("3");
		});

		it("should render the data as if it was provided to grid's data property", function() {
			var expectedElement = $compile(gridWithoutDataProviderMarkup)($rootScope);
			var element = $compile(grid)($rootScope);
			$rootScope.$digest();

			expect(element.html()).toEqual(expectedElement.html());
		});
	});
});