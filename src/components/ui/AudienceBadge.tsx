'use client';

import { Building2, GraduationCap } from 'lucide-react';
import { DESIGN_SYSTEM } from '@/styles/design-system';

interface AudienceBadgeProps {
  type: 'enterprise' | 'student';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function AudienceBadge({ type, size = 'medium', className = '' }: AudienceBadgeProps) {
  const isEnterprise = type === 'enterprise';
  
  const sizeClasses = {
    small: 'px-3 py-1 text-xs',
    medium: 'px-4 py-2 text-sm',
    large: 'px-6 py-3 text-base'
  };

  const iconSizes = {
    small: 'w-3 h-3',
    medium: 'w-4 h-4',
    large: 'w-5 h-5'
  };

  return (
    <div
      className={`
        inline-flex items-center gap-2 rounded-full font-medium
        ${isEnterprise 
          ? 'bg-blue-100 text-blue-700 border border-blue-200' 
          : 'bg-orange-100 text-orange-700 border border-orange-200'
        }
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {isEnterprise ? (
        <Building2 className={iconSizes[size]} />
      ) : (
        <GraduationCap className={iconSizes[size]} />
      )}
      <span>
        {isEnterprise ? '企業様へ' : '学生の方へ'}
      </span>
    </div>
  );
}