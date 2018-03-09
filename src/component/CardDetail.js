import React from "react";
import LazyLoad from "react-lazyload";


const CardDetail = (props) => {
    return (
        <li>
            <LazyLoad height={35} offset={400}>
                <div
                className="name"
                    style={{
                        background: `linear-gradient(to right, black 0%, black 70%, rgba(255, 255, 255, 0)) 30%, url(/resources/${
                        props.card.tile
                        }) top right no-repeat`
                    }}
                >
                {props.card.name}
                </div>
            </LazyLoad>
            <div className="quantity">{props.card.rarity === "LEGENDARY" ? <div><i className="fas fa-star"></i></div> :props.card.quantity}</div>
        </li>
    )
}

export default CardDetail;