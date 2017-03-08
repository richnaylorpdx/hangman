angular.module('hangman', [])
.controller('mainController', function($scope,$http,getUuid,checkWord) { 
	getUuid.success(function(data) {
		$scope.getUuid = data;
	});

	$scope.postLetter = function(data, getLetter) {
		// console.log("this is the sent value " + data + " get letter info " + JSON.stringify(getLetter)); 
		console.log(getLetter.word);
		checkWord.check(data, getLetter)
		.success(function(data) {
			$scope.getLetter = data;
		});
	};

	checkWord.get()
	.success(function(data) {
		$scope.getLetter = data;
	});

})
.factory('checkWord', function($http) {
	return {
		get : function(data) {
			return $http.get('/api/checkword', data);
		},
		check : function(data, getLetter) {
			 sendletter = {
				"letter"	: data,
				"str"			: getLetter.strWord,
				// "word" 		: getLetter.word,
				"id" 			: getLetter.id,
				"tries"		: getLetter.tries,
				"letters"	: getLetter.letters
			};
			return $http.post('/api/checkword', sendletter);
		}
	}
})
.factory('getUuid', function($http) {
	return $http.get('/api/uuid')
	.success(function(data) {
		return data;
	})
	.error(function(err) {
		return err;
	});
});