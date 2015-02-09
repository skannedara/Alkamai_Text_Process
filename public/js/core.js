var scotchTodo = angular.module('scotchTodo', []);

function mainController($scope, $http, $sce, $location, $anchorScroll) {
	$scope.formData = {};
	
	$scope.entitiesJson;
	$scope.entities;
	$scope.keywordsJson;
	$scope.keywords;
	$scope.conceptsJson;
	$scope.concepts;
	$scope.sentimentJson;
	$scope.sentiment;
	$scope.languageJson;
	$scope.language;
	$scope.relationsJson;
	$scope.relations;
	$scope.categoryJson;
	$scope.category;
	$scope.textJson;
	$scope.text;
	$scope.authorJson;
	$scope.author;
	$scope.titleJson;
	$scope.title;
	$scope.feedsJson;
	$scope.feeds;
	$scope.microformatsJson;
	$scope.microformats;
	$scope.taxonomyJson;
	$scope.taxonomy;
	$scope.combinedJson;
	$scope.combined;
	$scope.imageJson;
	$scope.image;
	$scope.image_keywordsJson;
	$scope.image_keywords;

	$scope.showResultsText = false;
	$scope.showResultsVisual = false;
	$scope.showProgress = false;
	$scope.tooltip = {
	  "title": "Hello Tooltip<br />This is a multiline message!",
	  "checked": true
	};

	// when submitting the add form, send the text to the node API
	$scope.createTodo = function() {
		$scope.showResultsText = false;
		$scope.showResultsVisual = false;
		$scope.showProgress = true;
		$http.post('/api/todos', $scope.formData)
			.success(function(data) {
				$scope.formData = {text: data.entities.text}; // clear the form so our user is ready to enter another
				if(data.entities){
					$scope.entitiesJson = $scope.parseJSONData(data.entities);
					$scope.entities = data.entities.response.entities;
				}
				if(data.keywords){
					$scope.keywordsJson = $scope.parseJSONData(data.keywords);
					$scope.keywords = data.keywords.response.keywords;
				}
				if(data.concepts){
					$scope.conceptsJson = $scope.parseJSONData(data.concepts);
					$scope.concepts = data.concepts.response.concepts;
				}
				if(data.sentiment){
					$scope.sentimentJson = $scope.parseJSONData(data.sentiment);
					$scope.sentiment = data.sentiment.response.docSentiment;
				}
				if(data.language){
					$scope.languageJson = $scope.parseJSONData(data.language);
					$scope.language = data.language.response;
				}
				if(data.relations){
					$scope.relationsJson = $scope.parseJSONData(data.relations);
					$scope.relations = data.relations.response.relations;
				}
				if(data.category){
					$scope.categoryJson = $scope.parseJSONData(data.category);
					$scope.category = data.category.response;
				}
				if(data.text){
					$scope.textJson = $scope.parseJSONData(data.text);
					$scope.text = data.text.response;
				}
				if(data.author){
					$scope.authorJson = $scope.parseJSONData(data.author);
					$scope.author = data.author.response;
				}
				if(data.title){
					$scope.titleJson = $scope.parseJSONData(data.title);
					$scope.title = data.title.response;
				}
				if(data.feeds){
					$scope.feedsJson = $scope.parseJSONData(data.feeds);
					$scope.feeds = data.feeds.response.feeds;
				}
				if(data.microformats){
					$scope.microformatsJson = $scope.parseJSONData(data.microformats);
					$scope.microformats = data.microformats.response.microformats;
				}
				if(data.taxonomy){
					$scope.taxonomyJson = $scope.parseJSONData(data.taxonomy);
					$scope.taxonomy = data.taxonomy.response.taxonomy;
				}
				if(data.combined)
					$scope.combined = $scope.parseJSONData(data.combined);
				if(data.image){
					$scope.imageJson = $scope.parseJSONData(data.image);
					$scope.image = data.image.response.image;
				}
				if(data.image_keywords){
					$scope.image_keywordsJson = $scope.parseJSONData(data.image_keywords);
					$scope.image_keywords = data.image_keywords.response.imageKeywords;
				}
				$scope.showResultsText = true;
				$scope.showProgress = false;
				$location.hash('searchinput');
				$anchorScroll();
				$(".entitySel").click();
			})
			.error(function(data) {
				console.log('Error: ' + data);
				//myApp.hidePleaseWait();
			});
	};
	// Parse JSON data into 
	$scope.parseJSONData = function(response) {
		var results1 = JSON.stringify(response, undefined, 2),
			results2 = results1.replace(/\n/g, "<br>").replace(/[ ]/g, "&nbsp;");
	    return $sce.trustAsHtml(results2);//results2;
	};
}
