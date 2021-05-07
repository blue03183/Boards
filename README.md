# 게시판 및 댓글 지원 API 입니다.

> 해당 api 는 nodejs 기반의 actionhero 프레임워크를 사용하여 만들어졌습니다.
> https://www.actionherojs.com/



### 게시판
- 게시글 생성  
  [post] http://localhost:8080/api/board
- 게시글 수정  
  [put] http://localhost:8080/api/board
- 게시글 삭제  
  [delete] http://localhost:8080/api/board
- 게시글 조회  
  [get] http://localhost:8080/api/board


### 댓글
- 댓글 생성  
  [post] http://localhost:8080/api/comment
- 댓글 조회  
  [get] http://localhost:8080/api/comment


### 테스트
- `npm run jest` 명령을 통해 테스트 가능합니다.
- 해당 명령 실행시 __tests__ 하위의 테스트 파일이 실행되며 테스트를 합니다.
- 액션히어로 프레임워크의 특성상 액션에서 별도의 함수를 만들어 처리하는게 아니기 떄문에 mock 함수를 사용하지 않고 mysql.ts 파일에서 테스트인경우 임의의 값을 리턴하도록 처리되었습니다.