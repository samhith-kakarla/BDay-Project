import React from 'react'; 

// COMPONENTS
import { Disclosure } from '@headlessui/react'

const FairyNav: React.FC = () => {
    return (
        <Disclosure as="nav" className="bg-gray">
            <>
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between h-16">
                        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex-shrink-0 flex items-center">
                                {/* CENTER LOGO ICON - MOBILE */}
                                <img
                                    className="block lg:hidden h-8 w-auto"
                                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                                    alt="Workflow"
                                />
                                {/* FULL LOGO - DESKTOP */}
                                <img
                                    className="hidden lg:block h-8 w-auto"
                                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                                    alt="Workflow"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </Disclosure>
    )
}

export default FairyNav; 