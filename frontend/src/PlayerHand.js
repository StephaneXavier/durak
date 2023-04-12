import { React } from "react";
import Card from "./Card";

const PlayerHand = ({cards}) => {
    if (!cards) {
        return null;
    }
    

    const cardWidth = 50;
    const handWidth = cardWidth * cards.length;
    const handMargin = (window.innerWidth - handWidth) / 2;

    return (

        <div style={{ position: "relative", width: handWidth, margin: `0 ${handMargin}px` }}>
        {
            cards.map( (card, index) => (<Card cardInfo = {card} left={index * cardWidth} rotate={index - (cards.length - 1) / 2}></Card>))
        }
       </div>
        
    )
}

export default PlayerHand;