import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdAttachMoney, MdCloudUpload, MdDelete, MdFastfood, MdFoodBank } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { useStateValue } from "../context/StateProvider";
import { categories } from "../utils/data";
import Loader from "./Loader";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase.config";
import { saveItem, getAllFoodItems } from "../utils/firebaseFunctions";

const CreateContainer = () => {
    // State variables
    const navigate = useNavigate();
    const [{ user }, dispatch] = useStateValue();
    const [title, setTitle] = useState("");
    const [calories, setCalories] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState(null);
    const [imageAsset, setImgAsset] = useState(null);
    const [fields, setFields] = useState(false);
    const [alertStatus, setAlertStatus] = useState("danger");
    const [message, setMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Check user authentication on mount
    useEffect(() => {
        if (!user || (user && user.email !== "usamaarifsss4@gmail.com")) {
        navigate("/");
        }
    }, [user, navigate]);

    // Upload image handler
    const handleUploadImage = (e) => {
        // Set isLoading state to true to indicate that the image is being uploaded
        setIsLoading(true);
    
        // Get the selected image file from the input element
        const imageFile = e.target.files[0];
    
        // Create a storage reference using the Firebase Storage API.
        // The reference points to the location where the image will be stored.
        // The location is determined by the path, which is in the format 'images/<current timestamp>-<image name>'
        const storageRef = ref(storage, `images/${Date.now()}-${imageFile.name}`);
    
        // Upload the selected image to the storage reference.
        // `uploadBytesResumable` starts the upload process and returns an upload task.
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
    
        // Listen for changes in the upload state and handle the different events.
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // This callback is called multiple times during the upload process.
                // Calculate the upload progress as a percentage and update the UI if needed.
                const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // You can update the UI with the upload progress here if required.
            },
            (error) => {
                // If an error occurs during the upload process, handle it here.
                console.log(error);
        
                // Show an error message to the user
                setFields(true);
                setMessage('Error while uploading : Try Again');
                setAlertStatus('danger');
        
                // Clear the error message and reset the loading state after a delay of 3 seconds.
                setTimeout(() => {
                    setFields(false);
                    setIsLoading(false);
                }, 3000);
            },
            () => {
                // If the upload is successful, this callback is called when the upload is complete.
        
                // Get the download URL of the uploaded image to display or use later.
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    // Set the download URL of the image to the state variable `imageAsset`
                    setImgAsset(downloadURL);
            
                    // Reset the loading state and show a success message
                    setIsLoading(false);
                    setFields(true);
                    setMessage('Image uploaded successfully');
                    setAlertStatus('success');
            
                    // Clear the success message after a delay of 3 seconds.
                    setTimeout(() => {
                        setFields(false);
                    }, 3000);
                });
            },
        );
    };
  
    // Delete image handler
    const handleDeleteImage = () => {
        // Set isLoading state to true to indicate that the image deletion is in progress
        setIsLoading(true);
    
        // Create a storage reference to the image that needs to be deleted.
        // The reference points to the location of the image in Firebase Storage.
        const deleteRef = ref(storage, imageAsset);
    
        // Use the `deleteObject` function from Firebase Storage to delete the image.
        // This returns a Promise, so we can use `.then()` to handle the deletion result.
        deleteObject(deleteRef)
            .then(() => {
                // If the image deletion is successful, execute the following code block:
        
                // Reset the state variable `imageAsset` to `null`,
                // indicating that there is no image asset currently in use.
                setImgAsset(null);
        
                // Reset the isLoading state to false, as the deletion is complete.
                setIsLoading(false);
        
                // Show a success message to the user
                setFields(true);
                setMessage('Image deleted successfully');
                setAlertStatus('success');
        
                // Clear the success message after a delay of 3 seconds.
                setTimeout(() => {
                    setFields(false);
                }, 3000);
            })
            .catch((error) => {
                // If an error occurs during the deletion process, handle it here.
        
                // In a real application, you might want to display an error message to the user.
                // For simplicity, we won't add specific error handling in this commented code.
        
                console.error('Error deleting image:', error);
        
                // Reset the isLoading state to false, as the deletion attempt is complete (whether successful or not).
                setIsLoading(false);
            }
        );
    };
  
    // Save details handler
    const handleSaveDetails = () => {
        setIsLoading(true);

        try {
             // Check if any of the required fields are missing
            if((!title || !calories || !imageAsset || !price || !category)) {
                // Show an error message to the user
                setFields(true);
                setMessage('Please fill all the fields');
                setAlertStatus('danger');
        
                // Clear the error message and reset the loading state after a delay of 3 seconds.
                setTimeout(() => {
                    setFields(false);
                    setIsLoading(false);
                }, 3000);
            } else {
                // If all required fields are provided, prepare the data object to be saved
                const data = {
                    id : `${Date.now()}`,
                    title : title,
                    imageURL : imageAsset,
                    category : category,
                    calories : calories,
                    qty : 1,
                    price: price,
                };

                // If all required fields are provided, prepare the data object to be saved
                saveItem(data);

                 // Reset the loading state and show a success message
                 setIsLoading(false);
                 setFields(true);
                 setMessage('Data uploaded successfully');
                 setAlertStatus('success');

                // Reset all the fields after data is successfully uploaded
                // Call the clear data handler function
                clearData();

                 // Clear the success message after a delay of 3 seconds.
                 setTimeout(() => {
                    setFields(false);
                }, 3000);
            }
        } catch (error) {
            // If an error occurs during the upload process, handle it here.
            console.log(error);
        
            // Show an error message to the user
            setFields(true);
            setMessage('Error while uploading : Try Again');
            setAlertStatus('danger');
    
            // Clear the error message and reset the loading state after a delay of 3 seconds.
            setTimeout(() => {
                setFields(false);
                setIsLoading(false);
            }, 3000);
        };
        // Updata the state with food items on saving.
        fetchData();
    };

    // Function to clear data fields
    const clearData = () => {
        setTitle("");
        setImgAsset(null);
        setCalories("");
        setPrice("");
        setCategory("Select Category");
    };

    // Define the fetchData function to fetch food items
    const fetchData = async () => {
        try {
            const data = await getAllFoodItems(); // Fetch food items from your API
            dispatch({ type: "SET_FOOD_ITEMS", foodItems: data }); // Dispatch the data to the state
        } catch (error) {
            console.error('Error fetching food items:', error);
        }
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            <div className="w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col 
                items-center justify-center gap-4"
            >
                {fields && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`w-full p-2 rounded-lg text-center text-lg font-semibold 
                            ${ alertStatus === "danger" ? "bg-red-400 text-red-900" 
                                : "bg-emerald-400 text-emerald-900"
                            }`}
                    >
                        {message}
                    </motion.p>
                )}
                {/* Title */}
                <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
                    <MdFastfood className="text-xl text-gray-700" />
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Give me a title..."
                        className="w-full h-full text-lg font-semibold bg-transparent outline-none 
                            border-none placeholder:text-gray-400 text-textColor"
                    />
                </div>
                {/* Category */}
                <div className="w-full">
                    <label className="w-full h-full text-lg font-semibold text-gray-400"
                    >
                        Category
                    </label>
                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        className="mt-2 outline-none w-full text-base border-b-2 border-gray-200 rounded-md cursor-pointer"
                    >
                        {categories.map((category) => (
                            <option 
                                key={category.id}
                                className="text-base broder-0 outline-none capitalize
                                bg-white text-headingColor"
                            >
                                {category.urlParamName}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Image Upload */}
                <div className="w-full h-225 md:h-420 group flex justify-center items-center flex-col border-2 
                    border-dotted border-gray-300 cursor-pointer rounded-lg"
                >
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <>
                            {!imageAsset ? (
                                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                                    <MdCloudUpload className="text-3xl text-gray-500 hover:text-gray-700" />
                                    <p className="text-gray-500 hover:text-gray-700"> Click here to upload</p>
                                </div>
                                <input 
                                    type="file" 
                                    name="uploadImage" 
                                    accept="image/*" 
                                    onChange={(e) => handleUploadImage(e)} 
                                    className="hidden"
                                />
                                </label>
                            ) : (
                                <>
                                <div className="relative h-full">
                                    <img src={imageAsset} alt="uploaded image" className="w-full h-full object-cover" />
                                    <button
                                    type="button"
                                    onClick={handleDeleteImage}
                                    className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl 
                                        cursor-pointer outline-none hover:shadow-md duration-500 transition-all 
                                        ease-in-out"
                                    >
                                    <MdDelete className="text-white" />
                                    </button>
                                </div>
                                </>
                            )}
                        </>
                    )}
                </div>
                {/* Calories and Price */} 
                <div className="w-full flex flex-col md:flex-row items-center gap-3">
                    <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
                        <MdFoodBank className="text-2xl text-gray-700" />
                        <input
                        type="text"
                        required
                        value={calories}
                        onChange={(e) => setCalories(e.target.value)}
                        placeholder="Calories"
                        className="w-full h-full text-lg bg-transparent outline-none border-none 
                            placeholder:text-gray-400 text-textColor"
                        />
                    </div>
                    <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
                        <MdAttachMoney className="text-2xl text-gray-700" />
                        <input
                        type="text"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Price"
                        className="w-full h-full text-lg bg-transparent outline-none border-none 
                            placeholder:text-gray-400 text-textColor"
                        />
                    </div>
                </div>
                {/* Save Button */}
                <div className="flex items-center w-full">
                    <button
                        type="button"
                        onClick={handleSaveDetails}
                        className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none 
                            bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateContainer;