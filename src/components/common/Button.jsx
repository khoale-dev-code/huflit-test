export const Button = ({ 
    variant = 'primary', 
    size = 'md', 
    children, 
    icon: Icon, 
    fullWidth, 
    disabled, 
    className = '',
    ...props 
}) => {
    const variants = {
        primary: 'bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 focus:ring-indigo-500',
        secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 active:bg-gray-300 focus:ring-gray-400 border border-gray-200',
        danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-500',
        success: 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus:ring-green-500',
        ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus:ring-gray-300 border border-transparent',
    };

    const sizes = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-2.5 text-base',
        lg: 'px-6 py-3 text-lg',
    };

    return (
        <button
            className={`
                inline-flex items-center justify-center gap-2 font-semibold
                transition-all rounded-xl disabled:opacity-50 disabled:cursor-not-allowed
                focus:outline-none focus:ring-4 focus:ring-opacity-50
                ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}
            `}
            disabled={disabled}
            {...props}
        >
            {Icon && <Icon className="w-5 h-5" />}
            {children}
        </button>
    );
};