import { fetchUserNumber } from '@/apis/admin';
import { useQuery, QueryClient, QueryClientProvider  } from '@tanstack/react-query';

const queryClient = new QueryClient(); // Tạo một instance của QueryClient

function Setting(){
    return (
        <QueryClientProvider client={queryClient}> {/* Bọc component trong QueryClientProvider và cung cấp QueryClient */}
          <SettingContent />
        </QueryClientProvider>
      );
}
function SettingContent(){
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
      <h1>abc</h1>
    </div>
  );
};

export default Setting;
