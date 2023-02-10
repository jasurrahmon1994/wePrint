import React from 'react'

function Feature(props) {
  return (
		<div className="features">
			<p>
				<strong>Xususiyatlari:</strong>
				<span className={`${props.color}`}>{props.feature}</span>
			</p>
			<p>
				<strong>Narxi:</strong>
				<span className={`${props.color}`}>{props.price}</span>
			</p>
		</div>
  );
}

export default Feature