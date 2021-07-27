import React from "react";
import anime from "animejs";

function getClientWidth() {
    if (typeof document !== "undefined") {
        return document.documentElement.clientWidth;
    }
    return 0;
}
function getClientHeight() {
    if (typeof document !== "undefined") {
        return document.documentElement.clientHeight;
    }
    return 0;
}

export default class StarrySky extends React.Component {
    ///@ts-ignore
    constructor(props) {
        super(props);
        this.state = {
            num: 60,
            vw: Math.max(
                getClientWidth(),
                typeof window !== "undefined" ? window.innerWidth : 0
            ),
            vh: Math.max(
                getClientHeight(),
                typeof window !== "undefined" ? window.innerHeight : 0
            ),
        };
    }
    starryNight = () => {
        anime({
            targets: ["#sky .star"],
            opacity: [
                {
                    duration: 700,
                    value: "0",
                },
                {
                    duration: 700,
                    value: "1",
                },
            ],
            easing: "linear",
            loop: true,
            delay: (el, i) => 50 * i,
        });
    };
    shootingStars = () => {
        anime({
            targets: ["#shootingstars .wish"],
            easing: "linear",
            loop: true,
            delay: (el, i) => 1000 * i,
            opacity: [
                {
                    duration: 700,
                    value: "1",
                },
            ],
            width: [
                {
                    value: "150px",
                },
                {
                    value: "0px",
                },
            ],
            translateX: 1000,
        });
    };
    randomRadius = () => {
        return Math.random() * 0.7 + 0.6;
    };
    getRandomX = () => {
        ///@ts-ignore
        return Math.floor(Math.random() * Math.floor(this.state.vw)).toString();
    };
    getRandomY = () => {
        ///@ts-ignore
        return Math.floor(Math.random() * Math.floor(this.state.vh)).toString();
    };
    componentDidMount() {
        if (typeof window === "undefined") return;
        this.starryNight();
        this.shootingStars();
    }
    render() {
        if (typeof window === "undefined") return null;
        ///@ts-ignore
        const { num } = this.state;
        return (
            <>
                <svg id="sky">
                    {[...Array(num)].map((x, y) => (
                        <circle
                            cx={this.getRandomX()}
                            cy={this.getRandomY()}
                            r={this.randomRadius()}
                            stroke="none"
                            strokeWidth="0"
                            fill="white"
                            key={y}
                            className="star"
                        />
                    ))}
                </svg>

                <div id="shootingstars">
                    {[...Array(60)].map((x, y) => (
                        <div
                            key={y}
                            className="wish"
                            style={{
                                left: `${this.getRandomY()}px`,
                                top: `${this.getRandomX()}px`,
                            }}
                        />
                    ))}
                </div>
            </>
        );
    }
}
