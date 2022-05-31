import Login from '../Login'
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

jest.mock('../../api/api')

describe('Login Tests', () => {

    beforeEach(() => {
        window.localStorage.removeItem('isLoggedIn')
    })

    test('Authenticated User', async () => {
        render(
            <div>
                <ToastContainer />
                <Router>
                    <Login setIsUserLoggedIn={jest.fn()} />
                </Router>
            </div>
        );


        fireEvent.change(screen.getByPlaceholderText(/enter email/i), {
            target: {value: 'test@test.com'},
        })
        fireEvent.change(screen.getByPlaceholderText(/password/i), {
            target: {value: 'test'},
        })

        fireEvent.click(screen.getByRole('button', {
            name: /sign in/i
        }))

        const alert = await screen.findByRole('alert')

        expect(alert).toHaveTextContent(/successfully authenticated/i)

        await waitFor(() => expect(window.localStorage.getItem("isLoggedIn")).toBeDefined())
                        
        expect(window.localStorage.getItem("isLoggedIn")).toBe('true');
        
      });

      test('Unauthenticated User', async () => {
        render(
            <div>
                <ToastContainer />
                <Router>
                    <Login setIsUserLoggedIn={jest.fn()} />
                </Router>
            </div>
        );


        fireEvent.change(screen.getByPlaceholderText(/enter email/i), {
            target: {value: 'unauth@test.com'},
        })
        fireEvent.change(screen.getByPlaceholderText(/password/i), {
            target: {value: 'test'},
        })

        fireEvent.click(screen.getByRole('button', {
            name: /sign in/i
        }))

        const alert = await screen.findByRole('alert')

        expect(alert).toHaveTextContent(/authentication unsuccessful/i)

        await waitFor(() => expect(window.localStorage.getItem("isLoggedIn")).toBeDefined())
       
        expect(window.localStorage.getItem("isLoggedIn")).toBe('false');
        
      });

})

