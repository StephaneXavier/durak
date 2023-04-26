import { React } from "react";


const Card = ({cardInfo, left, rotate}) => {
    if (!cardInfo) {
        return null;
    }

    

    return (
        <div className="card" style={{position: 'absolute', left: `${left}px`, transform: `rotate(${rotate}deg)`}} >
            <img src={cardInfo.image} alt={cardInfo.code} />
        </div>
    )
}

export default Card;