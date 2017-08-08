# Recipe App!

This is a simple application written in React/ES6 which works with your local storage. It 
is a good demonstration of stateless components as well as class based components with state. 
It is a simple CRUD application. To start working with the app try adding some recipes to the list, the app will save them in your local storage. 

## To run:

	* clone the project
	* from inside the directory: 	
		- npm install
		- npm start

If there is an error in regard to `confirm` used as a restricted global:
go to your `<your project directory>/node_modules/eslint-config-react-app/index.js` 
and comment out the `confirm` from your `restrictedGlobals`. 


Enjoy!