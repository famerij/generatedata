define([
	"manager",
	"constants",
	"lang",
	"generator"
], function(manager, C, L, generator) {

	var MODULE_ID = "data-type-AlphaNumeric";
	var LANG = L.dataTypePlugins.Alphanumeric;


	var _init = function() {
		var subscriptions = {};
		subscriptions[C.EVENT.DATA_TABLE.ROW.EXAMPLE_CHANGE + "__AlphaNumeric"] = _exampleChange;
		manager.subscribe(MODULE_ID, subscriptions);
	}

	var _exampleChange = function(msg) {
		$("#dtOption_" + msg.rowID).val(msg.value);
	}

	var _validate = function(rows) {
		var visibleProblemRows = [];
		var problemFields      = [];
		for (var i=0; i<rows.length; i++) {
			if ($("#option_" + rows[i]).val() == "") {
				var visibleRowNum = gd._getVisibleRowOrderByRowNum(rows[i]);
				visibleProblemRows.push(visibleRowNum);
				problemFields.push($("#option_" + rows[i]));
			}
		}

		if (visibleProblemRows.length) {
			gd.errors.push({ els: problemFields, error: L.AlphaNumeric_incomplete_fields + " <b>" + visibleProblemRows.join(", ") + "</b>"});
		}
	}

	/*
	var _loadRow = function(rowNum, data) {
		return [
			function() {
				$("#dt_" + rowNum).val(data.example);
				$("#option_" + rowNum).val(data.option);
			},
			function() { return $("#option_" + rowNum).length > 0; }
		];
	},

	var saveRow = function(rowNum) {
		return {
			"example":  $("#dt_" + rowNum).val(),
			"option":   $("#option_" + rowNum).val()
		};
	}
	*/

	manager.register(MODULE_ID, C.COMPONENT.DATA_TYPE, {
		init: _init,
		validate: _validate
	});

});