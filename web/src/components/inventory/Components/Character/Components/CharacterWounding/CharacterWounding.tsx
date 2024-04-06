import { Show } from "solid-js"
import { getInventoryContext } from "../../../../../provider"

import { createSignal, onCleanup } from 'solid-js';

function useMousePosition() {
    const [position, setPosition] = createSignal({ x: 0, y: 0 });

    const updatePosition = (e: any) => {
        setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updatePosition);

    onCleanup(() => {
        window.removeEventListener('mousemove', updatePosition);
    });

    return position;
}

export const CharacterWounding = () => {
    const {
        setHoveringWound,
        setWoundPosition
    } = getInventoryContext()
    const position = useMousePosition();

    return (
        <>
            <div
                class="character"
            >
                <svg
                    class="absolute"
                    width="20.46vh"
                    height="44.9vh"
                    viewBox="0 0 164 359"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        class="wound"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M88.7678 0.608831C86.2669 1.41774 84.5493 2.39153 82.8052 3.98953C80.6815 5.93584 79.4565 7.5783 78.2947 10.0378C77.4083 11.9142 75.8111 16.5609 75.8111 17.2628C75.8111 17.4607 75.4267 17.9452 74.9567 18.3395C73.6503 19.436 73.412 20.0767 73.4141 22.4864C73.4164 24.8987 73.7654 26.1946 74.8177 27.6945C75.2097 28.2535 75.6025 29.0537 75.6907 29.4729C75.7786 29.8921 76.1789 31.5498 76.5804 33.1567C77.6469 37.4266 78.0666 40.2037 78.2581 44.2576C78.4098 47.4676 78.4793 47.6378 78.4793 48.2729L78.3522 48.654H85.0847C89.1495 48.654 94.2591 48.6542 96.3901 48.654L99.9468 48.781V46.7486C99.9476 45.5959 99.8582 43.6301 99.9468 42.3026L100.525 39.8891L101.469 39.2187C103.044 38.1011 103.39 37.0323 105.445 26.9324C105.678 25.7899 105.861 22.6104 105.958 18.0405C106.089 11.8965 106.052 10.7032 105.687 9.28427C104.182 3.43671 99.3273 0.117745 92.3246 0.147723C90.9715 0.153567 89.6433 0.325815 88.7678 0.608831Z"
                        style="fill: rgba(255, 103, 103, 0);"
                        onMouseEnter={() => {
                            setHoveringWound(true)
                            setWoundPosition('right')
                        }}
                        onMouseLeave={() => setHoveringWound(false)}
                    />

                    <path
                        class="wound"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M76.945 50.8135C74.2441 54.8374 71.8639 58.5621 68.6882 61.2297C66.861 63.0583 64.5456 64.462 64.2423 64.6594C63.7075 65.0077 63.3531 65.5486 63.3531 86.508C61.7678 106.15 61.9842 107.558 62.1582 111.024C62.2634 113.12 62.1194 118.614 62.1582 122.457C62.2273 129.261 61.9903 129.777 61.3206 132.746C60.9426 134.423 60.5384 137.643 60.3044 138.97C59.3454 144.415 57.4303 147.899 54.3341 153.324C52.3769 156.754 51.6038 159.882 49.7612 165.9C48.3735 170.432 45.9158 180.588 44.8071 185.208C44.4626 186.643 43.5372 191.664 43.5372 192.322C43.5372 192.786 42.481 192.765 58.8436 192.619C68.1008 192.536 81.2194 192.47 87.9963 192.472C94.7732 192.474 103.476 192.396 107.337 192.297L113.986 192.068V190.569C113.168 187.136 111.864 182.785 111.624 180.254C111.355 177.416 111.255 175.681 112.132 169.711C112.409 167.824 112.748 164.153 112.894 161.708C113.04 159.263 113.35 155.363 113.656 153.197C114.155 149.666 115.064 148.878 114.291 138.97V127.665L115.308 123.6C116.394 119.5 117.537 116.397 118.991 113.184C120.895 108.978 121.892 105.972 122.675 102.895L123.31 99.5918L120.913 80.2382C118.974 69.3645 117.343 60.3532 117.288 60.2135C117.234 60.0737 116.823 59.7831 116.375 59.5676C115.928 59.3525 113.706 58.1884 111.438 56.9814C106.539 54.3733 103.154 52.1145 101.148 50.1148L99.6828 48.654L88.695 48.6621H78.3423L76.945 50.8135Z"
                        style="fill: rgba(255, 103, 103, 0);"
                        onMouseEnter={() => {
                            setWoundPosition('right')
                            setHoveringWound(true)
                        }}
                        onMouseLeave={() => setHoveringWound(false)}
                    />

                    <path
                        class="wound"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M60.0552 65.1913C52.3777 66.7208 45.7052 74.0294 43.9228 82.4432C43.4416 84.7139 43.8684 90.4433 44.3105 93.1833C44.8587 96.5815 44.5668 98.4267 42.5636 104.23C41.5865 107.06 40.424 110.947 39.9799 112.868C38.5882 118.886 38.3389 119.566 36.7277 121.737C35.9158 122.832 34.5332 124.527 33.6555 125.505C30.4353 129.093 28.8719 131.667 26.4787 137.318C24.8639 141.131 19.3484 150.895 13.8494 159.676C12.2306 162.261 10.141 165.747 9.20606 167.424C7.32479 170.798 3.70122 175.947 1.02628 179.047C0.0695148 180.156 0.351602 181.211 0.225337 181.651C-0.0320196 182.549 0.355834 186.647 0.606077 189.893L0.988133 190.924L3.02057 192.322C3.99867 193.001 5.43865 194.134 5.94219 194.481C7.04402 195.24 7.46651 194.862 7.97462 195.243C8.15424 195.174 8.3557 195.37 8.60975 195.497C8.99084 195.37 8.97385 195.359 9.28532 195.141C9.58765 194.929 10.4296 194.145 10.8958 193.273C11.5522 192.044 12.8012 190.941 12.8012 189.893C12.8012 189.093 12.3131 189.122 12.5471 188.765C12.8761 188.263 13.0705 187.672 12.8012 187.24C12.4506 186.679 12.3581 186.238 14.3255 182.794C15.5869 180.586 16.4075 179.51 16.612 176.189V173.013L17.131 170.748C20.7861 164.922 23.4546 161.507 30.7125 155.611C37.9593 149.724 40.2819 147.341 46.3368 138.97C48.8306 135.522 49.9279 134.171 50.9149 131.222C51.3592 129.894 51.9572 127.116 52.6881 125.505C53.9965 122.622 57.8973 115.266 58.9125 113.819C59.1983 113.411 60.3753 112.201 60.9622 110.792C61.5493 109.383 61.9448 108.199 62.0881 108.23C61.7586 105.506 62.2152 105.943 63.3513 86.635C63.3584 77.108 63.5378 68.4099 63.6125 67.3269L63.9961 64.7864H62.9773C62.4502 64.7996 60.9835 65.0064 60.0552 65.1913Z"
                        style="fill: rgba(255, 103, 103, 0);"
                        onMouseEnter={() => {
                            setWoundPosition('left')
                            setHoveringWound(true)
                        }}
                        onMouseLeave={() => setHoveringWound(false)}
                    />

                    <path
                        class="wound"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M117.344 59.9594C117.344 60.0524 118.952 67.9557 120.773 78.8864L123.187 99.4648L123.822 100.354L124.203 100.989C124.842 102.317 125.779 104.755 126.236 105.943C126.693 107.131 128.015 110.688 129.411 113.692C132.945 121.293 133.984 123.473 133.984 128.046C134.209 130.217 134.669 131.736 136.144 135.032C136.856 136.624 138.158 139.967 139.192 142.527C140.227 145.087 142.209 150.358 144.019 154.086C145.83 157.814 147.83 161.327 148.338 163.995C149.649 167.827 151.089 173.398 151.133 175.046C151.165 176.226 150.534 175.941 149.51 177.093C147.487 179.37 147.167 182.241 147.703 184.573C147.919 185.512 147.264 185.716 146.099 188.256C145.048 190.547 145.337 191.45 145.241 192.957C145.129 194.694 145.18 194.584 145.798 194.989C146.172 195.234 146.247 195.498 146.733 195.451C147.549 195.373 147.872 195.613 149.609 192.068C150.599 190.049 151.279 187.997 151.408 187.955C151.537 187.912 152.352 187.992 152.784 188.256C153.38 188.619 153.416 189.337 154.046 190.9C154.504 192.036 155.112 193.263 155.399 193.627C156.336 194.818 157.151 197.508 157.294 199.886L157.429 202.115L156.377 203.086C155.697 203.714 155.326 204.276 155.326 204.677C155.326 205.125 154.974 205.559 154.06 206.242C152.823 207.165 152.389 207.941 152.582 208.879C152.654 209.229 152.877 209.328 153.485 209.28C154.073 209.234 154.365 209.354 154.564 209.725C154.938 210.424 155.374 210.365 156.9 209.407C158.909 208.144 160.646 206.281 162.251 203.665C163.997 200.82 164.066 200.167 162.952 197.009C162.293 195.139 162.449 193.612 162.439 191.178C162.433 189.641 162.196 188.956 162.058 188.357C161.697 186.793 160.952 181.236 160.651 176.951C160.396 173.31 159.836 169.312 158.892 164.376C158.15 160.498 157.657 154.465 157.23 149.259C156.485 140.168 155.327 133.381 151.769 126.013C150.464 122.894 149.662 121.196 147.832 118.646C147.056 117.564 146.073 116.253 145.926 115.978C145.779 115.704 145.469 113.287 144.782 110.389C143.094 103.256 142.856 102.51 140.972 98.8297C140.05 97.0292 139.21 94.6512 139.066 93.8756C138.927 93.1229 138.815 90.9126 138.812 88.0324C139.447 85.7459 138.953 81.6422 138.812 80.6648C137.987 74.957 135.168 69.4902 130.428 64.7864C127.526 61.9057 124.511 60.668 121.79 59.9594C120.207 59.5471 117.344 59.683 117.344 59.9594Z"
                        style="fill: rgba(255, 103, 103, 0);"
                        onMouseEnter={() => {
                            setWoundPosition('right')
                            setHoveringWound(true)
                        }}
                        onMouseLeave={() => setHoveringWound(false)}
                    />

                    <path
                        class="wound"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M43.4125 192.567L43.2855 195.751C42.2748 206.965 42.5233 209.724 42.1423 217.346C42.5205 231.344 43.0731 235.053 42.2693 238.432C41.1086 243.312 40.5687 243.149 40.8724 247.07C41.3036 252.638 41.2092 254.231 43.1589 257.867C44.3962 259.491 48.1129 263.584 49.1292 268.411C50.8823 272.261 52.8365 276.46 56.1364 280.544C58.1273 283.009 59.5246 284.688 61.8319 288.481C65.599 294.675 67.2071 299.17 69.7075 307.789C70.8424 311.7 71.3728 312.36 71.3589 315.538C71.3457 318.555 70.933 319.446 69.9616 323.159C69.3798 325.384 68.8309 327.533 68.4373 328.367C67.4134 330.537 64.2454 334.338 60.8157 336.878C57.0863 340.411 57.6499 341.06 58.6562 343.992C59.3561 346.031 59.9764 346.569 64.374 345.643C65.6848 345.367 67.2415 345 67.8037 345C69.3224 345 70.3146 344.611 71.4875 343.094C72.4675 341.827 74.1531 339.439 74.1531 338.784C74.1531 338.293 76.4649 332.277 77.5828 330.4C79.3592 328.376 81.948 324.049 86.4747 321.635C90.5447 318.504 91.5111 316.937 92.3179 315.179C93.2039 313.249 92.9527 311.888 92.3179 310.457C91.3803 308.343 91.1978 308.544 88.2551 307.019C86.419 306.067 85.2084 304.979 84.6963 304.359C83.7693 303.238 81.9428 298.547 79.8693 292.165C78.8511 286.965 77.7317 283.743 76.9477 278.573C75.8632 271.422 73.7467 266.585 69.4531 259.773C67.4206 255.835 63.6327 251.943 61.8314 250.5L61.9585 249.103V246.562C61.9585 243.932 62.7749 242.175 64.1179 238.043C65.1149 234.976 65.4056 234.146 68.1828 228.016C70.5426 222.808 72.5172 217.043 74.7882 209.724L75.8049 205.786L76.4318 201.722V194.481V192.567H59.2102H43.4125Z"
                        style="fill: rgba(255, 103, 103, 0);"
                        onMouseEnter={() => {
                            setWoundPosition('left')
                            setHoveringWound(true)
                        }}
                        onMouseLeave={() => setHoveringWound(false)}
                    />

                    <path
                        class="wound"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M78.2109 193.229C78.2869 193.884 78.2109 194.93 78.3495 196.132C78.4344 197.096 79.1092 198.911 79.3657 199.943C79.6219 200.976 80.1867 204.446 80.89 207.819C82.5638 215.845 83.1772 217.79 85.0819 222.808C86.9309 227.679 87.092 228.162 87.3684 235.511C87.9945 242.272 88.0151 244.151 88.5517 246.128C89.0471 247.954 91.0969 250.622 92.0684 252.151C92.3279 253.167 91.9565 253.825 92.3279 256.014C92.7168 258.306 93.5438 259.523 94.7359 262.313C97.7241 269.309 97.541 271.459 96.5143 276.413C95.8792 284.543 96.0019 287.925 96.7805 293.055C97.1966 295.798 97.3173 296.218 98.7649 299.957C101.329 306.579 102.408 310.672 102.888 315.599C103.304 319.86 102.66 321.672 101.214 324.938C99.5103 328.786 99.7711 329.702 100.377 332.285V334.973L99.3089 338.403C98.4179 341.911 97.4531 343.374 95.6251 346.405C93.7002 349.597 93.864 351.438 93.7988 354.678C93.7558 356.827 93.7675 356.874 94.5596 357.669C95.1514 358.264 95.589 358.477 96.2144 358.477C97.2528 358.477 98.3193 357.816 98.6394 356.973C98.9328 356.2 99.2358 356.365 99.8943 357.658C100.365 358.582 100.472 358.65 101.328 358.579C102.137 358.512 102.289 358.392 102.542 357.626C102.834 356.742 102.855 356.753 103.245 358.002C103.439 358.623 104.881 358.467 105.637 357.742C106.223 357.18 106.336 357.151 106.618 357.491C107.24 358.242 108.876 357.645 108.876 356.668C108.876 356.279 109.026 356.298 109.759 356.779C110.308 357.139 110.437 357.143 110.938 356.811C111.247 356.606 111.582 355.132 112.393 353.773L114.171 351.105L114.643 347.837C114.749 345.826 114.423 343.955 114.584 343.357C114.922 342.101 115.314 340.568 114.584 338.555C114.874 336.478 114.124 336.907 114.249 335.477C114.334 334.507 114.442 332.826 114.526 331.881C114.627 330.732 114.527 329.258 114.225 327.438C113.673 324.108 113.675 318.94 114.231 314.013C114.445 312.118 115.372 305.642 116.291 299.622C117.948 288.764 117.962 288.632 117.98 283.294C118.001 277.194 117.886 276.476 115.604 268.374C114.585 264.758 114.279 263.201 114.009 260.269C113.824 258.273 113.413 254.37 113.095 251.596L112.516 246.553L112.962 237.831C113.207 233.034 113.561 227.589 113.748 225.731C114.733 215.967 115.081 196.902 114.336 193.571L113.999 192.069L95.7532 192.449H78.2133L78.2109 193.229Z"
                        style="fill: rgba(255, 103, 103, 0);"
                        onMouseEnter={() => {
                            setWoundPosition('right')
                            setHoveringWound(true)
                        }}
                        onMouseLeave={() => setHoveringWound(false)}
                    />
                </svg>
            </div>

            <div
                class="status head"
            >
                Head
                <div
                    class="healthBar"
                >
                    <div
                        class="bar"
                    >

                        <div
                            class="progress"
                            style="width: 90%;"
                        />
                    </div>
                </div>

                <svg
                    width="5.46vh"
                    height="1.38vh"
                    viewBox="0 0 59 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="mt-[0.1vh] "
                >
                    <path
                        d="M58 0V13.5H1.5" stroke="white"
                        stroke-opacity="0.25"
                    />

                    <rect
                        x="57"
                        width="2"
                        height="2"
                        fill="white"
                    />

                    <rect
                        y="12"
                        width="3"
                        height="3"
                        fill="white"
                    />
                </svg>
            </div>

            <div
                class="status body"
            >
                Body
                <div
                    class="healthBar"
                >
                    <div
                        class="bar"
                    >
                        <div
                            class="progress"
                            style="width: 10%;"
                        />
                    </div>
                </div>

                <svg
                    width="5.46vh"
                    height="1.38vh"
                    viewBox="0 0 59 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="mt-[0.1vh] "
                >
                    <path
                        d="M58 0V13.5H1.5"
                        stroke="white"
                        stroke-opacity="0.25"
                    />

                    <rect
                        x="57"
                        width="2"
                        height="2"
                        fill="white"
                    />

                    <rect
                        y="12"
                        width="3"
                        height="3"
                        fill="white"
                    />
                </svg>
            </div>

            <div
                class="status leftArm"
            >
                Left Arm
                <div
                    class="healthBar"
                >
                    <div
                        class="bar"
                    >
                        <div
                            class="progress"
                            style="width: 78%;"
                        />
                    </div>
                </div>

                <svg
                    width="5.46vh"
                    height="1.38vh"
                    viewBox="0 0 59 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="mt-[0.1vh] "
                >
                    <path
                        d="M58 0V13.5H1.5"
                        stroke="white"
                        stroke-opacity="0.25"
                    />

                    <rect
                        x="57"
                        width="2"
                        height="2"
                        fill="white"
                    />

                    <rect
                        y="12"
                        width="3"
                        height="3"
                        fill="white"
                    />
                </svg>
            </div>

            <div
                class="status rightArm"
            >
                Right Arm
                <div class="healthBar">
                    <div
                        class="bar"
                    >
                        <div
                            class="progress"
                            style="width: 100%;"
                        />
                    </div>
                </div>

                <svg
                    width="5.46vh"
                    height="1.38vh"
                    viewBox="0 0 59 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="mt-[0.1vh] isRight"
                >
                    <path
                        d="M58 0V13.5H1.5"
                        stroke="white"
                        stroke-opacity="0.25"
                    />

                    <rect
                        x="57"
                        width="2"
                        height="2"
                        fill="white"
                    />

                    <rect
                        y="12"
                        width="3"
                        height="3"
                        fill="white"
                    />
                </svg>
            </div>

            <div
                class="status leftLeg"
            >
                Left Leg
                <div
                    class="healthBar"
                >
                    <div
                        class="bar"
                    >
                        <div
                            class="progress"
                            style="width: 1%;"
                        />
                    </div>
                </div>

                <svg
                    width="5.46vh"
                    height="1.38vh"
                    viewBox="0 0 59 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="mt-[0.1vh] "
                >
                    <path
                        d="M58 0V13.5H1.5"
                        stroke="white"
                        stroke-opacity="0.25"
                    />

                    <rect
                        x="57"
                        width="2"
                        height="2"
                        fill="white"
                    />

                    <rect
                        y="12"
                        width="3"
                        height="3"
                        fill="white"
                    />
                </svg>
            </div>

            <div
                class="status rightLeg"
            >
                Right Leg
                <div
                    class="healthBar"
                >
                    <div
                        class="bar"
                    >
                        <div
                            class="progress"
                            style="width: 50%;"
                        />
                    </div>
                </div>

                <svg
                    width="5.46vh"
                    height="1.38vh"
                    viewBox="0 0 59 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="mt-[0.1vh] isRight"
                >
                    <path
                        d="M58 0V13.5H1.5"
                        stroke="white"
                        stroke-opacity="0.25"
                    />

                    <rect
                        x="57"
                        width="2"
                        height="2"
                        fill="white"
                    />

                    <rect
                        y="12"
                        width="3"
                        height="3"
                        fill="white"
                    />
                </svg>
            </div>
        </>
    )
}