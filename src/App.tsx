import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthForm } from './components/AuthForm';
import { useAuthStore } from './stores/authStore';

const queryClient = new QueryClient();

function App() {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user) {
    return (
      <h2 className="min-h-screen flex items-center justify-center text-2xl">
        Добро пожаловать! 
      </h2> 
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex items-center justify-center">
        <AuthForm />
      </div>
    </QueryClientProvider>
  );
}

export default App;