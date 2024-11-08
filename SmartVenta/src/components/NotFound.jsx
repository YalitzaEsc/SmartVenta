// src/paginas/NotFound/NotFound.jsx
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <Card className="w-full max-w-md ">
        <CardContent className="pt-16 pb-16 flex flex-col items-center space-y-8">
          <div className="relative">
            <div className="text-[150px] font-bold text-primary select-none">
              404
            </div>
          </div>

          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold text-white">
              Página no encontrada
            </h1>
            <p className="text-gray-400 max-w-sm">
              She&apos;s got me feeling like a teen again.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
            <Button
              variant="outline"
              className="flex-1 "
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Regresar
            </Button>
            <Button
              className="flex-1  "
              onClick={() => navigate('/')}
            >
              <Home className="mr-2 h-4 w-4" />
              Inicio
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;