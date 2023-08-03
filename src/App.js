import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CreateContainer, Header, MainContainer } from './components';
import { useStateValue } from './context/StateProvider';
import { getAllFoodItems } from './utils/firebaseFunctions';

const App = () => {
    // Define the routes for the application
    const mainRoute = '/*';
    const createItemRoute = '/createItem';

    // Destructure state and dispatch from the state value
    const [state, dispatch] = useStateValue();

    // Define the fetchData function to fetch food items
    const fetchData = async () => {
        try {
            const data = await getAllFoodItems(); // Fetch food items from your API
            dispatch({ type: "SET_FOOD_ITEMS", foodItems: data }); // Dispatch the data to the state
        } catch (error) {
            console.error('Error fetching food items:', error);
        }
    };

    // useEffect hook to run fetchData on component mount
    useEffect(() => {
        fetchData(); // Fetch the data and update state on component mount
    }, []); // Empty dependency array ensures this effect runs only once on mount

    return (
        <AnimatePresence exitBeforeEnter>
            {/* App container */}
            <div className='w-screen h-auto flex flex-col bg-primary'>
                {/* Header */}
                <Header />

                {/* Main content */}
                <main className='mt-16 md:mt-20 px-4 md:px-16 py-4 w-full'>
                    {/* Define application routes */}
                    <Routes>
                        {/* MainContainer is rendered for the mainRoute */}
                        <Route path={mainRoute} element={<MainContainer />} />

                        {/* CreateContainer is rendered for the createItemRoute */}
                        <Route path={createItemRoute} element={<CreateContainer />} />
                    </Routes>
                </main>
            </div>
        </AnimatePresence>
    );
};

export default App;