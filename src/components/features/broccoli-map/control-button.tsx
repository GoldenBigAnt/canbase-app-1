"use client";

import { Button, ButtonGroup, ButtonIcon } from '@ui/button';
import { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';
import { ArrowDownLeft, ArrowUpRight, LucideIcon } from 'lucide-react-native';
import React from 'react';
import { PressableProps, StyleSheetProperties, View } from 'react-native';

const BroccoliMapControlButton = React.forwardRef<React.ElementRef<typeof Button>, PressableProps>(
  ({ className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        size="sm"
        variant="outline" 
        action="secondary"
        className={cn('bg-white data-[hover=true]:bg-white data-[active=true]:bg-white', className)}
        {...props}>
      </Button>
    )
  }
);
BroccoliMapControlButton.displayName = 'BroccoliMapControlButton';
export {
  BroccoliMapControlButton
}

export const CollapsibleBroccoliMapControlButton = ({ 
  children, 
  className, 
  size,
  collapsedIcon: CollapsedIcon = ArrowUpRight,
  expandedIcon: ExpandedIcon = ArrowDownLeft,
  horizontal = false,
  ...buttonProps 
}: Omit<PressableProps, 'size'> & {
  children: ReactNode,
  size?: string;
  collapsedIcon?: LucideIcon;
  expandedIcon?: LucideIcon;
  horizontal?: boolean;
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <BroccoliMapControlButton 
      {...buttonProps}
      className={cn(className, {
        'h-10 w-10': isCollapsed,
      })}
      style={isCollapsed ? {} : {
        height: undefined
      }}
      onPress={() => setIsCollapsed(!isCollapsed)}>
      {isCollapsed 
        ? <ButtonIcon as={CollapsedIcon} />
        : <View>{children}</View>}
    </BroccoliMapControlButton>
  )
}
