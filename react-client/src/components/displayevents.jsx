import React from 'react'
import axios from "axios"
 export default class displayEvent extends React.Component {
 	constructor(props) {
 		super(props)
 		this.state = {events:[],isLoading:true}
 	}
 	componentDidMount() {
		 axios.get('http://localhost:3001/organizer/events/:eventid')
		 .then((res)=>{
			 console.log(res);
			 this.setState({events: res.data,isLoading:false})
		 }).catch((err)=>console.log(err))
	 }
	 render() {
		 const {events,isLoading} = this.state;
		 if(isLoading) {
			 return <p>LOADING EVENTS</p>
		 }
		 else {
			return(<ul>{events.map(event=><ul>
				<li>{event.event-name}</li>
				<li>{event.description}</li>
				<li>{event.date}</li>
				<li>{event.img-url}</li>
				<li>{event.videos}</li>
				<li>{event.category}</li>
				<li>{event.organizer-id}</li>
				<li>{event.plan-id}</li>
				
			</ul>)}</ul>
			)
		 }

	 
 }
}