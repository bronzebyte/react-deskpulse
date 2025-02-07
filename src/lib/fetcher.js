import Cookies from "js-cookie";

const fetcher = async (url) => {
    const token = Cookies.get("token"); // Get token from localStorage
    const headers = {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    };
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
      headers,
    });
  
    if (!res.ok) {
      throw new Error('Failed to fetch');
    }
  
    return res.json();
  };
  
  export default fetcher;
  