import React from 'react';

const details = (props) =>
{
    if(!props.marker){
        return (
          <div>
        <div className="card" style={{width: "25rem"}}>
            <img className="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA_v06yaioYS86A9QXTHme8GVdzLUtXd0QGwTL3zyssK6UJ3J6"/>
            <div className="card-body">
                <h5 className="card-title">Let's find the details of significant earthquakes in past 30 days</h5>
                <p className="card-text">Click on a marker to get details</p>
            </div>
        </div>
      </div>
        )
    }
    return (
      <div>
        <div className="card" style={{width: "25rem"}}>
            <img className="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA_v06yaioYS86A9QXTHme8GVdzLUtXd0QGwTL3zyssK6UJ3J6"/>
            <div className="card-body">
                <h5 className="card-title">Occured at : {props.place}</h5>
                <p className="card-text">With a magnitude of : {props.mag}</p>
            </div>
        </div>
      </div>
    )
  }
export default details;