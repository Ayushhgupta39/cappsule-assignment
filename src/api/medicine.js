import axios from "axios";

export async function fetchMedicines(query) {
  const encodedQuery = encodeURIComponent(query);
  
  try {
    const response = await axios.get(
      `https://backend.cappsule.co.in/api/v1/new_search?q=${encodedQuery}&pharmacyIds=1,2,3`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
