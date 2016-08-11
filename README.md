# react-weather-widget
Pulls down weather from Yahoo! weather API and displays current+5 day forecast

# How To
Clone this repo and run `npm i` from the root

To see the example run `npm start` (please note this requires webpack). Once finished you can open 127.0.0.1:8080 to view the widget in action.

To use it in your own project, you can simply do:
```javascript
import Weather from './Weather'
import React from `react`
import ReactDOM from `react-dom`

ReactDOM.render( <Weather/>, document.getElementById( 'yourElement' ) )
```
