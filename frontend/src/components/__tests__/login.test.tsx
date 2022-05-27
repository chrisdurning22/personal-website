import Login from '../Login'
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { LoginUser } from '../../api/api';


jest.mock('../../api/api')

describe('Login Tests', () => {

    test('Can user login to account', async () => {
        const { getByPlaceholderText, getByRole } = render(
            <Router>
                <Login setIsUserLoggedIn={(isUserLoggedIn: boolean) => console.log(isUserLoggedIn)} />
            </Router>
        );

        const dummyUser = {
            email: "email@test.com",
            password: "test"
        }

        const emailInputs = getByPlaceholderText(/enter email/i);
        const passwordInputs = getByPlaceholderText(/password/i);

        emailInputs.nodeValue = dummyUser.email
        passwordInputs.nodeValue = dummyUser.password

        fireEvent.click(getByRole('button', {
            name: /sign in/i
        }))

        await waitFor(() => expect(window.localStorage.getItem("isLoggedIn")).toBeDefined())
                
        // expect(LoginUser).toHaveBeenCalledTimes(1)
        expect(window.localStorage.getItem("isLoggedIn")).toBe('true');
        
      });

})

