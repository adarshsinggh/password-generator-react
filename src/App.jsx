import { useCallback, useEffect, useState, useRef } from 'react'
import './App.css'

function App() {

  const [length, setLength] = useState(8)

  const [numberAllowed , setNumberAllowed] = useState(false)

  const [charAllowed, setCharAllowed] = useState(false)

  const [password , setPassword] = useState("")

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
      let pass = ""
      let str  = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

      if(charAllowed) str += "!@#$%^&*(){}[]"

      if(numberAllowed) str += "123456789"

      for (let index = 1; index <= length; index++) {
        let char = Math.floor(Math.random() * str.length + 1)
        pass += str.charAt(char)
      }
      setPassword(pass)
    },
    [length,numberAllowed,charAllowed,setPassword])

    const copyPasswordToClipboard = useCallback(() => {
      passwordRef.current?.select()
      window.navigator.clipboard.writeText(password)
    },[password])

    useEffect(() => {
      passwordGenerator()
    },[length,numberAllowed,charAllowed, passwordGenerator])


  return (
    <>
    <div className='w-screen max-w-xl mx-auto shadow-md rounded-lg px-3 py-8 text-orange-500 bg-gray-700
    '> 
    <h1 className='text-white text-center my-3'> Password Generator</h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input type='text' value={password} className='outline-none w-full py-1 px-3' placeholder='Password' readOnly style={{backgroundColor: "#fff"}} ref={passwordRef}></input>
      <button className='outline-none bg-blue-700 text-white p-3 py-0.5 shrink-0'onClick={copyPasswordToClipboard} > Copy</button>
    </div>
    <div className='flex text-sm  gap-x-2'></div>
    <div className='flex items-center gap-x-3'>
      <input type='range' min={6} max={100} value={length} className='cursor-pointer' onChange={(e) => {setLength(e.target.value)}}></input>
      <label>Length: {length}</label>
      <div className='flex items-center gap-x-3'>
      <input type='checkbox' defaultChecked={numberAllowed} id='numberInput' onChange={() => setNumberAllowed((prev) => !prev)}></input>
      <label> Numbers</label>
    </div>
    <div className='flex items-center gap-x-3'>
      <input type='checkbox' defaultChecked={charAllowed} id='charInput' onChange={() => setCharAllowed((prev) => !prev)}></input>
      <label> Characters</label>
    </div>
    </div>
    
    </div>
    </>
  )
}

export default App
