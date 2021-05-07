import { Process, env, id, specHelper } from "actionhero";
const actionhero = new Process();
let api: any, connection: any;

describe("Comment API Tests", () => {
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

  test("createComment", async () => {
    connection.params = {
      board_no: 1,
      content: '내용',
      writer: '작성자'
    }
    const { result } = await specHelper.runAction("createComment", connection);
    expect(result).toMatch(/success|failure/);
  });

  test("commentList", async () => {
    connection.params = {}
    const result = await specHelper.runAction("commentList", connection);
    expect(typeof result).toEqual('object');
  });
});
