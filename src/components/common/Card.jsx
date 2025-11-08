export const Card = ({ children, className = '', elevated = false }) => (
    <div
        className={`
            bg-white rounded-2xl border border-gray-100
            ${elevated ? 'shadow-xl hover:shadow-2xl transition-shadow' : 'shadow-md'}
            ${className}
        `}
    >
        {children}
    </div>
);