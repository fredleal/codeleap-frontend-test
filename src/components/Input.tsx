interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function Input({ label, id, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && <label htmlFor={id} className="text-base">{label}</label>}
      <input
        id={id}
        className={`w-full h-8 px-3 border border-[#777] rounded-lg text-sm placeholder:text-[#ccc] focus:outline-none focus:border-[#7695EC] ${className || ''}`}
        {...props}
      />
    </div>
  )
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
}

export function Textarea({ label, id, className, ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && <label htmlFor={id} className="text-base">{label}</label>}
      <textarea
        id={id}
        className={`w-full h-[74px] px-3 py-2 border border-[#777] rounded-lg text-sm placeholder:text-[#ccc] resize-none focus:outline-none focus:border-[#7695EC] ${className || ''}`}
        {...props}
      />
    </div>
  )
}
