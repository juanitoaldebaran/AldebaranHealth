const LoadingSpinner: React.FC = () => {
     return (
         <div className="flex items-center justify-center">
            <div className="border border-b-2 border-white h-6 w-6 rounded-full animate-spin"></div>
        </div>
    )
}

export default LoadingSpinner;