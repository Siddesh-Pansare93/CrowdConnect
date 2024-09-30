import React, { useId } from 'react'

function Input({
    type = 'text',
    label,
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (

        <div className="form-group">
            {label &&
                <label
                    htmlFor={id}
                    className="form-label"
                >{label}
                </label>}
            <input
                type={type}
                id={id}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                {...props}
            >
            </input>
        </div>
    )
}

export default React.forwardRef(Input)