'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var comparer = require('@aryth/comparer');
var rankColumn = require('@aryth/rank-column');
var rankMatrix = require('@aryth/rank-matrix');
var rankVector = require('@aryth/rank-vector');



Object.defineProperty(exports, 'NUM_ASC', {
	enumerable: true,
	get: function () {
		return comparer.NUM_ASC;
	}
});
Object.defineProperty(exports, 'NUM_DESC', {
	enumerable: true,
	get: function () {
		return comparer.NUM_DESC;
	}
});
Object.defineProperty(exports, 'STR_ASC', {
	enumerable: true,
	get: function () {
		return comparer.STR_ASC;
	}
});
Object.defineProperty(exports, 'STR_DESC', {
	enumerable: true,
	get: function () {
		return comparer.STR_DESC;
	}
});
Object.defineProperty(exports, 'ColumnRank', {
	enumerable: true,
	get: function () {
		return rankColumn.ColumnRank;
	}
});
Object.defineProperty(exports, 'MutateRank', {
	enumerable: true,
	get: function () {
		return rankColumn.MutateRank;
	}
});
Object.defineProperty(exports, 'rankMatrix', {
	enumerable: true,
	get: function () {
		return rankMatrix.rank;
	}
});
Object.defineProperty(exports, 'rankVector', {
	enumerable: true,
	get: function () {
		return rankVector.rank;
	}
});
