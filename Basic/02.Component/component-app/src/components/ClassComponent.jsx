// ✨rce
import React, { Component } from 'react'

// 클래스형 컴포넌트 정의
export class ClassComponent extends Component {
  // 생성자 안에서 상태를 정의한다.
  constructor(props) {

    super(props);
    // 상태 정의
    this.state = {
      name: "미나미"
    };

    // 이벤트 바인딩
    this.handleClickMinami = this.clickMinami.bind(this)
    this.handleClickWonee = this.clickWonee.bind(this)

  }

  // 이벤트 핸들러
  clickMinami() {
    console.log("미나미 클릭!");
    // 상태 업데이트
    this.setState({ name: '미나미' })
  }

  clickWonee() {
    console.log("원이 클릭!");
    // 상태 업데이트
    this.setState({ name: '원이' })
  }

  render() {

    // 상태 선언
    const { name } = this.state

    return (
      <div>
        <h1>클래스 컴포넌트</h1>
        <h2>Hello I'm {name}</h2>
        <button onClick={this.handleClickMinami}>미나미</button>
        <button onClick={this.handleClickWonee}>원이</button>
      </div>
    )
  }
}

export default ClassComponent