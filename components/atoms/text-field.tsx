export default function TextField({
  label,
  classes,
  defaultValue,
}: {
  label: string
  classes: string[]
  defaultValue?: string
}) {
  const className = ['block', ...classes].join(' ')

  return (
    <label className={className}>
      <span className="text-gray-700 text-sm">{label}</span>
      <input
        type="password"
        className="mt-1 border-gray-300 block w-full rounded-md focus:border-indigo-600"
        value={defaultValue}
      />
    </label>
  )
}
