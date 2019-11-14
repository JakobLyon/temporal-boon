import moxios from "moxios";
import { testStore } from "../../utils";
import { logIn } from "../redux/actions/log-in";

describe("logIn action", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("Success reponse causes a login", () => {
    const response = { status: true };
    const store = testStore();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response
      });
    });

    return store.dispatch(logIn()).then(() => {
      const newState = store.getState();
      expect(newState.isLoggedIn).toBe(true);
    });
  });

  it("Failed response causes no change", () => {
    const response = { status: false, message: "failed" };
    const store = testStore();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response
      });
    });

    return store.dispatch(logIn()).then(() => {
      const newState = store.getState();
      expect(newState.isLoggedIn).toBe(false);
    });
  });
});
