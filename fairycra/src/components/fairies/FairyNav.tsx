import React from 'react'; 

const FairyNav: React.FC = () => {
    return (
        <nav className="flex items-center justify-between flex-wrap p-6 bg-gray h-auto">
            <div className="flex items-center flex-shrink-0 mr-6">
                {/* ICON HERE */}
                <p className="font-semibold tracking-tight text-white text-lg">BlissFairy</p>
            </div>
        </nav>
    )
}

export default FairyNav; 