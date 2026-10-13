// ✨ rafce
import React, { useState } from 'react'

const FunctionComponent = () => {
  // state 선언
  // const [상태, 업데이트함수] = useState('초기값')
  const [name, setName] = useState('미나미')

  // 이벤트 핸들러
  const handleClick = (newName) => {
    console.log(`${newName} 클릭!`);
    // 상태 업데이트
    setName(newName)
  }

  return (
    <div>
      <h1>함수형 컴포넌트</h1>
      <h2>Hello I'm {name}</h2>
      <button onClick={() => handleClick('미나미')}>미나미</button>
      <button onClick={() => handleClick('원이')}>원이</button>
    </div>
  )
}

export default FunctionComponent