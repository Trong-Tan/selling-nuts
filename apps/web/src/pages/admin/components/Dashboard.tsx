import { fetchUserNumber } from '@/apis/admin';
import { useQuery, QueryClient, QueryClientProvider  } from '@tanstack/react-query';

const queryClient = new QueryClient(); // Tạo một instance của QueryClient

function Dashboard(){
    return (
        <QueryClientProvider client={queryClient}> {/* Bọc component trong QueryClientProvider và cung cấp QueryClient */}
          <DashboardContent />
        </QueryClientProvider>
      );
}
function DashboardContent(){
 const { data: UsersQuery, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUserNumber,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching user count</p>;
  }

  const userCount = UsersQuery ; // Nếu không có dữ liệu, gán về 0
  console.log(userCount.data);
  
  return (
    <div className="p-6 text-white h-full">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className=" p-4 shadow border-2 border-indigo-400 rounded-lg">
          <h2 className="font-semibold text-lg">Total Users</h2>
          <p className="text-2xl font-bold">{userCount.data}</p>
        </div>

        <div className=" p-4 shadow border-2 border-indigo-400 rounded-lg">
          <h2 className="font-semibold text-lg">Active Users</h2>
          <p className="text-2xl font-bold">900</p>
        </div>

        <div className=" p-4 shadow border-2 border-indigo-400 rounded-lg">
          <h2 className="font-semibold text-lg">Pending Orders</h2>
          <p className="text-2xl font-bold">45</p>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
        <table className="min-w-full  shadow border-2 border-indigo-400">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">User</th>
              <th className="py-2 px-4 border-b">Action</th>
              <th className="py-2 px-4 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b">John Doe</td>
              <td className="py-2 px-4 border-b">Created new post</td>
              <td className="py-2 px-4 border-b">2024-09-19</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">Jane Smith</td>
              <td className="py-2 px-4 border-b">Updated profile</td>
              <td className="py-2 px-4 border-b">2024-09-18</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
