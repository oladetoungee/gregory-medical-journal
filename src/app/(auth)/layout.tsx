import Image from 'next/image';
import images from '@/constants/images';

export default function AuthLayout({ children }: {
    readonly children: React.ReactNode;
  }) {
    return (
      <div className="flex flex-col  items-center justify-center min-h-screen bg-primary dark:bg-primary">
       
       <div className="flex items-center gap-4 mb-4">
                            <Image
                                src={images.hall1}
                                alt="Gregory Medical Journal Logo"
                                className="h-8 w-8"
                                width={64}
                                height={64}
                            />
                            <h3 className="text-lg font-semibold text-white">Gregory Medical Journal</h3>
                        </div>
                         {children}
      </div>
    );
  }