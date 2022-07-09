import React from 'react'

import './FaceRecognition.css'

const FaceRecognition = ({url, box}) => {
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='inputimage' alt='' src={url} maxwidth='500px' heigh='auto'/>
        {box.length > 0 && box.map((b, idx)=><div key={idx} className='bounding-box' style={{top: b.topRow, right: b.rightCol, bottom: b.bottomRow, left: b.leftCol}}></div>) }
      </div>
    </div>
  )
}

export default FaceRecognition