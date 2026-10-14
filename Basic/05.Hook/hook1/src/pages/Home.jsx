import React from 'react'
import { useState } from 'react'
import TodoItem from '../components/TodoItem'
import { useCallback } from 'react'
import { useEffect } from 'react'

// SPRING BOOT 서버 주소 (백엔드)
const API_URL = `http://localhost:8080/todos`

const Home = () => {
  // 🧊 state
  const [todos, setTodos] = useState([])      // 할일 목록
  const [text, setText] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)



  // 💻 비동기 요청 공통 함수
  const request = async (url, options = {} ) => {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type' : 'application/json',
        ...options.headers,
      }
    })
    // 요청 실패 시
    if( !response.ok ) {
      throw new Error(`HTTP 오류 : ${response.status}`)
    }

    // 요청 성공 시, 응답에 따라서 반환
    const contentType = response.headers.get('content-type')

    if(contentType?.includes('application/json')) {
      return response.json()
    }

    return response.text()
  }

  // 할 일 목록 조회
  // useCallback : 함수 재사용을 위한 훅
  // - 함수가 불필요하게 메모리공간에 재할당 되는 것을 방지
  const fetchTodos = useCallback( 
    async () => {
      try {
        setLoading(true)    // 로딩중
        setError('')        // 에러 상태 초기화

        // 할일 목록 비동기 요청
        const data = await request(`${API_URL}?page=1&size=10`)

        // todos(할일 목록) 상태 업데이트
        setTodos(data.list ?? [])

      } catch (error) {
        console.error('목록 조회 실패: ', error)
        setError('할 일 목록을 불러오지 못했습니다.')
      } finally {
        setLoading(false)       // 로딩끝
      }
    },
    [],
  )
  
  // 할 일 추가
  const handleAdd = async () => {
    if(!text.trim()) {
      alert('할 일을 입력해주세요.')
      return
    }

    try {
      await request(API_URL, {
        method: 'POST',
        body: JSON.stringify({
          name: text.trim(),
          completed: false,
          seq: 0
        })
      })
      setText('')
      await fetchTodos()
    } catch (error) {
      console.error('할 일 추가 실패 :', error)
      alert('할 일을 추가하지 못했습니다.')
    }
  }

  // 할 일 완료 상태 변경
  const handleToggle = async (id) => {
    const todo = todos.find(todo => todo.id === id)

    if(!todo) return

    try {
      await request(API_URL, {
        method: 'PUT',
        body: JSON.stringify({
          ...todo,
          status: !todo.status 
        })
      })

      await fetchTodos()
    } catch (error) {
      console.log('완료 상태 변경 실패:', error);
      alert('완료 상태를 변경하지 못했습니다.')
    }
  }

  // 할 일 삭제
  const handleDelete = async (id) => {
    if(!window.confirm('정말 삭제하시겠습니까?')) return

    try {
      await request(`${API_URL}/${id}`, {
        method: 'DELETE'
      })

      await fetchTodos()

    } catch (error) {
      console.error(`할 일 삭제 실패:`, error)
      alert('할 일을 삭제하지 못했습니다.')
    }
  }



  // 할일 전체 개수와 완료된 개수
  const total = todos.length
  const completed = todos.filter(todo => todo.status).length


  // ⚡ 컴포넌트가 마운트 되었을 때, 할일 목록 데이터 요청
  useEffect(() => {
    // 할일목록 요청
    fetchTodos()
  }, [fetchTodos])
  

  return (
    <div>
      <h1>Todo List 앱</h1>

      <input type="text" 
             placeholder='할 일 입력'
             value={text}
             onChange={e => setText(e.target.value)}
      />
      <button onClick={handleAdd}>추가</button>

      <br /><br />

      <h3>전체 : {total} / 완료 : {completed}</h3>
      {/* 할 일 목록 */}
      {
       todos.map(todo => (
        <TodoItem 
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
       ))
      }
    </div>


  )
}

export default Home