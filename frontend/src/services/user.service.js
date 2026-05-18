export const addUser = async (url) => {
  try {
    const response = await api.put(url, accountData);

    const data = response.data.result; 
    console.log("Dữ liệu từ Backend:", response.data);
    
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Lấy dữ liệu thất bại!');
  }
};