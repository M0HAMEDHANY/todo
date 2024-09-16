
type AlertType = 'success' | 'info' | 'warning' | 'error'

type AlertProps = {
    type: AlertType
    message: string
    onClose: () => void
}

export function AlertComponent({ type, message, onClose }: AlertProps) {
    const getAlertClasses = () => {
        switch (type) {
            case 'success':
                return 'bg-green-100 dark:bg-green-900 border-green-500 dark:border-green-700 text-green-900 dark:text-green-100'
            case 'info':
                return 'bg-blue-100 dark:bg-blue-900 border-blue-500 dark:border-blue-700 text-blue-900 dark:text-blue-100'
            case 'warning':
                return 'bg-yellow-100 dark:bg-yellow-900 border-yellow-500 dark:border-yellow-700 text-yellow-900 dark:text-yellow-100'
            case 'error':
                return 'bg-red-100 dark:bg-red-900 border-red-500 dark:border-red-700 text-red-900 dark:text-red-100'
        }
    }

    return (
        <div
            role="alert"
            className={`${getAlertClasses()} border-l-4 p-2 rounded-lg flex items-center justify-between transition duration-300 ease-in-out hover:bg-opacity-80 transform hover:scale-105 mb-4`}
        >
            <div className="flex items-center">
                <svg
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-5 w-5 flex-shrink-0 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    ></path>
                </svg>
                <p className="text-xs font-semibold">{message}</p>
            </div>
            <button onClick={onClose} className="text-sm font-semibold">×</button>
        </div>
    )
}