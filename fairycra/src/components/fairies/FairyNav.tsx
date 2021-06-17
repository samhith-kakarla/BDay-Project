import React from 'react'; 

const FairyNav: React.FC = () => {
    return (
        <nav className="flex items-center justify-between flex-wrap p-5 bg-gray h-16">
            <div className="flex items-center flex-shrink-0 mr-6">
                {/* ICON HERE */}
                <p className="font-semibold tracking-tight text-white text-base ml-8">BlissFairy</p>
            </div>
        </nav>
    )
}

export default FairyNav; 