import { Color } from "@/constants/theme/color";

interface StudentGirlDefaultSvg {
    size: number
    flip?: boolean
}

export default function StudentGirlDefaultSvg({ size, flip = false }: Readonly<StudentGirlDefaultSvg>) {
    return (
        <svg width={size} height={size} viewBox="0 0 122 147" fill="none" className={flip ? "transform scale-x-[-1]" : ""}>
            <rect y="29" width="122" height="118" rx="20" fill={Color["title-1"]} />
            <rect x="10.0001" y="57" width="102" height="90" rx="30" fill={Color["secondary-4"]} />
            <path d="M55.0001 130C55.0001 127.791 56.791 126 59.0001 126H65.0001H71.0001C73.2093 126 75.0001 127.791 75.0001 130V132C75.0001 134.209 73.2093 136 71.0001 136H65.0001H59.0001C56.791 136 55.0001 134.209 55.0001 132V130Z" fill={Color["system-white"]} />
            <rect opacity="0.35" x="61.0001" y="114" width="8" height="10" rx="4" fill={Color["secondary-3"]} />
            <rect x="74.0001" y="101" width="28" height="30" rx="14" fill={Color["system-white"]} />
            <rect x="74.0001" y="97" width="28" height="24" rx="7" fill={Color["system-white"]} />
            <mask id="mask0_512_275" maskUnits="userSpaceOnUse" x="82" y="109" width="14" height="26">
                <rect x="82.0001" y="109" width="13" height="26" rx="6.5" fill={Color["system-white"]} />
            </mask>
            <g mask="url(#mask0_512_275)">
                <rect x="74.0001" y="94" width="28" height="35.4545" rx="14" fill={Color["title-1"]} />
            </g>
            <rect x="28.0001" y="101" width="28" height="30" rx="14" fill={Color["system-white"]} />
            <rect x="28.0001" y="97" width="28" height="23" rx="7" fill={Color["system-white"]} />
            <rect x="28" y="97" width="28" height="17" rx="7" fill={Color["system-white"]} />
            <mask id="mask1_512_275" maskUnits="userSpaceOnUse" x="36" y="109" width="13" height="26">
                <rect x="36" y="109" width="13" height="26" rx="6.5" fill={Color["system-white"]} />
            </mask>
            <g mask="url(#mask1_512_275)">
                <rect x="28" y="94" width="28" height="35.4545" rx="14" fill={Color["title-1"]} />
            </g>
            <ellipse cx="10.4999" cy="87" rx="10.5" ry="20" fill={Color["title-1"]} />
            <ellipse cx="77.9999" cy="79" rx="15" ry="20" fill={Color["title-1"]} />
            <rect x="0.00012207" y="29" width="122" height="60" rx="20" fill={Color["title-1"]} />
            <circle cx="102" cy="88" r="20" fill={Color["title-1"]} />
            <ellipse cx="87" cy="60" rx="30" ry="27" fill={Color["title-1"]} />
            <ellipse cx="43.544" cy="30.8434" rx="26" ry="8" transform="rotate(29.7383 43.544 30.8434)" fill={Color["title-1"]} />
            <ellipse cx="60.588" cy="25.8837" rx="34.5942" ry="10.8019" transform="rotate(151.763 60.588 25.8837)" fill={Color["title-1"]} />
            <path d="M21.4656 106.418C18.0686 109.268 17.5113 105.385 14.6713 102C11.8312 98.6154 7.78403 97.0114 11.181 94.161C14.5779 91.3107 19.634 91.7438 22.474 95.1284C25.314 98.513 24.8625 103.567 21.4656 106.418Z" fill="#9751AF" />
            <path d="M39.4352 91.0341C42.8321 88.1838 38.8399 86.8952 35.9999 83.5106C33.1599 80.126 32.5475 75.9271 29.1506 78.7774C25.7536 81.6278 25.3022 86.6822 28.1422 90.0668C30.9822 93.4514 36.0382 93.8845 39.4352 91.0341Z" fill="#9751AF" />
            <circle cx="24.9999" cy="92" r="6" fill={Color["primary-3"]} />
        </svg>
    )
}