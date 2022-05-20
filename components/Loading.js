import React from 'react'
import Lottie from 'react-lottie'
import animationData from '../lotties/fireworks.json'

const Loading = () => {

  const defaultLottie = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex w-full h-full justify-center items-center">
      <Lottie options={defaultLottie} height={300} width={300} />
    </div>
  );
}

export default Loading