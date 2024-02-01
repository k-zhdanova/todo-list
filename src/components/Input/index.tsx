import { StyledInput } from "./index.style"

interface InputProps {
  onSubmit: (value: string) => void;
}

export const Input = ({onSubmit}: InputProps) => {
  return (
    <StyledInput 
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          onSubmit(event.currentTarget.value)
          event.currentTarget.value = ''
        }
      }} 
      type="text" 
      placeholder="What needs to be done?" 
    />
  )
}