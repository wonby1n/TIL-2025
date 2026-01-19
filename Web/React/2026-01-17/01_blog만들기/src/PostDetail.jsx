import { useParams, Link } from 'react-router-dom'

function PostDetail(props) {
  const params = useParams();     // { id: "0" } 같은 형태
  const id = Number(params.id);   // 문자열 -> 숫자 변환

  // 범위 밖 접근 방지
  if (Number.isNaN(id) || id < 0 || id >= props.글제목.length) {
    return (
      <div className="list">
        <h4>없는 글입니다.</h4>
        <Link to="/">목록으로</Link>
      </div>
    )
  }

  return (
    <div className="list">
      <h2>{props.글제목[id]}</h2>
      <p>좋아요: {props.따봉[id]}</p>
      <p>상세내용(임시)</p>

      <Link to="/">← 목록으로</Link>
    </div>
  )
}

export default PostDetail
