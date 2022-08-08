import { useRef } from 'react'
import './styles.css'

interface Props{
    todo:string
    setTodo: React.Dispatch<React.SetStateAction<string>>
    handleAdd: (e:React.SyntheticEvent) => void
}

export default function InputField({todo, setTodo, handleAdd} : Props) {
    const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form className="input" onSubmit={(e) => {
        handleAdd(e)
        inputRef.current?.blur();
    }}>
        <input
            ref={inputRef} 
            type="input" 
            placeholder="What is your Hyland task?" 
            className="input_box"
            value={todo}
            onChange={(e)=> setTodo(e.target.value)}
        />
        <button className="input_submit" type="submit">Add</button>
    </form>
  )
}
