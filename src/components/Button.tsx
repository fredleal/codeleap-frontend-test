interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'success' | 'outline'
}

export function Button({ variant = 'primary', children, disabled, className, ...props }: ButtonProps) {
  const base = 'px-8 h-8 rounded-lg font-bold text-base transition-colors'
  
  const variants = {
    primary: 'bg-[#7695EC] text-white hover:bg-[#5a7bd4] disabled:opacity-50',
    danger: 'bg-[#FF5151] text-white hover:bg-[#e64545] disabled:opacity-50',
    success: 'bg-[#47B960] text-white hover:bg-[#3ea354] disabled:opacity-50',
    outline: 'bg-white text-black border border-[#999] hover:bg-gray-50',
  }

  return (
    <button 
      className={`${base} ${variants[variant]} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${className || ''}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
