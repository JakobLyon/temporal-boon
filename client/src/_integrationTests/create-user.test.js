import moxios from "moxios";
import { testStore } from "../../utils";
import { createUser } from "../redux/actions/create-user";

describe("Create User action", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("Success response logs in", () => {
    const response = { status: true };
    const store = testStore();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response
      });
    });

    return store.dispatch(createUser()).then(() => {
      const newState = store.getState();
      expect(newState.isLoggedIn).toBe(true);
    });
  });

  it("Fail response does not log in", () => {
    const response = { status: false, message: "fail" };
    const store = testStore();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response
      });
    });

    return store.dispatch(createUser()).then(() => {
      const newState = store.getState();
      expect(newState.isLoggedIn).toBe(false);
    });
  });
});
