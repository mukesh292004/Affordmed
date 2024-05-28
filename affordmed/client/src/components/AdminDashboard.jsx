import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import 'tailwindcss/tailwind.css';

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [itemsPerPage,setitemsPerPage] =useState(5); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://hub.dummyapis.com/employee?noofRecords=1000', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setData(data);
          setFilteredData(data);
        }
      } catch (error) {
        console.error('Admins dashboard error:', error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = data.filter(item =>
      item.firstName.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.contactNumber.includes(search) ||
      item.id.toString().includes(search)||
      item.salary.toString().includes(search)
    );
    setFilteredData(filtered);
  }, [search, data]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);//
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = filteredData.slice(offset, offset + itemsPerPage);

  return (
    <div className="p-4 justify-center  ">
      <input
        type="text"
        placeholder="Search..."
        className="mb-4 p-2 border border-gray-300 rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="overflow-x-auto">
        <table className="table-auto min-w-full  border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left border">ID</th>
              <th className="px-4 py-2 text-left border">Name</th>
              <th className="px-4 py-2 text-left border">Email</th>
              <th className="px-4 py-2 text-left border">Contact</th>
              <th className="px-4 py-2 text-left border">Salary</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-400 items-center">
                <td className="px-4 py-2 border">{item.id}</td>
                <td className="px-4 py-2 border">{item.firstName}</td>
                <td className="px-4 py-2 border">{item.email}</td>
                <td className="px-4 py-2 border">{item.contactNumber}</td>
                <td className="px-4 py-2 border">{item.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-row justify-between mt-4">
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          pageCount={Math.ceil(filteredData.length / itemsPerPage)}
          marginPagesDisplayed={1}
          pageRangeDisplayed={1}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
          pageClassName={'inline-block px-3 py-1 border border-gray-500 rounded mr-1'}
          previousClassName={'inline-block px-3 py-1 border bg-blue-500 border-gray-300 rounded'}
          nextClassName={'inline-block px-3 py-1 bg-blue-500 border border-gray-300 rounded'}
          activeLinkClassName={' text-lg text-green-800 '}
        />
        
      <select className="h-10 leading-tight focus:outline-none focus:shadow-outline"
        id="itemsPerPage"
        name='itemsPerPage'
        value={itemsPerPage}
        onChange={(e) => setitemsPerPage(e.target.value)}
        required
      >
        <option value="5">5</option>
        <option value="10">10</option>
      </select>
      </div>
      
    </div>
  );
};

export default AdminDashboard;
