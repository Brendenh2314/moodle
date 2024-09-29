'use client'
import { Fugaz_One } from '@next/font/google';
import React, { useState } from 'react'
import Button from './Button';
import { useAuth } from '@/context/AuthContext';

const fugaz = Fugaz_One({
  weight: "400",
  variable: "--font-fugaz-one",
  subsets: ["latin"],
});

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [authenticating, setAuthenticating] = useState(false)

  const { signup, login } = useAuth()

  async function handleSubmit() {
    if (!email || !password || password.length < 6) {
      return
    }
    setAuthenticating(true)
    try {
      if (isRegister) {
        console.log('Signing up a new user')
        await signup(email, password)
      } else {
        console.log('Logging in an existing user')
        await login(email, password)
      }
    } catch (err) {
      console.log(err.message)
    } finally {
      setAuthenticating(false)
    }
  }

  return (
    <div className='flex flex-col flex-1 justify-center items-center gap-4'>
      <h3 className={'text-4xl sm:text-5xl md:text-6xl textGradient ' + fugaz.className}>{isRegister ? 'Register' : 'Log in'}</h3>
      <p>You're one step away!</p>
      <input value={email} onChange={(e) => {
        setEmail(e.target.value)
      }} className='w-full max-w-[400px] mx-auto px-4 duration-200 hover:border-pink-600 focus:border-pink-600 py-2 sm:py-3 border border-solid border-pink-400 rounded-full outline-none' 
      placeholder='Email' />
      <input value={password} onChange={(e) => {
        setPassword(e.target.value)
      }} className='w-full max-w-[400px] mx-auto px-4 duration-200 hover:border-pink-600 focus:border-pink-600 py-2 sm:py-3 border border-solid border-pink-400 rounded-full outline-none'
       placeholder='Password' type='password' />
      <div className='max-w-[400px] w-full mx-auto'>
        <Button clickHandler={handleSubmit} text={authenticating ? "Submitting" : 'Submit'} full />
      </div>
      <p className='text-center'>
       {isRegister ? 'Already have an account? ' : "Don't have an account "} <button onClick={() => setIsRegister(!isRegister)} className='text-pink-600'>{isRegister ? 'Sign in!' : 'Sign up now!'}</button>
      </p>
    </div>
  )
}
