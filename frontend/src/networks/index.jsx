import axios from 'axios'; // Import Axios
import { toast } from 'react-toastify'; // Assuming toast is imported from 'react-toastify'

// eslint-disable-next-line consistent-return
export default async function addExpenseAPI(Data) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/expense`,
      Data,
    );
    // console.log('Response Data: ', response.data);
    toast.success(response.data.message); // Display success toast
    return response.data; // Return response data if needed
  } catch (error) {
    // console.error('Error in AssignStudentDataApi:', error);
    toast.error('Failed to assign student data'); // Display error toast
  }
}
