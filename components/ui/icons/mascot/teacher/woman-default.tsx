import { Color } from "@/constants/theme/color";

interface TeacherWomanDefaultSvgProps {
    size: number
    flip?: boolean
}

export default function TeacherWomanDefaultSvg({ size, flip }: Readonly<TeacherWomanDefaultSvgProps>) {
    return (
        <svg width={size} height={size} viewBox="0 0 137 147" fill="none" className={flip ? "transform scale-x-[-1]" : ""}>
            <rect y="53" width="136" height="94" rx="20" fill={Color["title-1"]} />
            <rect y="47" width="136" height="60" rx="20" fill={Color["title-1"]} />
            <rect x="16.0001" y="57" width="102" height="90" rx="30" fill={Color["secondary-4"]} />
            <path d="M61.0001 130C61.0001 127.791 62.791 126 65.0001 126H71.0001H77.0001C79.2093 126 81.0001 127.791 81.0001 130V132C81.0001 134.209 79.2093 136 77.0001 136H71.0001H65.0001C62.791 136 61.0001 134.209 61.0001 132V130Z" fill={Color["system-white"]} />
            <rect opacity="0.35" x="67.0001" y="114" width="8" height="10" rx="4" fill={Color["secondary-3"]} />
            <rect x="80.0001" y="101" width="28" height="30" rx="14" fill={Color["system-white"]} />
            <rect x="80.0001" y="97" width="28" height="24" rx="7" fill={Color["system-white"]} />
            <mask id="mask0_512_278" maskUnits="userSpaceOnUse" x="89" y="111" width="11" height="16">
                <rect x="89.0001" y="111" width="10" height="16" rx="5" fill={Color["system-white"]} />
            </mask>
            <g mask="url(#mask0_512_278)">
                <rect x="80.0001" y="97.5264" width="28" height="29.8565" rx="14" fill={Color["title-1"]} />
            </g>
            <rect x="34.0001" y="101" width="28" height="30" rx="14" fill={Color["system-white"]} />
            <rect x="34.0001" y="97" width="28" height="23" rx="7" fill={Color["system-white"]} />
            <mask id="mask1_512_278" maskUnits="userSpaceOnUse" x="43" y="111" width="11" height="16">
                <rect x="43.0001" y="111" width="10" height="16" rx="5" fill={Color["system-white"]} />
            </mask>
            <g mask="url(#mask1_512_278)">
                <rect x="34.0001" y="97.5264" width="28" height="29.8565" rx="14" fill={Color["title-1"]} />
            </g>
            <rect x="6.00012" y="29" width="122" height="44" rx="20" fill={Color["title-1"]} />
            <ellipse cx="94.6424" cy="77.3157" rx="22.7155" ry="35.4669" transform="rotate(-48.7468 94.6424 77.3157)" fill={Color["title-1"]} />
            <ellipse cx="23.9335" cy="72.2421" rx="16.3501" ry="35.4669" transform="rotate(-166.955 23.9335 72.2421)" fill={Color["title-1"]} />
            <ellipse cx="93" cy="60" rx="30" ry="27" fill={Color["title-1"]} />
            <ellipse cx="49.544" cy="30.8435" rx="26" ry="8" transform="rotate(29.7383 49.544 30.8435)" fill={Color["title-1"]} />
            <ellipse cx="66.588" cy="25.8837" rx="34.5942" ry="10.8019" transform="rotate(151.763 66.588 25.8837)" fill={Color["title-1"]} />
            <circle cx="48" cy="118" r="16" stroke={Color["secondary-3"]} strokeWidth="4" />
            <rect x="65.5" y="114.5" width="11" height="2" fill={Color["secondary-3"]} stroke={Color["secondary-3"]} />
            <circle cx="94" cy="118" r="16" stroke={Color["secondary-3"]} strokeWidth="4" />
            <rect x="37" y="90.7432" width="20" height="5" rx="2.5" transform="rotate(-5 37 90.7432)" fill={Color["title-1"]} />
        </svg>
    )
}