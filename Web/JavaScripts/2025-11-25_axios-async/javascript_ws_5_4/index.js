/* 
  아래에 코드를 작성해주세요.
*/

// 1. 검색창 (DOM & EVENT)
const searchBtn = document.querySelector('.search-box__button')
const resultContainer = document.querySelector('.search-result')

// 2. api 요청 (ajax)
async function fetchAlbums(page=1, limit=10) {
  const input = document.querySelector('.search-box__input')
  const keyword = input.value.trim()

  try {
    const response = await axios({
      method: 'get',
      url : 'https://ws.audioscrobbler.com/2.0/',
      params: {
        method:'album.search',
        album: keyword,
        api_key:'6b668121913290b271e2148240b23a8a',
        format:'json',
        limit,
        page,
      },
    })

    console.log(response)
    const albums = response.data.results.albummatches.album
    console.log(albums)

    resultContainer.innerHTML = ''

    albums.forEach(album => {
      // 앨범 상세페이지 URL
      const albumUrl = album.url   // ← Last.fm에서 오는 상세 페이지 링크

      const card = document.createElement('div')
      card.classList.add('search-result__card')

      const cardImg = document.createElement('img')
      cardImg.src = album.image[1]['#text']

      const cardDiv = document.createElement('div')
      cardDiv.classList.add('search-result__text')

      const h2Tag = document.createElement('h2')
      h2Tag.textContent = album.name   // 앨범 제목

      const pTag = document.createElement('p')
      pTag.textContent = album.artist  // 아티스트 이름

      // 텍스트 영역에 제목/아티스트 추가
      cardDiv.appendChild(h2Tag)
      cardDiv.appendChild(pTag)

      // 카드에 이미지 + 텍스트 영역 추가
      card.appendChild(cardImg)
      card.appendChild(cardDiv)

      // 카드 클릭 시 상세페이지로 이동
      card.addEventListener('click', () => {
        window.location.href = albumUrl
      })

      resultContainer.appendChild(card)
})
    }
    catch(error) {
      console.error(error)
      alert('잠시 후 다시 시도해주세요')
    }
  }

searchBtn.addEventListener('click', fetchAlbums)

