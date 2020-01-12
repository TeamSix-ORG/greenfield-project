import React from 'react'
import $ from 'jquery'



class Ticket extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userId: "",
            eventTitle:"",
            eventDate:"",
            section:"",
            row:"",
            seat:"",
        }
    }
    getTicketData() {
        let User = {};
        if (localStorage && localStorage.getItem("user")) {
          User = JSON.parse(JSON.parse(localStorage.getItem("user")));
          this.setState({
            userId: User._id
          });
        }
        // var obj = {};
        // obj.userId = User._id;
        $.ajax({
          url: `/api/ticket/${User._id}`,
          type: "POST",
          data: this.state,
          success: data => {
              if(data === 'done'){
                  this.setState({
                    attend: false,
                    home: true
                  });
              }
          },
          error: (err) => {
              throw err
          }
        });
      }
    render(){   
        return(

       <div className ="ticketBody">
          <div className="container">
        <section>
          <div className="left">
            <div className="event">Live in Concert </div>
        <div className="title">{this.props.eventTitle}</div>
        <div className="info">{this.props.eventDate}</div>
          </div>
          <div className="right">
        <div className="seats">section<span>{this.props.section}</span></div>
            <div className="seats">row<span>{this.props.row}</span></div>
            <div className="seats">seat<span>{this.props.seat}</span></div>
          </div>
        </section>
      </div>
     
      <style dangerouslySetInnerHTML={{__html: `
    ticketBody {
        -webkit-print-color-adjust: exact !important;
        margin-left: 250px;
        color: #ffffff;
        font-family: "Open Sans", sans-serif;
        font-weight: 400;
        font-size: 25px;
      }

      .container {
        width: 795px;
        margin: 150px  auto;
      }
      
      section {
        -webkit-print-color-adjust: exact;   
        position: relative;
        height: 2s80px;
        width: 100%;
        background-image: url(https://htmlpdfapi.com/uploads/images/568b96887261690f6dbe0000/content_background-concert-3.jpg?1451988615);
        background-repeat: no-repeat;
        overflow: hidden;
      }
   
      section .left {
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        float: left;
        width: 635px;
        padding: 35px 0 0 60px;
      }
      section .right {
        float: right;
        width: 160px;
        padding-top: 30px;
      }
      section .event {
        margin-bottom: 40px;
        font-weight: 700;
        font-size: 1.9em;
        line-height: 35px;
        text-transform: uppercase;
      }
      section .title {
        margin-bottom: 35px;
        color: #F5A623;
        font-family: "Audiowide", cursive;
        font-size: 4em;
        line-height: 72px;
      }
      section .info {
        font-size: 1.3em;
        text-transform: uppercase;
        color: white
      }
      section .seats {
        margin-bottom: 35px;
        font-size: 0.6em;
        text-transform: uppercase;
        text-align: right;
        color: white
      }
      section .seats:last-child {
        margin-bottom: 0;
      }
      section .seats span {
        display: inline-block;
        width: 80px;
        margin-left: 15px;
        padding: 10px 0;
        color: #F5A623;
        background: rgba(255, 255, 255, 0.5);
        font-family: "Kreon", serif;
        font-size: 2.777em;
        text-align: center;
        vertical-align: middle;
      }
      `}} />
      </div>
      ) 
    }
}
  
export default Ticket