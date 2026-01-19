import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import PostDetail from './PostDetail.jsx'

function App() {
  let [글제목] = useState(['타코야끼 추천', '삼겹살 추천', '갈비 추천']);
  let [따봉, 따봉변경] = useState([0, 0, 0]);

  const increaseLike = (index) => {
    let copy = [...따봉];
    copy[index] += 1;
    따봉변경(copy);
  };

  return (
    <div className="App">
      <div className='black-nav'>
        <h4>hawonBlog</h4>
      </div>

      <Routes>
        {/* ✅ 목록 페이지 */}
        <Route path="/" element={
          <>
            {글제목.map((title, idx) => (
              <div className="list" key={idx}>
                {/* ✅ 제목 클릭하면 상세페이지로 이동 */}
                <h4>
                  <Link to={`/post/${idx}`}>{title}</Link>
                  <span
                    onClick={(e) => {
                      e.preventDefault();      // Link 클릭 막기(좋아요 누를 때)
                      increaseLike(idx);
                    }}
                    style={{ cursor: 'pointer', marginLeft: '8px' }}
                  >
                    ❤️
                  </span>
                  {따봉[idx]}
                </h4>
                <p>1월 17일 발행</p>
              </div>
            ))}
          </>
        } />

        {/* ✅ 상세 페이지 */}
        <Route path="/post/:id" element={
          <PostDetail 글제목={글제목} 따봉={따봉} />
        } />
      </Routes>
    </div>
  )
}

export default App
