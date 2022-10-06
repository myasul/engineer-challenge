import { Feather } from './icons/Feather'

export const Navbar = () => (
    <div className="relative bg-feather-primary">
        <div className="w-full md:px-4 px-16">
            <div className="flex justify-between items-center py-6 md:space-x-10">
                <div className="flex justify-start lg:w-0 lg:flex-1">
                    <a href="/">
                        <span className="sr-only">Workflow</span>
                        <div className="h-6 w-auto sm:h-8">
                            <Feather />
                        </div>
                    </a>
                </div>
                <div className="hidden sm:block">
                    <button type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-whitehover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500" aria-expanded="false">
                        <span className="sr-only">Open menu</span>
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
                <nav className="sm:hidden flex items-center justify-end lg:w-0">
                    <a href="/" className="text-base font-medium text-white hover:text-gray-900"> Policies </a>
                    <a href="/" className="ml-8 whitespace-nowrap text-base font-medium text-white hover:text-gray-900"> Sign in </a>
                    <a href="/" className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gray-600 hover:bg-gray-700"> Sign up </a>
                </nav> 
            </div>
        </div>
    </div>
)
