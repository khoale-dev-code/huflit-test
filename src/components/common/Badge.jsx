export const Badge = ({ children, variant = 'default', size = 'sm' }) => {
    const variants = {
        default: 'bg-indigo-100 text-indigo-800',
        success: 'bg-green-100 text-green-800',
        warning: 'bg-amber-100 text-amber-800',
        gray: 'bg-gray-100 text-gray-600',
    };

    const sizes = {
        sm: 'text-xs px-2.5 py-1',
        md: 'text-sm px-3.5 py-1.5',
    };

    return (
        <span className={`rounded-full font-medium inline-flex items-center ${variants[variant]} ${sizes[size]}`}>
            {children}
        </span>
    );
};