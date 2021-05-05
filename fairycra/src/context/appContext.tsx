import React, { FC, ComponentProps } from 'react'; 

// CONTEXT
import AuthContextProvider from './providers/authContext'; 
// import FairyContextProvider from './providers/fairyContext'; 
import OrdersContextProvider from './providers/ordersContext'; 
import TwinContextProvider from './providers/twinContext'; 

const providers = [
    AuthContextProvider, 
    // FairyContextProvider, 
    OrdersContextProvider, 
    TwinContextProvider,
]; 

export const combineComponents = (...components: FC[]): FC => {
    return components.reduce((AccumulatedComponents, CurrentComponent) => {
        return ({ children }: ComponentProps<FC>): JSX.Element => {
            return (
                <AccumulatedComponents>
                    <CurrentComponent>{children}</CurrentComponent>
                </AccumulatedComponents>
            );
        };
    }, ({ children }) => <>{children}</> );
};

const AppContextProvider = combineComponents(...providers); 


export default AppContextProvider; 


