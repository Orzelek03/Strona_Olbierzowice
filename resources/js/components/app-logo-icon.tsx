import type { SVGAttributes } from "react";

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M32 7 L35.5 12.5 L34.5 24.5 L46.5 23.5 L52 27 L46.5 30.5 L34.5 29.5 L35.5 51.5 L32 57 L28.5 51.5 L29.5 29.5 L17.5 30.5 L12 27 L17.5 23.5 L29.5 24.5 L28.5 12.5 Z"
                fill="currentColor"
            />
        </svg>
    );
}
