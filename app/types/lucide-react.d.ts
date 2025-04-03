declare module 'lucide-react' {
  import { FC, SVGProps } from 'react';
  
  export interface LucideProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
    strokeWidth?: number | string;
  }
  
  export const ArrowLeft: FC<LucideProps>;
  export const Play: FC<LucideProps>;
  export const Maximize2: FC<LucideProps>;
  export const ChevronLeft: FC<LucideProps>;
  export const ChevronRight: FC<LucideProps>;
  export const Clock: FC<LucideProps>;
  export const BookOpen: FC<LucideProps>;
  export const Code2: FC<LucideProps>;
  export const CheckCircle2: FC<LucideProps>;
} 