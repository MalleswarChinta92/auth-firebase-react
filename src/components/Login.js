import React, { useRef, useState } from 'react';
import {Button, Form, Card, Alert} from 'react-bootstrap';
import {useAuth} from '../components/contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom';

export default function Login() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const {signIn} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await signIn(emailRef.current.value, passwordRef.current.value)
            history.push('/')
            setLoading(false)
        } catch(exception) {
            setError('Failed to Sign in ' + exception.message)
            setLoading(false)
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" required ref={emailRef}/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" required ref={passwordRef}/>
                        </Form.Group>
                        <Button className="w-100" type="submit" disabled={loading}>Sign In</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an Account ? <Link to="/signup">Sign up</Link>
            </div>
        </>
    )
}