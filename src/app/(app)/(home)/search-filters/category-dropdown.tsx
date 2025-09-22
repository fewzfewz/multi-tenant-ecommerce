'use client'

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { useDropdownPosition } from "./use-dropdown-position";
import { SubcategoryMenu } from "./subcategory-menu";
import Link from "next/link";
import { CategoriesGetManyOutput } from "@/modules/categories/types";

interface Props{
    category: CategoriesGetManyOutput[1];
    isActive?: boolean;
    isNavigationHovered?: boolean;
};

export const CategoryDropdown=({category, isActive, isNavigationHovered}: Props)=> {
    const [isOpen,setIsOpen]=useState(false)
    const dropdownRef= useRef<HTMLDivElement>(null)
    const { getDropdownPosition } = useDropdownPosition(dropdownRef as React.RefObject<HTMLDivElement>);



    const onMouseEnter= ()=>{
        if(category.subcategories?.length >0){
            setIsOpen(true)
        }
    }
    const onMouseLeave= ()=>{
        setIsOpen(false)
    }
    const dropdownPosition=getDropdownPosition()
    // const toggleDropdown=()=>{
    //     if(category.subcategories?.docs?.length){
    //         setIsOpen(!isOpen)
    //     }
    // }
    return (
        <div
  className="relative inline-block"
  ref={dropdownRef}
  onMouseEnter={onMouseEnter}
  onMouseLeave={onMouseLeave}
  // onClick={toggleDropdown}
>
  <Button
    variant="elevated"
    className={cn(
      'h-11 px-4 rounded-full text-black transition-colors duration-200',
      'bg-transparent border-transparent hover:bg-white hover:border-primary',
      isActive && !isNavigationHovered && 'bg-white border-primary',
      isOpen && 'bg-white border-primary shadow-[4px_4px_0px_4px_rgba(0,0,0,1)] -translate-x-[4px] -translate-y-[-4px]'
    )}
  >
    <Link 
      href={`/${category.slug === 'all' ? '' : category.slug}`}
    >
    {category.name}
    </Link>
  </Button>

  {category.subcategories && Array.isArray(category.subcategories) && category.subcategories.length > 0 && (
  <SubcategoryMenu
    category={category}
    isOpen={isOpen}
    position={dropdownPosition}
  />
)}
</div>

)

}