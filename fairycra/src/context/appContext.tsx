import React, { FC, ComponentProps } from 'react'; 

// CONTEXT
import { AuthContext }from './providers/authContext'; 
import { FairyContext } from './providers/fairyContext'; 
import { OrdersContext } from './providers/ordersContext'; 
import { TwinContext } from './providers/twinContext'; 


const providers = [
    AuthContext.Provider, 
    FairyContext.Provider, 
    OrdersContext.Provider, 
    TwinContext.Provider, 
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


