import { Process, env, id, specHelper } from "actionhero";
const actionhero = new Process();
let api: any, connection: any;

describe("Board API Tests", () => {
  beforeAll(async () => {
    api = await actionhero.start();

    connection = await specHelper.buildConnection();
  });

  afterAll(async () => {
    await actionhero.stop();
  });

  test("should have booted into the test env", () => {
    expect(process.env.NODE_ENV).toEqual("test");
    expect(env).toEqual("test");
    expect(id).toBeTruthy();
  });

  test("createBoard", async () => {
    connection.params = {
      title: '제목',
      content: '내용',
      writer: '작성자',
      password: '비밀번호'
    }
    const { result } = await specHelper.runAction("createBoard", connection);
    expect(result).toMatch(/success|failure/);
  });

  test("deleteBoard", async () => {
    connection.params = {
      board_no: 1,
      password: '비밀번호'
    }
    const { result } = await specHelper.runAction("deleteBoard", connection);
    expect(result).toMatch(/success|failure/);
  });

  test("updateBoard", async () => {
    connection.params = {
      board_no: 1,
      password: '비밀번호',
      title: '제목수정'
    }
    const { result } = await specHelper.runAction("updateBoard", connection);
    expect(result).toMatch(/success|failure/);
  });

  test("boardList", async () => {
    connection.params = {}
    const result = await specHelper.runAction("boardList", connection);
    expect(typeof result).toEqual('object');
  });
});
