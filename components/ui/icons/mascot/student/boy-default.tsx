import { Color } from "@/constants/theme/color";

interface StudentBoyDefaultSvgProps {
    size: number
    flip?: boolean
}

export default function StudentBoyDefaultSvg({ size, flip = false }: Readonly<StudentBoyDefaultSvgProps>) {
    return (
        <svg width={size} height={size} viewBox="0 0 155 147" fill="none" className={flip ? "transform scale-x-[-1]" : ""}>
            <rect x="26" y="57" width="102" height="90" rx="30" fill={Color["secondary-4"]} />
            <path d="M71 130C71 127.791 72.7909 126 75 126H81H87C89.2091 126 91 127.791 91 130V132C91 134.209 89.2091 136 87 136H81H75C72.7909 136 71 134.209 71 132V130Z" fill={Color["system-white"]} />
            <rect opacity="0.35" x="77" y="114" width="8" height="10" rx="4" fill={Color["secondary-3"]} />
            <path opacity="0.35" d="M38 126.5C38 125.119 39.1193 124 40.5 124C41.8807 124 43 125.119 43 126.5C43 127.881 41.8807 129 40.5 129C39.1193 129 38 127.881 38 126.5Z" fill={Color["secondary-3"]} />
            <rect opacity="0.35" x="43" y="130" width="4" height="4" rx="2" fill={Color["secondary-3"]} />
            <rect x="90" y="101" width="28" height="30" rx="14" fill={Color["system-white"]} />
            <rect x="90" y="97" width="28" height="24" rx="7" fill={Color["system-white"]} />
            <mask id="mask0_512_272" maskUnits="userSpaceOnUse" x="98" y="109" width="13" height="26">
                <rect x="98" y="109" width="13" height="26" rx="6.5" fill={Color["system-white"]} />
            </mask>
            <g mask="url(#mask0_512_272)">
                <rect x="90" y="94" width="28" height="35.4545" rx="14" fill={Color["title-1"]} />
            </g>
            <rect x="44" y="101" width="28" height="30" rx="14" fill={Color["system-white"]} />
            <rect x="44" y="97" width="28" height="23" rx="7" fill={Color["system-white"]} />
            <mask id="mask1_512_272" maskUnits="userSpaceOnUse" x="52" y="109" width="13" height="26">
                <rect x="52" y="109" width="13" height="26" rx="6.5" fill={Color["system-white"]} />
            </mask>
            <g mask="url(#mask1_512_272)">
                <rect x="44" y="94" width="28" height="35.4545" rx="14" fill={Color["title-1"]} />
            </g>
            <circle cx="58.0001" cy="79" r="20" fill={Color["title-1"]} />
            <rect x="16.0001" y="29" width="122" height="60" rx="20" fill={Color["title-1"]} />
            <ellipse cx="116.503" cy="79.007" rx="34.5942" ry="14.6495" transform="rotate(-124.595 116.503 79.007)" fill={Color["title-1"]} />
            <ellipse cx="34.5942" cy="14.6495" rx="34.5942" ry="14.6495" transform="matrix(0.567771 -0.823186 -0.823186 -0.567771 26.1188 122.59)" fill={Color["title-1"]} />
            <ellipse cx="121.662" cy="68.5001" rx="34.5942" ry="10.8019" transform="rotate(-136.978 121.662 68.5001)" fill={Color["title-1"]} />
            <ellipse cx="34.5942" cy="10.8019" rx="34.5942" ry="10.8019" transform="matrix(0.731091 -0.68228 -0.68228 -0.731091 14.7399 99.0002)" fill={Color["title-1"]} />
            <circle cx="91" cy="82" r="20" fill={Color["title-1"]} />
            <ellipse cx="103" cy="60" rx="30" ry="27" fill={Color["title-1"]} />
            <ellipse cx="35.1025" cy="86.5114" rx="15.5" ry="9" transform="rotate(-47.5494 35.1025 86.5114)" fill={Color["title-1"]} />
            <ellipse cx="59.544" cy="30.8434" rx="26" ry="8" transform="rotate(29.7383 59.544 30.8434)" fill={Color["title-1"]} />
            <ellipse cx="76.588" cy="25.8837" rx="34.5942" ry="10.8019" transform="rotate(151.763 76.588 25.8837)" fill={Color["title-1"]} />
        </svg>
    )
}