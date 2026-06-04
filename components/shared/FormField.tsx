type FormFieldProps = {
  label: string
  children: React.ReactNode
}

export function FormField({ label, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-text-primary text-[13px] font-medium">{label}</label>
      {children}
    </div>
  )
}
