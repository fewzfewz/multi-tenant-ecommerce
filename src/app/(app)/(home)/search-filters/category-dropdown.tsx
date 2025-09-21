'use client'

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Category } from "@/payload-types"
import { useRef, useState } from "react";
import { useDropdownPosition } from "./use-dropdown-position";
import { SubcategoryMenu } from "./subcategory-menu";

interface Props{
    category: Category;
    isActive?: boolean;
    isNavigationHovered?: boolean;
};

export const CategoryDropdown=({category, isActive, isNavigationHovered}: Props)=> {
    const [isOpen,setIsOpen]=useState(false)
    const dropdownRef= useRef<HTMLDivElement>(null)
    const { getDropdownPosition } = useDropdownPosition(dropdownRef as React.RefObject<HTMLDivElement>);


    const onMouseEnter= ()=>{
        if(category.subcategories){
            setIsOpen(true)
        }
    }
    const onMouseLeave= ()=>{
        setIsOpen(false)
    }
    const dropdownPosition=getDropdownPosition()
    return (
        <div
  className="relative inline-block"
  ref={dropdownRef}
  onMouseEnter={onMouseEnter}
  onMouseLeave={onMouseLeave}
>
  <Button
    variant="elevated"
    className={cn(
      'h-11 px-4 rounded-full text-black transition-colors duration-200',
      'bg-transparent border-transparent hover:bg-white hover:border-primary',
      isActive && !isNavigationHovered && 'bg-white border-primary'
    )}
  >
    {category.name}
  </Button>

  {category.subcategories && Array.isArray(category.subcategories.docs) && category.subcategories.docs.length > 0 && (
    <SubcategoryMenu
      category={category}
      isOpen={isOpen}
      position={dropdownPosition}
    />
  )}
</div>

)

}