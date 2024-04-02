export default function FormInput({
  name,
  type,
  value,
  placeholder,
  label,
  error,
  touched,
  onChange,
}) {
  return (
    <div className="relative">
      <label htmlFor={name} className="text-base font-medium text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <input
          className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          type={type}
          placeholder={placeholder}
          value={value}
          id={name}
          onChange={onChange}
          name={name}
        ></input>
        {touched?.[name] && error && (
          <p className="absolute -bottom-[20px] left-[50%] -translate-x-[50%] text-center text-red-500 w-full">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
