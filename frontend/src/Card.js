import { React } from "react";

const Card = ({cardInfo}) => {
    if (!cardInfo) {
        return null;
    }

    return (
        <div className="card">
            <img src={cardInfo.image} alt={cardInfo.code} />
        </div>
    )
}

export default Card;