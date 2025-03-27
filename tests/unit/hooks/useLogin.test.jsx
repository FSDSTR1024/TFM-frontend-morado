/*********************************************** External Node modules ************************************************/
import { act, renderHook } from "@testing-library/react";

/********************************************** Internal library imports **********************************************/
import { authAPI } from "/src/api/auth";
import { AuthContext } from "/src/contexts";
import { useLogin } from "/src/hooks";

/******************************************************* Mocks ********************************************************/
vi.mock("/src/api/auth", () => {
  return {
    authAPI: {
      login: vi.fn()
    }
  };
});

/***************************************************** Unit tests *****************************************************/
describe("useLogin Hook", () => {
  it("Sets token to Auth. context when NO errors.", async () => {
    /* Arrange */
    const mockToken = "T_token";
    authAPI.login.mockResolvedValue({ token: mockToken });
    const mockSetToken = vi.fn();
    const mockedWrapper = ({ children }) => (
      <AuthContext.Provider value={{ setToken: mockSetToken }}>
        {children}
      </AuthContext.Provider>
    );
    const userCredentials = { email: "T_email", password: "T_password" };
    const { result } = renderHook(() => useLogin(), { wrapper: mockedWrapper });

    /* Act */
    let returnValue;
    await act(async () => returnValue = await result.current.login(userCredentials));

    /* Assert */
    expect(result.current.error).toBeNull();
    expect(authAPI.login).toHaveBeenCalledWith(userCredentials);
    expect(mockSetToken).toHaveBeenCalledWith(mockToken);
    expect(returnValue).toBe(mockToken);
  });
});
