angular.module('sf_calculator',['StateFlow','SFUI'])

.controller('calculator_controller',['$q', '$scope','$http', 'stateFlowService','sfui_service','SERVER_URL', calculator_controller])

.constant('SERVER_URL',"http://192.168.1.198:4000")

function calculator_controller($q,$scope,$http,stateFlowService,sfui_service,SERVER_URL){

	// Create the SF runtime
	window.StateFlow.sf_calculator = new stateFlowService.StateFlow($q,stateFlowService,$http,{
		_name:'sf_calculator2',
		_appName:'sf_calculator2',
		_clientId:'client1',
		_execScript:true
	});

	// Set its context (ie Global data/classes that you will need during execution )
	window.StateFlow.sf_calculator.setContext({$scope:$scope});

	// Create & attach the remote connector to SF runtime
	window.StateFlow.sfUI = new sfui_service.SFUI();
	// window.StateFlow.sfUI.attachTo(window.StateFlow.sf_calculator,SERVER_URL);
	window.StateFlow.sfUI.attachTo(window.StateFlow.sf_calculator,null);


	// Setting shorter references to SF Runtime & remote connectors
	var 	sf_calculator = window.StateFlow.sf_calculator,
		sfUI = window.StateFlow.sfUI,
		moduleFile = 'sf_calculator2.sfmodule';


	// Call an entrypoint name on the user's keypress action in the calculator UI
	$scope.keyPress = function(key){
		sf_calculator.execute('keyPress',{keyPressed:key}).
		then(function s(val){
			console.log('SF - EP keypress for key %s, executed successfully. result is ',val);
		},function f(err){
			console.log('SF - ERROR while executing EP keypress for key %s. error is ',err);
		});
	};


};
