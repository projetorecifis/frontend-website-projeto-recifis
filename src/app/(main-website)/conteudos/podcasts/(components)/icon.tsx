import { SVGProps } from "react";

export function BaselinePlayCircle(props: SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        {...props}
      >
        <path
          fill="currentColor"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2M9.5 16.5v-9l7 4.5z"
        ></path>
      </svg>
    )
  }

  export function PlaySkipForwardSharp(props: SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width="1em"
        height="1em"
        {...props}
      >
        <path
          fill="currentColor"
          d="M368.53 64v163.52L96 64v384l272.53-163.52V448H416V64z"
        ></path>
      </svg>
    )
  }

  export function PlaySkipBackSharp(props: SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width="1em"
        height="1em"
        {...props}
      >
        <path
          fill="currentColor"
          d="M143.47 64v163.52L416 64v384L143.47 284.48V448H96V64z"
        ></path>
      </svg>
    )
  }
  
  
  