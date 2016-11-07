angular.module("demoServer")
.controller("mainController",["$scope","$location", mainController]);

function mainController($scope,$location){

	var URL_PARAMS = $location.search();
	console.log('URL PARAMS ARE ', URL_PARAMS);


	$scope.showing = {
		devStory: typeof URL_PARAMS.devStory != "undefined" && URL_PARAMS.devStory ==='true' ? true : false,
		problemStatement:typeof URL_PARAMS.problemStatement != "undefined" && URL_PARAMS.problemStatement ==='false' ? false : true,
		whatIf:typeof URL_PARAMS.whatIf != "undefined" && URL_PARAMS.whatIf ==='false' ? false : true,
		st8floIntro:typeof URL_PARAMS.st8floIntro != "undefined" && URL_PARAMS.st8floIntro ==='false' ? false : true,
		benefits:typeof URL_PARAMS.benefits != "undefined" && URL_PARAMS.benefits ==='false' ? false : true,
		keyFeatures:typeof URL_PARAMS.keyFeatures != "undefined" && URL_PARAMS.keyFeatures ==='false' ? false : true,
	}
};
