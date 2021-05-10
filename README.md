# 게시판 및 댓글 지원 API 입니다.

> 해당 api 는 nodejs 기반의 actionhero 프레임워크를 사용하여 만들어졌습니다.
> https://www.actionherojs.com/


### 기능
- 게시판은 제목, 내용, 작성자, 비밀번호, 작성일시, 수정일시로 구성되어있습니다.
- 로그인 기능 없이 작성자도 임력 파라미터로 받습니다.
- 게시판은 제목, 작성자로 검색이 가능합니다.
- 게시글은 작성, 수정, 삭제가 가능합니다.
- 게시글 작성시에는 비밀번호를 입력받고, 수정/삭제시 입력한 비밀번호가 맞는 경우만 가능합니다.
- 게시글에는 댓글을 작성할 수 있습니다.
- 댓글은 내용, 작성자, 작성일시로 구성되어있습니다.
- 댓글의 댓글까지 작성이 가능합니다.
- 게시물과 댓글목록 api 는 페이징 기능이 있어야 합니다.

### DB
- mysql 을 사용합니다.
- 테이블 생성 스크립트는 아래와 같습니다.  

`board`
```
CREATE TABLE `board` (
  `board_no` int NOT NULL AUTO_INCREMENT COMMENT '게시글 번호',
  `title` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '제목',
  `content` mediumtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '내용',
  `writer` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '작성자',
  `password` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '비밀번호',
  `wdate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일',
  `mdate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일',
  PRIMARY KEY (`board_no`),
  KEY `title` (`title`) USING BTREE,
  KEY `writer` (`writer`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
```
`comment`
```
CREATE TABLE `comment` (
  `comment_no` int NOT NULL AUTO_INCREMENT COMMENT '댓글번호',
  `pa_comment_no` int DEFAULT NULL COMMENT '부모 댓글번호',
  `board_no` int NOT NULL COMMENT '게시글 번호',
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '댓글 내용',
  `writer` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '작성자',
  `wdate` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '댓글 등록일',
  PRIMARY KEY (`comment_no`),
  KEY `board_no` (`board_no`) USING BTREE,
  KEY `pa_comment_no` (`pa_comment_no`) USING BTREE,
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`board_no`) REFERENCES `board` (`board_no`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
```


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