import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './weather.css';

class Weather extends React.Component {
	constructor() {
		super();
		this.state = { location: {}, current: {}, forecast: [] };
		this.update = this.update.bind( this );
	}
	update( data ) {
		this.setState({
			location: data.query.results.channel.location,
			current: data.query.results.channel.item.condition,
			forecast: data.query.results.channel.item.forecast.splice( 0, 5 )
		});
	}
	fetchWeather() {
		let xhr = new XMLHttpRequest();
		xhr.onreadystatechange = () => {
			if (xhr.readyState == 4 && xhr.status == 200) {
				let data = JSON.parse(xhr.responseText);
				data.query.results.channel.item.condition.img = 'http://l.yimg.com/a/i/us/we/52/' + data.query.results.channel.item.condition.code+ '.gif';
				this.update( data );
			}
		};
		xhr.open( 'GET', 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22fairfax%2C%20va%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithke');
		xhr.send();
	}
	componentWillMount() {
		this.fetchWeather();
	}
	render() {
		let forecastDays = this.state.forecast.map( D => {
			return <DayForecast key={D.date} data={D}/>
		});

		return (
			<div>
				<div styleName="weatherBox">
					<h1>{this.state.location.city},{this.state.location.region}</h1>
					<div>
						<span styleName="weatherTemp">{this.state.current.temp}&deg;</span>
						<span styleName="weatherIcon"><img src={this.state.current.img}/></span>
					</div>
					<div styleName="weatherDays">
						{forecastDays}
					</div>
				</div>
			</div>
		)
	}
}

const DayForecast = (props) => {
	return (
		<div>
			<span>{props.data.day}</span><br/>
			<span>{props.data.high}&deg; / {props.data.low}&deg;</span>
		</div>
	)
}

export default CSSModules( Weather, styles );
